import { Vector } from "../Fuente/GeometriaPlana/Vector.js";
import { Renderizado } from "../Fuente/Renderizado/Renderizado.js";
/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/
const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");
CANVAS.width = 1150;
CANVAS.height = 680;
//CONSTANTES
const CENTROCANVAS = { x: CANVAS.width / 2, y: CANVAS.height / 2 };
const COLORBOID = Renderizado.colorHSL(220, 0, 100);
const COLORFONDO = Renderizado.colorHSL(220, 100, 2);
const DETECTARMOUSE = true;
////////////////
let mousePresente = false;
let mouse = Vector.cero();
CANVAS.style.backgroundColor = COLORFONDO;
window.addEventListener("load", () => {
    let dibu = new Renderizado(CANVAS);
    dibu.colorFondo = COLORFONDO;
    let vectorMouse = Vector.segunPuntos(CENTROCANVAS, mouse);
    function animar() {
        dibu.limpiarCanvas();
        vectorMouse = Vector.segunPuntos(CENTROCANVAS, mouse);
        dibu.colorTexto = "white";
        dibu.escribir(`${vectorMouse.angulo}`, 20, 20, 30, 2, undefined, "left");
        vectorMouse.origen = CENTROCANVAS;
        dibu.trazarVector(vectorMouse);
        requestAnimationFrame(animar);
    }
    animar();
});
if (DETECTARMOUSE) {
    CANVAS.addEventListener("mouseenter", (event) => {
        if (event) {
            mousePresente = true;
        }
    });
    CANVAS.addEventListener("mouseleave", (event) => {
        if (event) {
            mousePresente = false;
        }
    });
    CANVAS.addEventListener("mousemove", (event) => {
        let mouseX = event.pageX - CANVAS.offsetLeft;
        let mouseY = event.pageY - CANVAS.offsetTop;
        mouse = Vector.crear(mouseX, mouseY);
    });
}
