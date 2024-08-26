import { Matematica } from "../Fuente/Utiles/Matematica.js";
import { Punto } from "../Fuente/GeometriaPlana/Punto.js";
import { Forma } from "../Fuente/GeometriaPlana/Formas.js";
import { Vector } from "../Fuente/GeometriaPlana/Vector.js";
import { Renderizado } from "../Fuente/Renderizado/Renderizado.js";
import { Cuerpo } from "../Fuente/Fisicas/Cuerpo.js";
import { Fuerza } from "../Fuente/Fisicas/Fuerza.js";
import { Geometria } from "../Fuente/Utiles/Geometria.js";
import { Restriccion } from "../Fuente/Interaccion/Restriccion.js";
import { Entorno } from "../Fuente/Interaccion/Entorno.js";

/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/

const CANVAS: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
CANVAS.width = 1150;
CANVAS.height = 680;

//CONSTANTES
const CENTROCANVAS: Punto = {x:CANVAS.width/2, y: CANVAS.height/2};

const COLORFONDO: string = Renderizado.colorHSL(220, 100, 0);

const DETECTARMOUSE: boolean = true;

////////////////

let mousePresente: boolean = false;
let mouse: Vector = Vector.cero();    
CANVAS.style.backgroundColor = COLORFONDO;
    
window.addEventListener("load", ()=>{
    const bordeCanvas: Forma = Forma.rectangulo(CENTROCANVAS.x, CENTROCANVAS.y, CANVAS.width, CANVAS.height);
    bordeCanvas.color = "white"
    const forma: Forma = Forma.poligono(500, 300, 5, 50)
    const cuerpo: Cuerpo = Cuerpo.poligono(200, 300, 5, 50)

    let dibu: Renderizado = new Renderizado(CANVAS)
    dibu.colorFondo = COLORFONDO;
    let vectorMouse: Vector = Vector.segunPuntos(CENTROCANVAS, mouse);
    function animar(){
        dibu.limpiarCanvas()
        bordeCanvas.trazar(dibu)
        /////////////////////////////////
        //Probando vértices transformados
        forma.trazar(dibu)
        // forma.rotar(1)
        cuerpo.trazar(dibu)
        // cuerpo.rotar(1)
        /////////////////////////////////
        vectorMouse = Vector.segunPuntos(CENTROCANVAS, mouse);
        dibu.colorTexto = "white";
        dibu.escribir(`Ángulo vector (en rad):  ${vectorMouse.angulo}`, 30, 30, 20, 2, "left")
        vectorMouse.origen = CENTROCANVAS
        dibu.trazarVector(vectorMouse)
        requestAnimationFrame(animar);
    }
    animar()
})
if(DETECTARMOUSE){
    CANVAS.addEventListener("mouseenter", (event)=>{
        if(event){
            mousePresente = true;
        }
    })
    CANVAS.addEventListener("mouseleave", (event)=>{
        if(event){
            mousePresente = false;
        }
    })
    CANVAS.addEventListener("mousemove", (event)=>{
        let mouseX: number = event.pageX - CANVAS.offsetLeft;
        let mouseY: number = event.pageY - CANVAS.offsetTop;
        mouse = Vector.crear(mouseX, mouseY);
    })
}

