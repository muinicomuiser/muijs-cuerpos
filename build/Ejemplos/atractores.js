import { Matematica } from "../Fuente/Utiles/Matematica.js";
import { Vector } from "../Fuente/GeometriaPlana/Vector.js";
import { Dibujante } from "../Fuente/Renderizado/Dibujante.js";
import { Cuerpo } from "../Fuente/Fisicas/Cuerpo.js";
import { Geometria } from "../Fuente/Utiles/Geometria.js";
const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");
let numeroAtractores = 1;
let numeroCuerpos = 120;
CANVAS.width = 650;
CANVAS.height = 650;
CANVAS.style.backgroundColor = Dibujante.colorHSL(220, 70, 0);
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
        cuerpitos.push(cuerpito);
        cuerpito.color = Dibujante.colorHSL(150, 100, 40);
    }
    return cuerpitos;
}
function crearAtractores(cuerpo) {
    let atractoresEnVertices = [];
    for (let vertice of cuerpo.verticesTransformados) {
        let atractor = Cuerpo.circunferencia(vertice.x, vertice.y, 8);
        atractor.color = Dibujante.colorHSL(300, 100, 40);
        atractoresEnVertices.push(atractor);
    }
    return atractoresEnVertices;
}
let escalita = 2;
let escalador = 0.01;
window.addEventListener("load", () => {
    let dibujante = new Dibujante(CONTEXT);
    dibujante.colorFondo = "black";
    dibujante.grosorTrazo = 1;
    function prueba() {
        dibujante.limpiarCanvas(CANVAS, 0.6);
        // dibujante.escribir("hola", centroCanvas.x, centroCanvas.y, 50, 300, "serif", "center")
        if (escalita > 4) {
            escalador = Matematica.absoluto(escalador) * -1;
        }
        if (escalita < 2) {
            escalador = Matematica.absoluto(escalador);
        }
        escalita += escalador;
        for (let i in atractores) {
            atractores[i].rotarSegunPunto({ x: centroCanvas.x, y: centroCanvas.y }, Geometria.gradoARadian(-1));
            atractores[i].mover();
            atractores[i].trazar(dibujante);
        }
        for (let cuerpito of cuerpos) {
            cuerpito.aceleracion = Vector.cero();
            for (let atractor of atractores) {
                let vectorAtraccion = Vector.segunPuntos(cuerpito.posicion, atractor.posicion);
                vectorAtraccion = Vector.escalar(Vector.normalizar(vectorAtraccion), 0.2);
                cuerpito.aceleracion = Vector.suma(vectorAtraccion, cuerpito.aceleracion);
            }
            cuerpito.escalar(escalita);
            cuerpito.mover();
            cuerpito.trazar(dibujante);
        }
        requestAnimationFrame(prueba);
    }
    prueba();
});
