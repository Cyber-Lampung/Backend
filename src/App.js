import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Authentication/Register/Register";
import LoginPage from "./pages/Authentication/Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
