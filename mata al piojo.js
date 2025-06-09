// Obtiene el elemento con id "puntos", donde se va a mostrar el puntaje.
const puntos = document.getElementById("puntos");

// Inicializa el puntaje en cero.
let score = 0;

// Crea un array con URLs de imágenes de piojos. Estas se usarán aleatoriamente.
const imagenesPiojo = [
    "https://tse2.mm.bing.net/th?id=OIP.rUGDZxDy4khuLGp6LM1m3AAAAA&pid=Api&P=0&h=180",
    "https://tse4.mm.bing.net/th?id=OIP._b-eJyj2lMarQe-X3w-yIAHaHa&pid=Api&P=0&h=180",
    "https://tse2.mm.bing.net/th?id=OIP.YIdevyuTbuIAVEQT37bESwHaHa&pid=Api&P=0&h=180",
    "https://tse4.mm.bing.net/th?id=OIP._Z6L0dim6s0johg_fAIe6wHaHa&pid=Api&P=0&h=180",
    "https://tse1.mm.bing.net/th?id=OIP.qfnY2XowUJ8k_lGuod0nKgHaHa&pid=Api&P=0&h=180",
    "https://tse4.mm.bing.net/th?id=OIP.M2dcpeYz3azvAwCILg0NUQHaHa&pid=Api&P=0&h=180",
];

// Crea un array con 12 elementos del DOM que representan los piojos visibles en pantalla.
// Se asume que en el HTML existen estos elementos con esos ids (piojo1 a piojo12).
const piojos = [
  document.getElementById("piojo1"),
  document.getElementById("piojo2"),
  document.getElementById("piojo3"),
  document.getElementById("piojo4"),
  document.getElementById("piojo5"),
  document.getElementById("piojo6"),
  document.getElementById("piojo7"),
  document.getElementById("piojo8"),
  document.getElementById("piojo9"),
  document.getElementById("piojo10"),
  document.getElementById("piojo11"),
  document.getElementById("piojo12"),
];

// Agrega a cada piojo un evento que se dispara al hacer clic sobre él.
piojos.forEach(piojo => {
  piojo.addEventListener("click", () => {
    // Solo suma puntos si el piojo tiene la clase "visible".
    if (piojo.classList.contains("visible")) {
      score++; // Aumenta el puntaje
      puntos.textContent = score; // Actualiza el contenido del HTML para mostrar el nuevo puntaje
      piojo.classList.remove("visible"); // Oculta el piojo al que se le hizo clic
    }
  });
});

// Función que elige un piojo aleatorio y lo muestra por un segundo
function mostrarPiojo() {
  // Selecciona un índice aleatorio del array de piojos
  const index = Math.floor(Math.random() * piojos.length);
  const piojo = piojos[index];

  // Selecciona una imagen aleatoria de piojo
  const imgRandom = imagenesPiojo[Math.floor(Math.random() * imagenesPiojo.length)];

  // Cambia la imagen del piojo al azar
  piojo.src = imgRandom;

  // Le agrega la clase "visible" para mostrarlo
  piojo.classList.add("visible");

  // Después de 1 segundo, remueve la clase "visible" para ocultarlo
  setTimeout(() => {
    piojo.classList.remove("visible");
  }, 1000);
}

// Ejecuta la función mostrarPiojo cada 1200 milisegundos (1.2 segundos)
setInterval(mostrarPiojo, 1200);
