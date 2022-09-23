import React, { useState, useEffect, createContext, useContext } from "react";
import { Peer } from "peerjs";
import { Player } from "../game/PlayerLabel";
import { Events } from "./events";

const PeerContext = createContext();
const GameConnectionContext = createContext();

export function PeerProvider({ children, peerId }) {
  const [connections, setConnections] = useState([]);
  const [peer, setPeer] = useState(null);
  const [connected, setConnected] = useState(false);
  const [gameConnection, setGameConnection] = useState(null);

  useEffect(() => {
    console.log("💥 Creating connection ", peerId);
    const peer = new Peer(peerId, { debug: 1 });
    peer.on("open", function (id) {
      console.log("My peer ID is: " + id);
      setConnected(true);

      peer.on("connection", (conn) => {
        console.log("Someone tries to connect", conn);
        setConnections((conns) => [...conns, conn]);

        conn.on("close", () => {
          setConnections((conns) =>
            conns.filter((c) => c.connectionId !== conn.connectionId)
          );
        });

        conn.on("data", (data) => {
          console.log("Received data", data);
        });
        conn.on("error", (error) => {
          console.log("Connection error", error);
        });
      });
      peer.on("error", (error) => {
        console.error("PEER Error: ", error);
      });
    });
    setPeer(peer);
    return () => {
      peer.disconnect();
    };
  }, [peerId]);

  return connected && peer !== null ? (
    <PeerContext.Provider
      value={{
        peer,
        connections,
        gameConnection,
        setGameConnection,
      }}
    >
      {children}
    </PeerContext.Provider>
  ) : (
    <div>Connecting peer...</div>
  );
}

export function usePeer() {
  const { peer } = useContext(PeerContext);
  return peer;
}

export function useConnections() {
  const { connections } = useContext(PeerContext);
  return connections;
}

export const useConnectionsEvent = (eventName, process) => {
  const connections = useConnections();

  useEffect(() => {
    connections.forEach((conn) =>
      conn.on("data", (data) => {
        if (data.eventName === eventName) {
          const cleanup = process(data.payload);
          if (cleanup) {
            conn.on("close", cleanup);
          }
        }
      })
    );
  }, [eventName, process]);
};

export function useGameConnection(gameId) {
  const { gameConnection, setGameConnection } = useContext(PeerContext);
  const peer = usePeer();

  useEffect(() => {
    if (gameConnection) {
      return;
    }
    console.log("Connecting to game");
    const connection = peer.connect(gameId);
    connection.on("open", (data) => {
      console.log("connection success");
      setGameConnection(connection);
    });
    connection.on("data", (data) => {
      console.log("data recieved", data);
    });
    connection.on("error", (error) => {
      console.error("connection failed", error);
    });

    return () => {
      setGameConnection(null);
      connection.close();
    };
  }, [peer, gameId]);

  console.log("💥 useGameConnection", gameConnection);

  return gameConnection;
}

export function useGameConnectionEvent(gameId, eventName, process) {
  const connection = useGameConnection(gameId);

  useEffect(() => {
    if (connection) {
      const handler = (data) => {
        if (data.eventName === eventName) {
          const cleanup = process(data.payload);
          if (cleanup) {
            connection.on("close", cleanup);
          }
        }
      };
      connection.on("data", handler);
      return () => connection.off("data", handler);
    }
  }, [eventName, process]);
}
