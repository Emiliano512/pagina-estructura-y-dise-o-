// Arranqué armando una lista con canciones, que son las palabras que hay que adivinar
const canciones = [
"Tan solo", "Insisto", "Cruce", "Antes y después", "El Farolito",
"Me gusta", "Astros", "Juira Juira", "Maradó", "Llevátelo", "Chactuchac", 
"Cancheros", "Los mocosos", "A veces", "Blues del traje gris", "Yira yira", 
"Pega pega", "Siempre bajando", "Cruel", "Arco", "Babilonia", "Ay ay ay", 
"Pistolas", "Angelito", "Manise", "Ximenita", "Ando ganas (Llora, llora)", 
"Fumigator", "Muy despacito", "Es sentir", "Te diría", "Arco II", 
"Esquina Libertad", "Taxi Boy", "Shup‑Shup", "Al atardecer", "Qué decís", 
"Don’t say tomorrow", "Todo pasa", "Intro Maradó", "Gris", "Muévelo", 
"Verano del ’92", "Vals Inicial", "El Balneario de los doctores crotos", 
"Genius", "A ver cuándo", "Desde lejos no se ve", "Sucio Can", 
"El rey del blues", "Y quemas", "Agua", "Buenos tiempos", "Go negro go", 
"Uoh pa pa pa", "Quemado", "Murguita", "Olvidate (Ya ves)", "Finale", 
"María y José", "Labios de seda", "Luz de marfil", "Vine hasta aquí", 
"Globalización Fijate", "Reggae rojo y negro", "Ruleta", "Morella", 
"La luna y la cabra", "Media caña", "Mi babe", "Merecido", "San Jauretche", 
"Fantasma", "Guadalupe", "Como Alí", "Langostas", "Sudestada", "Motumbo", 
"Entrando en tu ciudad", "Amor de perros", "Solo y en paz", 
"Dientes de cordero", "Al desierto", "Canción de cuna", "No pares", 
"Manjar", "Pacífico", "Civilización", "Bicho de ciudad", "Pollo viejo", 
"Cruces y flores", "Difícil", "Un buen día", "Basta de penas", "Unbekannt", 
"Salitral", "Hoy es hoy", "Buenos días Palomar", "Pensar en nada", 
"Around and Around", "Zapatos de gamuza azul", "Es sólo rock & roll", 
"Little Red Rooster"
];

// Acá guardo lo que se necesita para que el juego funcione
let palabraActual = "";    // La palabra que hay que adivinar
let palabraOculta = "";    // La misma palabra pero toda tapada con guiones bajos
let errores = 0;           // Contador de errores (cuando le pifiás)
let letrasUsadas = [];     // Las letras que ya probaste

const maxErrores = 6; // El tope de errores permitidos

// Busqué los elementos del HTML para poder ir actualizándolos con lo que pase en el juego
const palabraEl = document.getElementById("palabraOculta");   // Donde muestro la palabra tapada
const erroresEl = document.getElementById("errores");         // Donde muestro cuántas veces le pifiaste
const letrasEl = document.getElementById("letrasUsadas");     // Muestra las letras que ya tiraste
const mensajeEl = document.getElementById("mensaje");         // Acá pongo un mensaje si ganaste o perdiste
const inputLetra = document.getElementById("letra");          // Donde el jugador escribe la letra

// Esta función arranca una palabra nueva y reinicia todo el juego
function nuevaPalabra() {
  // Elijo una canción al azar y la paso a mayúsculas
  palabraActual = canciones[Math.floor(Math.random() * canciones.length)].toUpperCase();

  // Creo una palabra oculta con guiones bajos del mismo largo que la real
  palabraOculta = "_".repeat(palabraActual.length);

  // Reinicio errores y letras usadas
  errores = 0;
  letrasUsadas = [];

  // Actualizo todo lo que se ve en pantalla
  palabraEl.textContent = palabraOculta.split("").join(" ");
  erroresEl.textContent = errores;
  letrasEl.textContent = "—"; // Arranco con un guion nomás
  mensajeEl.textContent = "";
  mensajeEl.className = "";
}

// Esta función se ejecuta cuando se hace un intento (una letra o toda la palabra)
function intentarLetra() {
  // Agarro la letra que escribió el jugador, la paso a mayúsculas y le saco espacios
  const intento = inputLetra.value.toUpperCase().trim();
  inputLetra.value = ""; // Borro lo que había en el input

  // Si no escribió nada o ya usó esa letra, no hago nada
  if (intento === "" || letrasUsadas.includes(intento)) return;

  // Guardo la letra usada y actualizo la lista en pantalla
  letrasUsadas.push(intento);
  letrasEl.textContent = letrasUsadas.join(", ");

  // Si intentó con una sola letra
  if (intento.length === 1) {
    if (palabraActual.includes(intento)) {
      // Acertó, así que armo la palabra mostrando esa letra
      let nueva = "";
      for (let i = 0; i < palabraActual.length; i++) {
        nueva += palabraActual[i] === intento ? intento : palabraOculta[i];
      }
      palabraOculta = nueva;
      palabraEl.textContent = palabraOculta.split("").join(" ");

      // Si ya no hay guiones bajos, ganó
      if (!palabraOculta.includes("_")) {
        mensajeEl.textContent = "Bien hecho, ahora ten una nueva palabra";
        mensajeEl.className = "ganaste";
        setTimeout(nuevaPalabra, 2000); // Después de 2 segundos arranca otra
      }
    } else {
      // Le erró, así que sumo un error
      errores++;
      erroresEl.textContent = errores;
    }
  } else {
    // Si intentó con toda la palabra escrita
    if (intento === palabraActual) {
      // Adivinó todo bien
      palabraOculta = palabraActual;
      palabraEl.textContent = palabraActual.split("").join(" ");
      mensajeEl.textContent = "¡Adivinaste vamoooos!, aver si adivinas la otra";
      mensajeEl.className = "ganaste";
      setTimeout(nuevaPalabra, 2000);
    } else {
      // Le pifió a la palabra completa, sumo error igual
      errores++;
      erroresEl.textContent = errores;
    }
  }

  // Si llegó al tope de errores, perdió
  if (errores >= maxErrores) {
    mensajeEl.textContent = `Perdiste JAJAJA, la cancion era: ${palabraActual}. Papafrita, aca te doy una nueva palabra`;
    mensajeEl.className = "perdiste";
    setTimeout(nuevaPalabra, 3000); // Después de 3 segundos arranca de nuevo
  }
}

// Le digo al botón "Adivinar" que cuando lo apreten se dispare la función
document.getElementById("botonAdivinar").addEventListener("click", intentarLetra);

// Cuando se carga todo, ya arranco el juego con una palabra
nuevaPalabra();