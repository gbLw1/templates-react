import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages";
import TesteCep from "../pages/TesteCep";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cep" element={<TesteCep />} />
      </Routes>
    </BrowserRouter>
  );
}
