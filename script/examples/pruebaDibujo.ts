import { Forma } from "../src/Formas.js";
import { Matematica } from "../src/Matematica.js";
import { Punto } from "../src/Punto.js";
import { Dibujante } from "../src/Dibujante.js";
import { Vector } from "../src/Vector.js";
const CANVAS: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
const CONTEXT: CanvasRenderingContext2D = CANVAS.getContext("2d")!;
CANVAS.width = 500;
CANVAS.height = 500;
CANVAS.style.backgroundColor = "darkblue";

window.addEventListener("load", ()=>{
    let dibujante: Dibujante = new Dibujante(CONTEXT);
    let vectorUno: Vector = Vector.segunComponentes(50, 100);
    vectorUno.origen = Punto.crear(200, 200);
    vectorUno = Vector.normalizar(vectorUno);    
    console.log(vectorUno)
    function animar(){
        dibujante.trazarVector(vectorUno);
        requestAnimationFrame(animar);
    }
    animar();
})