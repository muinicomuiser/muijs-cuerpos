import { Forma } from "../src/Formas.js";
import { Matematica } from "../src/Matematica.js";
import { Dibujante } from "../src/Dibujante.js";
import { Vector } from "../src/Vector.js";
const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");
CANVAS.width = 800;
CANVAS.height = 800;
CANVAS.style.backgroundColor = "white";
// let centroCanvas: Punto = {x:CANVAS.width/2, y: CANVAS.height/2}
let centroCanvas = { x: CANVAS.width / 2, y: CANVAS.height / 2 };
window.addEventListener("load", () => {
    let dibujante = new Dibujante(CONTEXT);
    dibujante.color = "darkblue";
    dibujante.colorVectores = "red";
    let poligonoUno = Forma.poligono(250, 250, 50, 150);
    let poligonoDos = Forma.poligono(550, 550, 50, 150);
    console.log(poligonoUno.vertices);
    let vectorPrueba = Vector.crear(400, 400);
    console.log(poligonoUno.vertices);
    dibujante.trazar(poligonoUno);
    function animar() {
        CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
        poligonoUno.rotarSegunPunto(vectorPrueba, Matematica.gradoARadian(0.4));
        poligonoUno.rotarSegunCentro(Matematica.gradoARadian(-1));
        // dibujante.trazar(poligonoUno);
        for (let vertice of poligonoUno.vertices) {
            let linea = Vector.segunPuntos(centroCanvas, vertice);
            // dibujante.opacidad = 1-Matematica.raiz(vertice.x/CANVAS.width, 3);
            dibujante.grosorTrazo = 1;
            linea.origen = centroCanvas;
            dibujante.trazarVector(linea);
        }
        for (let vertice of poligonoUno.vertices) {
            // dibujante.opacidad = 1-Matematica.raiz(vertice.x/CANVAS.width, 3);
            let circulo = Forma.circunferencia(vertice.x, vertice.y, 5);
            dibujante.trazar(circulo);
        }
        poligonoDos.rotarSegunPunto(vectorPrueba, Matematica.gradoARadian(0.2));
        poligonoDos.rotarSegunCentro(Matematica.gradoARadian(-1));
        // dibujante.trazar(poligonoDos);
        for (let vertice of poligonoDos.vertices) {
            let linea = Vector.segunPuntos(centroCanvas, vertice);
            // dibujante.opacidad = 1-Matematica.raiz(vertice.x/CANVAS.width, 3);
            dibujante.grosorTrazo = 1;
            linea.origen = centroCanvas;
            dibujante.trazarVector(linea);
        }
        for (let vertice of poligonoDos.vertices) {
            // dibujante.opacidad = 1-Matematica.raiz(vertice.x/CANVAS.width, 3);
            let circulo = Forma.circunferencia(vertice.x, vertice.y, 5);
            dibujante.trazar(circulo);
        }
        requestAnimationFrame(animar);
    }
    animar();
});
