import React, { useState } from "react";

const ListarReclamos = () => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-full flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[12px] font-bold text-left text-gray-500 uppercase "
                  >
                    C. de Reclamo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[12px] font-bold text-left text-gray-500 uppercase "
                  >
                    F. Recepción
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[12px] font-bold text-left text-gray-500 uppercase "
                  >
                    F. Envio
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[12px] font-bold text-center text-gray-500 uppercase "
                  >
                    F. Respuesta Seguridad
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[12px] font-bold text-right text-gray-500 uppercase "
                  >
                    F. Respuesta Operaciones
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[12px] font-bold text-right text-gray-500 uppercase "
                  >
                    F. Fecha Cita
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[12px] font-bold text-right text-gray-500 uppercase "
                  >
                    Con video?
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[12px] font-bold text-right text-gray-500 uppercase "
                  >
                    Dias Restantes
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-[12px] font-bold text-right text-gray-500 uppercase "
                  >
                    Fecha de Cierre
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    1
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    Jone Doe
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    jonne62@gmail.com
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                    <p>06/05/2026</p>
                    <button
                      type="button"
                      class=" ml-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Se envió respuesta
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap ">
                    <button
                      onClick={handleOpenModal}
                      type="button"
                      class=" ml-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Observaciones
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                    <input type="date" />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                    <p>SI/NO</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                    <p aria-disabled>-------</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                    <p>--------</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 ">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-6 z-20 w-[590px]">
            <h2 className="text-xl font-bold mb-4">Observaciones</h2>
            <textarea
              value=""
              className="w-full h-32 border border-gray-300 p-2"
              placeholder="Escribe tus observaciones..."
            ></textarea>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cerrar
              </button>
              <button className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarReclamos;
