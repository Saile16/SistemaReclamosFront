// Función auxiliar para calcular las horas laborales entre dos fechas
export function calcularHorasLaborales(fInicio, fFin) {
  const fechaInicio = new Date(fInicio);
  const fechaFinal = new Date(fFin);

  const horasPorDia = 9; // Horas laborales por día (8:00 am a 5:00 pm)
  const diasHabiles = [1, 2, 3, 4, 5]; // Días laborales de lunes a viernes

  const totalHoras = Math.floor((fechaFinal - fechaInicio) / (1000 * 60)); // Diferencia total en horas
  let horasLaborales = 0;

  for (let i = 0; i < totalHoras; i++) {
    const fechaActual = new Date(fechaInicio.getTime() + i * (1000 * 60));

    if (diasHabiles.includes(fechaActual.getDay())) {
      // Si es un día laboral
      const horaActual = fechaActual.getHours();

      if (horaActual >= 8 && horaActual < 17) {
        // Si está dentro del horario laboral
        horasLaborales++;
      }
    }
  }

  const horas = Math.floor(horasLaborales / 60);
  const minutos = Math.floor(horasLaborales % 60);
  return `${horas} horas y ${minutos} minutos`;
}
