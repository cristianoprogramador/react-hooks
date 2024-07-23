import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReactPage from "./pages/ReactPage";
import VanillaPage from "./pages/VanillaPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/react" element={<ReactPage />} />
        <Route path="/vanilla" element={<VanillaPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
