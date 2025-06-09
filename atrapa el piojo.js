const piojo = document.getElementById('piojo');
const juego = document.getElementById('juego');

let movimientos = 0;
let descansando = false;

function moverPiojo(e) {
  if (descansando) return;

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const objRect = piojo.getBoundingClientRect();
  const distanciaX = mouseX - objRect.left;
  const distanciaY = mouseY - objRect.top;

  if (Math.abs(distanciaX) < 100 && Math.abs(distanciaY) < 100) {
    const nuevoX = Math.random() * (window.innerWidth - 80);
    const nuevoY = Math.random() * (window.innerHeight - 80);

    piojo.style.left = `${nuevoX}px`;
    piojo.style.top = `${nuevoY}px`;

    movimientos++;

    if (movimientos % 5 === 0) {
      descansar();
    }
  }
}

function descansar() {
  descansando = true;
  piojo.style.backgroundImage = "url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjjz1zPRfJkaxotQoT9qVbmsaFaQT857zON_Rtrowr9GiIGVyFb5nAdsE5XHzK8alq8Hh0dADq1oXA9PvRYKQleiUuUsYLy3BTWAYOz0sWS8FQbWpkpovu7CXuqOcdze6VI0gfzCANh3mK3/s1600/piojo-Verde_paisaje_del_infierno.png')";

  setTimeout(() => {
    descansando = false;
    piojo.style.backgroundImage = "url('https://i.pinimg.com/474x/c2/99/b0/c299b05971b98eb9601ecfa907f45653.jpg')";
  }, 2000);
}

juego.addEventListener('mousemove', moverPiojo);

window.onload = () => {
  piojo.style.left = `${Math.random() * (window.innerWidth - 80)}px`;
  piojo.style.top = `${Math.random() * (window.innerHeight - 80)}px`;
};

piojo.addEventListener('click', () => {
  alert('¡Ganaste!');
});