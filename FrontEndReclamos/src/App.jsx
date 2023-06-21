import { useState } from "react";
import "./App.css";
import IngresoReclamo from "./pages/IngresoReclamo";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListarReclamos from "./pages/ListarReclamos";
import { ReclamosProvider } from "./context/ReclamosProvider";
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
            </Routes>
          </BrowserRouter>
        </ReclamosProvider>
      </div>
    </div>
  );
}

export default App;
