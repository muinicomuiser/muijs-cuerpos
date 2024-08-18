import { Geometria } from "../Fuente/Utiles/Geometria.js";
import { Vector } from "../Fuente/GeometriaPlana/Vector.js";
import { Renderizado } from "../Fuente/Renderizado/Renderizado.js";
import { Cuerpo } from "../Fuente/Fisicas/Cuerpo.js";
import { Fuerza } from "../Fuente/Fisicas/Fuerza.js";
const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");
let numeroAtractores = 1;
let numeroCuerpos = 120;
CANVAS.width = 650;
CANVAS.height = 650;
CANVAS.style.backgroundColor = Renderizado.colorHSL(220, 70, 0);
let centroCanvas = { x: CANVAS.width / 2, y: CANVAS.height / 2 };
let velocidad = Vector.crear(1, 1);
let cuerpoDeCuerpos = Cuerpo.poligono(centroCanvas.x * 1.1, centroCanvas.y, numeroCuerpos, 20);
let cuerpoGuia = Cuerpo.poligono(centroCanvas.x, centroCanvas.y, numeroAtractores, 100);
let atractores = crearAtractores(cuerpoGuia);
let cuerpos = crearCuerpos(cuerpoDeCuerpos);
function crearCuerpos(cuerpo) {
    let cuerpitos = [];
    for (let vertice of cuerpo.verticesTransformados) {
        let cuerpito = Cuerpo.circunferencia(vertice.x, vertice.y, 10);
        cuerpito.color = Renderizado.colorHSL(150, 100, 40);
        cuerpitos.push(cuerpito);
    }
    return cuerpitos;
}
function crearAtractores(cuerpo) {
    let atractoresEnVertices = [];
    for (let vertice of cuerpo.verticesTransformados) {
        let atractor = Cuerpo.circunferencia(vertice.x, vertice.y, 8);
        atractor.color = Renderizado.colorHSL(300, 100, 40);
        atractoresEnVertices.push(atractor);
    }
    return atractoresEnVertices;
}
let escalita = 2;
let escalador = 0.01;
window.addEventListener("load", () => {
    let renderizado = new Renderizado(CANVAS);
    renderizado.colorFondo = "black";
    renderizado.grosorTrazo = 1;
    function prueba() {
        renderizado.limpiarCanvas(0.6);
        // Renderizado.escribir("hola", centroCanvas.x, centroCanvas.y, 50, 300, "serif", "center")
        if (escalita > 4) {
            escalador = Math.abs(escalador) * -1;
        }
        if (escalita < 2) {
            escalador = Math.abs(escalador);
        }
        escalita += escalador;
        for (let i in atractores) {
            atractores[i].rotarSegunPunto({ x: centroCanvas.x, y: centroCanvas.y }, Geometria.gradoARadian(-1));
            atractores[i].mover();
            atractores[i].trazar(renderizado);
        }
        for (let cuerpito of cuerpos) {
            cuerpito.aceleracion = Vector.cero();
            for (let atractor of atractores) {
                let vectorAtraccion = Fuerza.atraer(cuerpito, atractor, 0.2);
                cuerpito.aceleracion = Vector.suma(vectorAtraccion, cuerpito.aceleracion);
            }
            cuerpito.escala = escalita;
            cuerpito.mover();
            cuerpito.trazar(renderizado);
        }
        requestAnimationFrame(prueba);
    }
    prueba();
});
