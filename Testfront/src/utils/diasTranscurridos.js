export const diasTranscurridos = (recepcion, cierre) => {
  const fechaRecepcion = new Date(recepcion);
  const fechaCierre = new Date(cierre);
  console.log(fechaRecepcion);
  console.log(fechaCierre);

  const tiempoMilisegundos = fechaCierre.getTime() - fechaRecepcion.getTime();

  const tiempoDias = Math.floor(tiempoMilisegundos / 86400000);

  console.log(tiempoDias); // Resultado: 15
  return tiempoDias;
};
