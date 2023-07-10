export function calculoHorasReclamo(fechas) {
  const fechaRecepcion = new Date(fechas.FRecepcion);
  const fechaEnvio = new Date(fechas.FEnvio);
  const fechaSeguridad = new Date(fechas.FSeguridad);
  const fechaOperaciones = new Date(fechas.FOperaciones);
  const fechaLegal = new Date(fechas.FLegal);

  // Función auxiliar para calcular las horas laborales entre dos fechas
  function calcularHorasLaborales(fechaInicio, fechaFin) {
    const horasPorDia = 9; // Horas laborales por día (8:00 am a 5:00 pm)
    const diasHabiles = [1, 2, 3, 4, 5]; // Días laborales de lunes a viernes

    const totalHoras = Math.floor((fechaFin - fechaInicio) / (1000 * 60 * 60)); // Diferencia total en horas

    let horasLaborales = 0;

    for (let i = 0; i < totalHoras; i++) {
      const fechaActual = new Date(
        fechaInicio.getTime() + i * (1000 * 60 * 60)
      );

      if (diasHabiles.includes(fechaActual.getDay())) {
        // Si es un día laboral
        const horaActual = fechaActual.getHours();

        if (horaActual >= 8 && horaActual < 17) {
          // Si está dentro del horario laboral
          horasLaborales++;
        }
      }
    }

    return horasLaborales;
  }

  const tiempoEnvio = calcularHorasLaborales(fechaRecepcion, fechaEnvio);
  const tiempoSeguridad = Math.floor(
    (fechaSeguridad - fechaEnvio) / (1000 * 60 * 60)
  );
  const tiempoOperaciones = calcularHorasLaborales(
    fechaSeguridad,
    fechaOperaciones
  );
  const tiempoLegal = calcularHorasLaborales(fechaOperaciones, fechaLegal);

  console.log(`Entre F.Recepción y F.Envío pasaron ${tiempoEnvio} horas`);
  console.log(`Entre F.Envío y F.Seguridad pasaron ${tiempoSeguridad} horas`);
  console.log(
    `Entre F.Seguridad y F.Operaciones pasaron ${tiempoOperaciones} horas`
  );
  console.log(`Entre F.Operaciones y F.Legal pasaron ${tiempoLegal} horas`);
}

// Ejemplo de uso
const fechas = {
  FRecepcion: "2023-07-03T16:30:00",
  FEnvio: "2023-07-04T08:30:00",
  FSeguridad: "2023-07-05T18:30:00",
  FOperaciones: "2023-07-06T11:30:00",
  FLegal: "2023-07-07T16:30:00",
};
