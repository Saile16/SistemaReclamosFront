import React, { useState, useEffect } from "react";
import TablaReclamos from "../components/tablaReclamos";
import { Link } from "react-router-dom";

function ListarReclamos() {
  return (
    <div className="w-auto">
      <div className="flex items-center justify-evenly mb-12">
        <Link
          className=" focus:outline-none text-white bg-emerald-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2"
          to="/ingreso-reclamo"
        >
          Ingresar reclamo
        </Link>
        <div className="flex items-center justify-evenly flex-col">
          <div className="flex items-center justify-center mt-2">
            <span className="text-gray-600 text-2xl">PENDIENTE</span>
            <span className=" w-12 h-7 inline-block bg-yellow-500 ml-4"></span>
          </div>
          <div className="flex items-center justify-center mt-2">
            <span className="shrink text-gray-600 text-2xl">RECHAZADO</span>
            <span className="shrink w-12 h-7 inline-block bg-red-500  ml-4"></span>
          </div>
          <div className="flex items-center justify-center mt-2">
            <span className="text-gray-600 text-2xl">APROBADO</span>
            <span className="w-12 h-7 inline-block bg-green-500  ml-4"></span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <TablaReclamos />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListarReclamos;
