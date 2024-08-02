import { Matematica } from "../Fuente/Utiles/Matematica.js";
import { Matriz } from "../Fuente/Utiles/Matrices.js";
import { Punto } from "../Fuente/GeometriaPlana/Punto.js";
import { Forma } from "../Fuente/GeometriaPlana/Formas.js";
import { Vector } from "../Fuente/GeometriaPlana/Vector.js";
import { Dibujante } from "../Fuente/Renderizado/Dibujante.js";
import { Cuerpo } from "../Fuente/Fisicas/Cuerpo.js";
import { Fuerza } from "../Fuente/Fisicas/Fuerza.js";

const CANVAS: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
const CONTEXT: CanvasRenderingContext2D = CANVAS.getContext("2d")!;
CANVAS.width = 650;
CANVAS.height = 650;
CANVAS.style.backgroundColor = Dibujante.colorHSL(220, 70, 0);
let centroCanvas: Punto = {x:CANVAS.width/2, y: CANVAS.height/2};
window.addEventListener("load", ()=>{
    let verticesPrueba = [Vector.crear(0, 30), Vector.crear(-20, -30), Vector.crear(0, -20), Vector.crear(20, -30)]
    let triangulo: Cuerpo = Cuerpo.poligono(centroCanvas.x*0.3, centroCanvas.y*0.3, 3, 30);
    triangulo.vertices = verticesPrueba;
    let dibujante: Dibujante = new Dibujante(CONTEXT);
    dibujante.color = Dibujante.colorHSL(220, 70, 100);
    dibujante.colorVectores = Dibujante.colorHSL(0, 70, 50);
    dibujante.grosorTrazo = 2;
    triangulo.rotarSegunVelocidad = true;
    triangulo.velocidad = new Vector(2, -2)
    triangulo.escala = 0.7;
    let atractor = new Vector(centroCanvas.x, centroCanvas.y)    
    // triangulo.rotacion = 1;
    triangulo.actualizarTransformacion()
    console.log(triangulo);
    // triangulo.trazar(dibujante);
    // triangulo.trazarVelocidad(dibujante);
    function animar(){
        let aceleracion: Vector = Vector.segunPuntos(triangulo.posicion, atractor);
        aceleracion = Vector.normalizar(aceleracion);
        aceleracion = Vector.escalar(aceleracion, 0.5)
        triangulo.aceleracion = aceleracion;
        dibujante.limpiarCanvas(CANVAS);
        // triangulo.rotar(Matematica.gradoARadian(2));

        ///
        CONTEXT.beginPath()
        CONTEXT.fillStyle = "white";
        // CONTEXT.fillText(`${(triangulo.posicion.y)}`, 30, 30, 80)
        CONTEXT.fillText(`${Vector.angulo(triangulo.velocidad) - Vector.angulo(triangulo.vertices[0])}`, 30, 30, 80)
        ///

        // triangulo.rotar(Matematica.gradoARadian(2))
        triangulo.mover();
        triangulo.trazar(dibujante);
        triangulo.trazarVelocidad(dibujante);
        requestAnimationFrame(animar);
    }
    animar()
})