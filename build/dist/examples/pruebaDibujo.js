import { Punto } from "../src/Punto.js";
import { Dibujante } from "../src/Dibujante.js";
import { Vector } from "../src/Vector.js";
const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");
CANVAS.width = 500;
CANVAS.height = 500;
CANVAS.style.backgroundColor = "darkblue";
window.addEventListener("load", () => {
    let dibujante = new Dibujante(CONTEXT);
    let vectorUno = Vector.segunComponentes(50, 100);
    vectorUno.origen = Punto.crear(200, 200);
    vectorUno = Vector.normalizar(vectorUno);
    console.log(vectorUno);
    function animar() {
        dibujante.trazarVector(vectorUno);
        requestAnimationFrame(animar);
    }
    animar();
});
