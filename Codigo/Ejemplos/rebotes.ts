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
import { Composicion } from "../Fuente/Composicion/Composicion.js";
import { Interaccion } from "../Fuente/Interaccion/Interaccion.js";

/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/

const CANVAS: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
const CONTEXT: CanvasRenderingContext2D = CANVAS.getContext("2d")!;
CANVAS.width = 1150;
CANVAS.height = 680;

//CONSTANTES
const CENTROCANVAS: Punto = {x:CANVAS.width/2, y: CANVAS.height/2};

const RADIOFORMAGENERADORA: number = 100;
const NUMEROCUERPOS: number = 10;
const RADIOCUERPO: number = 20;
// const ESCALA: number = 2;

const ROTARSEGUNVELOCIDAD: boolean = false;

const COLORCUERPO: string = Renderizado.colorHSL(220, 0, 100);
const COLORFONDO: string = Renderizado.colorHSL(220, 100, 2);


////////////////

CANVAS.style.backgroundColor = COLORFONDO;
    
window.addEventListener("load", ()=>{
    
    let entorno: Entorno = new Entorno(CANVAS);
    let dibu: Renderizado = new Renderizado(CANVAS)
    dibu.colorFondo = COLORFONDO;
    /**Forma generadora de posiciones.*/
    let formaGeneradora: Forma = Forma.poligono(CENTROCANVAS.x, CENTROCANVAS.y, NUMEROCUERPOS, RADIOFORMAGENERADORA);
    
    /**Cuerpos.*/
    let cuerpos: Cuerpo[] = [];
    for(let i:number = 0; i < NUMEROCUERPOS; i++){
        let cuerpito: Cuerpo = Cuerpo.circunferencia(formaGeneradora.verticesTransformados[i].x, formaGeneradora.verticesTransformados[i].y, RADIOCUERPO);
        cuerpito.color = COLORCUERPO;
        cuerpito.velocidad = Vector.crear(Matematica.aleatorio(-3, 3), Matematica.aleatorio(-3, 3));
        cuerpos.push(cuerpito);

    }

    function animar(){
        dibu.limpiarCanvas()
        for(let cuerpito of cuerpos){
            cuerpito.posicion = entorno.envolverBorde(cuerpito.posicion);
        }
        cuerpos = Composicion.actualizarMovimientoCuerpos(cuerpos);
        cuerpos = Interaccion.reboteEntreCuerpos(cuerpos);
        dibu.trazarFormas(cuerpos)
        requestAnimationFrame(animar);
    }
    animar()
})


