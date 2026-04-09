let puntaje = 0;
let nivel = 1;
puntaje = parseInt(localStorage.getItem("puntaje")) || 0;

calcularNivel();
actualizarUI();

function actualizarUI() {
  document.getElementById("score").innerText = "Puntaje: " + puntaje;
  document.getElementById("nivel").innerText = "Nivel: " + nivel;
}
function sumarPuntos(valor) {
  puntaje += valor;

  calcularNivel();
  localStorage.setItem("puntaje", puntaje);

  actualizarUI();
}
function restarPuntos(valor) {
  puntaje -= valor;

  calcularNivel();
  localStorage.setItem("puntaje", puntaje);

  actualizarUI();
}
// ===== PARTICULAS =====
let moviendo = 0;
let fondos = [
  "fondo1.jpg",
  "fondo2.jpg",
  "fondo3.jpg"
];

let fondoActual = 0;

function cambiarFondo() {
  fondoActual++;

  if (fondoActual >= fondos.length) {
    fondoActual = 0;
  }

  document.getElementById("fondo-escena").style.backgroundImage =
    "url(" + fondos[fondoActual] + ")";
}
tsParticles.load("particles", {
  background: { color: "#f5e6c8" },
  particles: {
    number: { value: 60 },
    color: { value: "#d4af37" },
    links: {
      enable: true,
      color: "#d4af37",
      distance: 140
    },
    move: { enable: true, speed: 0.5 }
  }
});

// ===== TRANSICION ENTRE PANTALLAS =====
function cambiar() {
  document.getElementById("pantalla1").style.transform = "translateX(-100%)";
  document.getElementById("pantalla2").style.transform = "translateX(0)";
}

// ===== VARIABLES =====
let x = 40;
let estado = 0;
let bloqueado = false;

// ===== MOVIMIENTO LOOP =====
function mover(dir) {
  if (bloqueado) return; //  bloquea controles

  x += dir * 5;

  // LOOP INFINITO
  if (x > 90) x = 0;
  if (x < 0) x = 90;
/*
if (x < 0) {
  x = 100;
  cambiarFondo();
}

if (x > 100) {
  x = 0;
  cambiarFondo();
}
*/
  let personaje = document.getElementById("personaje");
  personaje.style.left = x + "%";

  // ANIMACION SIMULADA
  /*
  estado = !estado;
  personaje.className = estado ? "figura triangulo" : "figura";
*/
  // FUTURO (sprites reales)
  if (estado) {
  personaje.src ="Caminando1.png";
} else {
 personaje.src ="Caminando2.png";}
 if (dir === -1) {
  personaje.style.transform = "translateX(-50%) scaleX(-1)";
} else {
  personaje.style.transform = "translateX(-50%) scaleX(1)";
}
}

// ===== ACCION (ENTER) =====
function accion() {
  if (bloqueado) return; //  evita spam

  // zona interactiva (40% - 60% pantalla)
  if (x > 40 && x < 60) {
    document.getElementById("dialogo").style.display = "block";
    bloqueado = true; //  activa bloqueo
  }
}

// ===== CERRAR DIALOGO =====
function cerrar() {
  document.getElementById("dialogo").style.display = "none";
  bloqueado = false; // libera controles
}
setInterval(() => {
  if (moviendo !== 0 && !bloqueado) {
    mover(moviendo);
  }
}, 50); // velocidad del movimiento
