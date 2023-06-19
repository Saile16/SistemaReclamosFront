import { useState } from "react";
import "./App.css";
import IngresoReclamo from "./pages/IngresoReclamo";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListarReclamos from "./pages/ListarReclamos";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route index path="/ingreso-reclamo" element={<IngresoReclamo />} />
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
