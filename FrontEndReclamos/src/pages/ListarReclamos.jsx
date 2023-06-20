import React, { useState, useEffect } from "react";
import TablaReclamos from "../components/tablaReclamos";
import axios from "axios";

const ListarReclamos = () => {
  const [reclamosLista, setReclamosLista] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/listar");
        setReclamosLista(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);
  console.log(reclamosLista);
  return (
    <div className="max-w-full flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <TablaReclamos reclamosLista={reclamosLista} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListarReclamos;
