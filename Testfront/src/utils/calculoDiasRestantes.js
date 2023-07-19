export const calculoDiasRestantes = (fechaClienteRecepcion) => {
  const fechaActual = new Date();
  const fechaCierreObj = new Date(fechaClienteRecepcion);

  // Calcular la diferencia en milisegundos entre las dos fechas
  const diffMilisegundos = fechaActual.getTime() - fechaCierreObj.getTime();

  // Calcular los días restantes
  const diffDias = Math.floor(diffMilisegundos / (1000 * 60 * 60 * 24));
  // console.log(diffDias);
  const diasRestantes = 30 - diffDias;
  if (diasRestantes <= 0) {
    return 0;
  }

  return diasRestantes + "dias";
};
