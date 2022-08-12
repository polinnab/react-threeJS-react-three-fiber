import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpherePage from "./pages/SpherePage";
import ModelPage from "./pages/ModelPage";
import HeartBoxesPage from "./pages/HeartBoxesPage";
import DonutPage from "./pages/DonutPage";
import EarthPage from "./pages/EarthPage";

import './style.css';
import AnadeaPage from "./pages/AnadeaPage";
import UkrainePointsPage from "./pages/UkrainePointsPage";

function App() {

  console.log('ttttt')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="sphere" element={<SpherePage/>} exact></Route>
        <Route path="3d-model" element={<ModelPage/>} exact></Route>
        <Route path="heart" element={<HeartBoxesPage/>} exact></Route>
        <Route path="donut" element={<DonutPage/>} exact></Route>
        <Route path="anadea" element={<AnadeaPage/>} exact></Route>
        <Route path="ukraine" element={<UkrainePointsPage/>} exact></Route>
        <Route path="/" element={<EarthPage/>} exact></Route>
        <Route path="*" element={<EarthPage/>} exact></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
