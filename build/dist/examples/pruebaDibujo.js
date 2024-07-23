import { Matematica } from "../src/Matematica.js";
import { Dibujante } from "../src/Dibujante.js";
import { Vector } from "../src/Vector.js";
import { Cuerpo } from "../src/Cuerpo.js";
const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");
CANVAS.width = 650;
CANVAS.height = 650;
CANVAS.style.backgroundColor = Dibujante.colorHSL(220, 70, 0);
let centroCanvas = { x: CANVAS.width / 2, y: CANVAS.height / 2 };
let velocidad = Vector.crear(1, 1);
let cuerpoDeCuerpos = Cuerpo.poligono(centroCanvas.x * 1.5, centroCanvas.y, 100, 20);
let cuerpoGuia = Cuerpo.poligono(centroCanvas.x, centroCanvas.y, 1, 100);
let atractores = crearAtractores(cuerpoGuia);
let cuerpos = crearCuerpos(cuerpoDeCuerpos);
function crearCuerpos(cuerpo) {
    let cuerpitos = [];
    for (let vertice of cuerpo.verticesTransformados) {
        let atractor = Cuerpo.circunferencia(vertice.x, vertice.y, 10);
        cuerpitos.push(atractor);
    }
    return cuerpitos;
}
function crearAtractores(cuerpo) {
    let atractoresEnVertices = [];
    for (let vertice of cuerpo.verticesTransformados) {
        let atractor = Cuerpo.circunferencia(vertice.x, vertice.y, 8);
        atractoresEnVertices.push(atractor);
    }
    return atractoresEnVertices;
}
window.addEventListener("load", () => {
    let dibujante = new Dibujante(CONTEXT);
    dibujante.grosorTrazo = 3;
    function prueba() {
        CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
        dibujante.color = Dibujante.colorHSL(300, 100, 40);
        for (let i in atractores) {
            // atractores[i].posicion = cuerpoGuia.verticesTransformados[i];
            atractores[i].rotarSegunPunto({ x: centroCanvas.x, y: centroCanvas.y }, Matematica.gradoARadian(-1));
            atractores[i].actualizarMovimiento();
            atractores[i].rellenar(dibujante);
        }
        dibujante.color = Dibujante.colorHSL(200, 100, 40);
        for (let cuerpito of cuerpos) {
            cuerpito.aceleracion = Vector.cero();
            for (let atractor of atractores) {
                let vectorAtraccion = Vector.segunPuntos(cuerpito.posicion, atractor.posicion);
                vectorAtraccion = Vector.escalar(Vector.normalizar(vectorAtraccion), 0.1);
                cuerpito.aceleracion = Vector.suma(vectorAtraccion, cuerpito.aceleracion);
            }
            cuerpito.actualizarMovimiento();
            cuerpito.trazar(dibujante);
        }
        requestAnimationFrame(prueba);
    }
    prueba();
});
