export const calculoDiasRestantes = (fechaCierre) => {
  const fechaActual = new Date();
  const fechaCierreObj = new Date(fechaCierre);

  // Calcular la diferencia en milisegundos entre las dos fechas
  const diffMilisegundos = fechaCierreObj.getTime() - fechaActual.getTime();

  // Calcular los días restantes
  const diffDias = Math.ceil(diffMilisegundos / (1000 * 60 * 60 * 24));
  const diasRestantes = Math.max(30 - diffDias, 0);

  //   console.log(typeof diasRestantes);
  //   console.log(diasRestantes);

  return diasRestantes;
};
