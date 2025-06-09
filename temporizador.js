// Elementos del DOM que usamos para mostrar puntos, tiempo y controlar botones
const puntos = document.getElementById("puntos");       // Donde se muestra el puntaje
const timerElement = document.getElementById("timer");  // Donde se muestra el tiempo
const btnIniciar = document.getElementById("startBtn"); // Botón para iniciar el juego
const btnReiniciar = document.getElementById("resetBtn"); // Botón para reiniciar el juego
const sonidoFin = document.getElementById("sonidoFin"); // Elemento de audio para sonido al terminar

// Variables para controlar el puntaje, tiempo y los intervalos
let score = 0;             // Puntaje inicial en 0
let tiempoInicial = 600;   // Tiempo inicial en segundos (10 minutos)
let tiempo = tiempoInicial; // Tiempo que irá descontando durante el juego
let intervaloTiempo = null; // Intervalo para el temporizador
let cuentaAtras = null;     // Intervalo para la cuenta regresiva 3-2-1
let intervaloPiojos = null; // Intervalo para mostrar piojos aleatorios

// Array con URLs de imágenes de piojos para variar la imagen que aparece
const imagenesPiojo = [
  "https://tse2.mm.bing.net/th?id=OIP.rUGDZxDy4khuLGp6LM1m3AAAAA&pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th?id=OIP._b-eJyj2lMarQe-X3w-yIAHaHa&pid=Api&P=0&h=180",
  "https://tse2.mm.bing.net/th?id=OIP.YIdevyuTbuIAVEQT37bESwHaHa&pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th?id=OIP._Z6L0dim6s0johg_fAIe6wHaHa&pid=Api&P=0&h=180",
  "https://tse1.mm.bing.net/th?id=OIP.qfnY2XowUJ8k_lGuod0nKgHaHa&pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th?id=OIP.M2dcpeYz3azvAwCILg0NUQHaHa&pid=Api&P=0&h=180",
];

// Obtenemos los 12 elementos img con id piojo1 a piojo12 para manipularlos
const piojos = Array.from({ length: 12 }, (_, i) =>
  document.getElementById(`piojo${i + 1}`)
);

// Agregamos a cada piojo un evento click que suma puntos si está visible
piojos.forEach(piojo => {
  piojo.addEventListener("click", () => {
    if (piojo.classList.contains("visible")) { // Solo si está visible
      score++;                                // Sumamos 1 punto
      puntos.textContent = score;             // Actualizamos el puntaje en pantalla
      piojo.classList.remove("visible");      // Ocultamos el piojo
    }
  });
});

// Función que convierte segundos en formato mm:ss para mostrar bonito
function formatearTiempo(segundos) {
  const minutos = Math.floor(segundos / 60);     // Calcula minutos
  const seg = segundos % 60;                      // Calcula segundos restantes
  // Devuelve texto con dos dígitos para minutos y segundos
  return `${String(minutos).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
}

// Actualiza el texto del temporizador en el DOM según el tiempo restante
function actualizarPantalla() {
  timerElement.textContent = tiempo > 0
    ? formatearTiempo(tiempo)  // Muestra el tiempo en mm:ss
    : "¡Tiempo terminado!";    // Mensaje cuando se termina el tiempo
}

// Función que muestra un piojo aleatorio con una imagen aleatoria y lo oculta después de 1 segundo
function mostrarPiojo() {
  const index = Math.floor(Math.random() * piojos.length);  // Elige índice aleatorio de piojos
  const piojo = piojos[index];                              // Obtiene el piojo seleccionado
  const imgRandom = imagenesPiojo[Math.floor(Math.random() * imagenesPiojo.length)]; // Imagen aleatoria
  piojo.src = imgRandom;                 // Cambia la imagen del piojo
  piojo.classList.add("visible");        // Lo muestra en pantalla
  setTimeout(() => piojo.classList.remove("visible"), 1000); // Lo oculta después de 1 segundo
}

// Función que inicia el temporizador de cuenta regresiva de 10 minutos
function iniciarTemporizador() {
  intervaloTiempo = setInterval(() => {
    tiempo--;               // Resta 1 segundo al tiempo
    actualizarPantalla();   // Actualiza el tiempo en pantalla

    if (tiempo <= 0) {      // Si se terminó el tiempo
      clearInterval(intervaloTiempo); // Detiene el temporizador
      clearInterval(intervaloPiojos); // Detiene la aparición de piojos
      intervaloTiempo = null;          // Limpia variable
      intervaloPiojos = null;          // Limpia variable
      sonidoFin.play();                // Reproduce el sonido de fin
      alert(`¡Se acabó el tiempo! Puntaje final: ${score}`); // Muestra mensaje final con puntaje
    }
  }, 1000); // Se ejecuta cada segundo
}

// Función que inicia el juego con cuenta atrás de 3 segundos antes de comenzar
function iniciarJuego() {
  let cuenta = 3;                           // Cuenta regresiva inicial en 3 segundos
  timerElement.textContent = `Comenzando en: ${cuenta}`; // Muestra el mensaje inicial

  cuentaAtras = setInterval(() => {         // Intervalo que se ejecuta cada segundo
    cuenta--;                              // Decrementa la cuenta
    if (cuenta > 0) {                     // Mientras no llegue a cero
      timerElement.textContent = `Comenzando en: ${cuenta}`; // Actualiza texto
    } else {                              // Cuando llega a 0
      clearInterval(cuentaAtras);         // Detiene la cuenta atrás
      cuentaAtras = null;                 // Limpia variable
      tiempo = tiempoInicial;             // Reinicia el tiempo a 10 minutos
      actualizarPantalla();               // Muestra el tiempo inicial en pantalla
      iniciarTemporizador();              // Empieza el temporizador
      intervaloPiojos = setInterval(mostrarPiojo, 1200); // Empieza a mostrar piojos cada 1.2s
    }
  }, 1000); // Cada segundo
}

// Función para reiniciar el juego y dejar todo como al principio
function reiniciarJuego() {
  clearInterval(intervaloTiempo);  // Detiene temporizador si está activo
  clearInterval(intervaloPiojos);  // Detiene la aparición de piojos
  clearInterval(cuentaAtras);      // Detiene la cuenta atrás si estaba en proceso
  intervaloTiempo = null;          // Limpia variable
  cuentaAtras = null;              // Limpia variable
  intervaloPiojos = null;          // Limpia variable
  tiempo = tiempoInicial;          // Reinicia tiempo a 10 minutos
  score = 0;                      // Reinicia puntaje a 0
  puntos.textContent = score;      // Actualiza puntaje en pantalla
  actualizarPantalla();            // Actualiza tiempo en pantalla
  piojos.forEach(p => p.classList.remove("visible")); // Oculta todos los piojos visibles
}

// Evento para iniciar el juego cuando se hace clic en el botón "Iniciar"
btnIniciar.addEventListener("click", () => {
  // Solo inicia si no hay ya un juego o cuenta atrás corriendo
  if (!intervaloTiempo && !intervaloPiojos && !cuentaAtras) {
    iniciarJuego();  // Llama a la función para empezar la cuenta atrás y luego el juego
  }
});

// Evento para reiniciar el juego al hacer clic en el botón "Reiniciar"
btnReiniciar.addEventListener("click", reiniciarJuego);

// Muestra el tiempo inicial "10:00" al cargar la página
actualizarPantalla();

if (tiempo <= 0) {
  clearInterval(temporizador);
  sonidoFin.play();
  timerElemento.textContent = "00:00";
  alert("¡Se acabó el tiempo!");
  return;
}
