import React, { useState, useEffect, createContext, useContext } from "react";
import { Peer } from "peerjs";
import { Player } from "../game/PlayerLabel";

const PeerContext = createContext();

export function PeerProvider({ children, peerId }) {
  const [connections, setConnections] = useState([]);
  const [peer, setPeer] = useState(null);
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    console.log('💥 Creating connection ', peerId)
    const peer = new Peer(peerId, {debug:1});
    peer.on("open", function (id) {
      console.log("My peer ID is: " + id);
      setConnected(true)

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
        conn.on('error', (error) => {
            console.log("Connection error", error);
        })
      });
      peer.on("error", (error) => {
        console.error("PEER Error: ", error);
      });
    });
    setPeer(peer);
    return () => {
      peer.disconnect()
    }
  }, [peerId]);

  return connected && peer !== null ? (
    <PeerContext.Provider value={{ peer, connections }}>
      {children}
    </PeerContext.Provider>
  ) : (
    <div>Connecting...</div>
  );
}

export function usePeer() {
  const {peer} = useContext(PeerContext)
  return peer;
}

export function useConnections() {
  const {connections} = useContext(PeerContext)
  return connections;
}

export function usePlayers(): Array<Player> {
  const connections = useConnections()

  return connections.map(c => ({playerId: c.connectionId, name: 'x', color: 'y'}))
}

export function useGameConnection(gameId) {
  const peer = usePeer()
  useEffect(() => {
    console.log("Connecting to game", gameId);
    const connection = peer.connect(gameId);
    connection.on("open", (data) => {
      console.log("connection success", gameId);
    });
    connection.on("error", (data) => {
      console.log("connection failed", gameId);
    });
    return () => {
      connection.close();
    };
  }, [gameId, peer]);
}
