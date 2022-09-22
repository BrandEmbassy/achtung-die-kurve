import React from 'react'
import { BrowserRouter, redirect, Route, Routes } from "react-router-dom";
import { Game } from './game'
import { Controller } from './controller'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        Hello
        <Route path="/game" element={<Game />} />
        
        <Route path="/controller" element={<Controller />} />
        {/* <Route path='*' action={() => redirect("/game")} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
