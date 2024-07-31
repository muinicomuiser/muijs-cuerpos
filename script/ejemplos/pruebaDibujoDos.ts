import { Forma } from "../src/Formas.js";
import { Matematica } from "../src/Matematica.js";
import { Punto } from "../src/Punto.js";
import { Dibujante } from "../src/Dibujante.js";
import { Vector } from "../src/Vector.js";
import { Cuerpo } from "../src/Cuerpo.js";
import { Fuerza } from "../src/Fuerza.js";

const CANVAS: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
const CONTEXT: CanvasRenderingContext2D = CANVAS.getContext("2d")!;
CANVAS.width = 650;
CANVAS.height = 650;
CANVAS.style.backgroundColor = Dibujante.colorHSL(220, 70, 0);
let centroCanvas: Punto = {x:CANVAS.width/2, y: CANVAS.height/2};
window.addEventListener("load", ()=>{
    let verticesPrueba = [Vector.crear(0, 30), Vector.crear(-15, -30), Vector.crear(0, -20), Vector.crear(15, -30)]
    let triangulo: Cuerpo = Cuerpo.poligono(centroCanvas.x*0.4, centroCanvas.y*0.3, 3, 30);
    triangulo.vertices = verticesPrueba;
    let atractor: Cuerpo = Cuerpo.circunferencia(centroCanvas.x, centroCanvas.y*1.4, 10);
    let atractorDos: Cuerpo = Cuerpo.circunferencia(centroCanvas.x, centroCanvas.y*0.6, 10);
    let dibujante: Dibujante = new Dibujante(CONTEXT);
    dibujante.color = Dibujante.colorHSL(220, 70, 100);
    dibujante.colorVectores = Dibujante.colorHSL(220, 100, 70)
    dibujante.grosorTrazo = 2;
    triangulo.velocidad = Vector.crear(0, 5);
    triangulo.rotarSegunVelocidad = true;
    triangulo.escala = 0.5;
    // triangulo.rotacion = Matematica.gradoARadian(45);
    triangulo.actualizarTransformacion();
    triangulo.trazar(dibujante);
    triangulo.trazarVelocidad(dibujante);
    console.log(triangulo);
    function animar(){
        let atraccion: Vector = Vector.suma(Vector.segunPuntos(triangulo.posicion, atractor.posicion), Vector.segunPuntos(triangulo.posicion, atractorDos.posicion));
        atraccion = Vector.normalizar(atraccion);
        atraccion = Vector.escalar(atraccion, 0.3);
        triangulo.aceleracion = atraccion;
        triangulo.mover();
        dibujante.limpiarCanvas(CANVAS);
        atractor.rotarSegunPunto(centroCanvas, 0.02);
        atractorDos.rotarSegunPunto(centroCanvas, 0.02);
        atractor.trazar(dibujante);
        atractorDos.trazar(dibujante);
        triangulo.trazar(dibujante);
        triangulo.trazarVelocidad(dibujante);
        requestAnimationFrame(animar);
    }
    animar()
})