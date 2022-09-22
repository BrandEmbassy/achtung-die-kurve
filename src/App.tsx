import React from 'react'
import { BrowserRouter, Navigate, redirect, Route, Routes } from "react-router-dom";
import { Game } from './game'
import { Controller } from './controller'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game" element={<Game />} id="game" />
        <Route path="/controller" element={<Controller />} />
        <Route path='*' element={ <Navigate replace to="/game" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
