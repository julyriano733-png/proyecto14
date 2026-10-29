// Activo el calendario en el campo de fecha
flatpickr("#fecha", {
  altInput: true,        // muestra la fecha en formato bonito
  altFormat: "d/m/Y",    // día/mes/año
  maxDate: "today"       // no me  deja elegir fechas futuras
});
//traigo las constantes que voy a usar 
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita que la página se recargue

  // lee la fecha elegida por el usuario
  const texto = document.getElementById("fecha").value;

  // Validación 1: la eleccion de la fecha 
  // si texto es igual a nada , dice "por favor elige una fecha "
  if (texto === "") {
    resultado.textContent = "Por favor elige una fecha.";
    return;
  }

  // Convierto el texto en una fecha de Luxon
  const nacimiento = luxon.DateTime.fromISO(texto);
  const hoy = luxon.DateTime.now();

  // Validación 2: que la fecha sea válida y no sea del futuro , si naciemiento . es valido y nacimiento es mayor a la fecha de hoy
  //dira q la fecha no es valida ya que no existe 
  if (!nacimiento.isValid || nacimiento > hoy) {
    resultado.textContent = "La fecha no es válida.";
    return;
  }

  // Calculo la edad con Luxon , calculamos la fecha puesta , si es correcta 
  const edad = hoy.diff(nacimiento, ["years", "months", "days"]);

  // Math.floor quita los decimales , ya tenemos los datos de la edad y le quitamos los decimales 
  const anios = Math.floor(edad.years);
  const meses = Math.floor(edad.months);
  const dias = Math.floor(edad.days);
// mostramos a el usuario los resusltados jjijiji
  resultado.textContent = "Tienes " + anios + " años, " + meses + " meses y " + dias + " días.";
});