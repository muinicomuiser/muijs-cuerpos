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
const CONTEXT: CanvasRenderingContext2D = CANVAS.getContext("2d")!;
CANVAS.width = 1150;
CANVAS.height = 680;

//CONSTANTES
const CENTROCANVAS: Punto = {x:CANVAS.width/2, y: CANVAS.height/2};

const COLORBOID: string = Renderizado.colorHSL(220, 0, 100);
const COLORFONDO: string = Renderizado.colorHSL(220, 100, 2);

const DETECTARMOUSE: boolean = true;

////////////////

let mousePresente: boolean = false;
let mouse: Vector = Vector.cero();    
CANVAS.style.backgroundColor = COLORFONDO;
    
window.addEventListener("load", ()=>{
    
    let dibu: Renderizado = new Renderizado(CANVAS)
    dibu.colorFondo = COLORFONDO;
    let vectorMouse: Vector = Vector.segunPuntos(CENTROCANVAS, mouse);
    function animar(){
        dibu.limpiarCanvas()
        vectorMouse = Vector.segunPuntos(CENTROCANVAS, mouse);
        dibu.colorTexto = "white";
        dibu.escribir(`${vectorMouse.angulo}`, 20, 20, 30, 2, "left")
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

