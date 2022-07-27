import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpherePage from "./pages/SpherePage";
import ModelPage from "./pages/ModelPage";
import './style.css';
import HomePage from "./pages/HomePage";
import HeartBoxesPage from "./pages/HeartBoxesPage";
import DonutPage from "./pages/DonutPage";
import EarthPage from "./pages/EarthPage";

function App() {

  console.log('ttttt')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="sphere" element={<SpherePage/>} exact></Route>
        <Route path="3d-model" element={<ModelPage/>} exact></Route>
        <Route path="heart" element={<HeartBoxesPage/>} exact></Route>
        <Route path="donut" element={<DonutPage/>} exact></Route>
        <Route path="earth" element={<EarthPage/>} exact></Route>
        <Route path="/" element={<HomePage/>} exact></Route>
        <Route path="*" element={<HomePage/>} exact></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
