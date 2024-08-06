import { Matematica } from "../Fuente/Utiles/Matematica.js";
import { Matriz } from "../Fuente/Utiles/Matrices.js";
import { Punto } from "../Fuente/GeometriaPlana/Punto.js";
import { Forma } from "../Fuente/GeometriaPlana/Formas.js";
import { Vector } from "../Fuente/GeometriaPlana/Vector.js";
import { Dibujante } from "../Fuente/Renderizado/Dibujante.js";
import { Cuerpo } from "../Fuente/Fisicas/Cuerpo.js";
import { Fuerza } from "../Fuente/Fisicas/Fuerza.js";
import { Colision } from "../Fuente/Interaccion/Colision.js";

const CANVAS: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
const CONTEXT: CanvasRenderingContext2D = CANVAS.getContext("2d")!;
CANVAS.width = 650;
CANVAS.height = 650;
CANVAS.style.backgroundColor = Dibujante.colorHSL(220, 70, 100);
let centroCanvas: Punto = {x:CANVAS.width/2, y: CANVAS.height/2};
window.addEventListener("load", ()=>{
    let poligonoUno: Forma = Forma.poligono(centroCanvas.x, centroCanvas.y, 3, 150);
    let cuadradoDos: Forma = Forma.rectangulo(centroCanvas.x + 150, centroCanvas.y + 150, 170, 170);
    let circunferenciaTres: Forma = Forma.circunferencia(centroCanvas.x -200, centroCanvas.y -200, 100);
    
    let dibujanteUno: Dibujante = new Dibujante(CONTEXT)
    let dibujanteDos: Dibujante = new Dibujante(CONTEXT)
    let dibujanteTres: Dibujante = new Dibujante(CONTEXT);

    dibujanteUno.color = "blue"
    dibujanteDos.color = "green"
    dibujanteTres.color = "yellow"
    dibujanteUno.opacidad = 0.4
    dibujanteDos.opacidad = 0.4
    dibujanteTres.opacidad = 0.4
    
    function animar(){
        dibujanteUno.limpiarCanvas(CANVAS)
        poligonoUno.rotar(Matematica.gradoARadian(1));
        cuadradoDos.rotarSegunPunto(centroCanvas, Matematica.gradoARadian(-1))
        if(Colision.detectar(poligonoUno, cuadradoDos)){
            dibujanteDos.color = "red"
            dibujanteUno.color = "red"
        }
        else if(Colision.detectar(circunferenciaTres, cuadradoDos)){
            dibujanteDos.color = "orange"
            dibujanteTres.color = "red"
        }
        else{
            dibujanteTres.color = "yellow"
            dibujanteDos.color = "green"
            dibujanteUno.color = "blue"
        }
        dibujanteUno.rellenar(poligonoUno)
        dibujanteDos.rellenar(cuadradoDos)
        dibujanteTres.rellenar(circunferenciaTres)

        requestAnimationFrame(animar);
    }
    animar()
})