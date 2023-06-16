import { useState } from "react";
import "./App.css";
import IngresoReclamo from "./assets/pages/IngresoReclamo";
import Header from "./assets/components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListarReclamos from "./assets/pages/ListarReclamos";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/ingreso-reclamo" element={<IngresoReclamo />} />
            <Route path="/listar-reclamos" element={<ListarReclamos />} />
          </Routes>
        </BrowserRouter>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
