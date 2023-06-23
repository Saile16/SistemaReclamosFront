import { useState } from "react";
import "./App.css";
import IngresoReclamo from "./pages/IngresoReclamo";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListarReclamos from "./pages/ListarReclamos";
import { ReclamosProvider } from "./context/ReclamosProvider";
import Error404 from "./pages/Error404";
function App() {
  return (
    <div>
      <div>
        <ReclamosProvider>
          <Header />
          <BrowserRouter>
            <Routes>
              <Route
                index
                path="/ingreso-reclamo"
                element={<IngresoReclamo />}
              />
              <Route path="/listar-reclamos" element={<ListarReclamos />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </BrowserRouter>
        </ReclamosProvider>
      </div>
    </div>
  );
}

export default App;
