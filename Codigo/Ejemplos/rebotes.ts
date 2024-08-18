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
import { Colision } from "../Fuente/Interaccion/Colision.js";

/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/

const CANVAS: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
const CONTEXT: CanvasRenderingContext2D = CANVAS.getContext("2d")!;
CANVAS.width = 850;
CANVAS.height = 680;

//CONSTANTES
const CENTROCANVAS: Punto = {x:CANVAS.width/2, y: CANVAS.height/2};

const RADIOFORMAGENERADORA: number = 100;

const RADIOENTORNO: number = 200;
const LADOSENTORNO: number = 10;

const NUMEROCUERPOS: number = 300;
const RADIOCUERPO: number = 5;

let COLORCUERPO: string = Renderizado.colorHSL(220, 0, 100);
let COLORFONDO: string = Renderizado.colorHSL(220, 100, 0);

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
        cuerpito.velocidad = Vector.crear(Matematica.aleatorio(-1, 1), Matematica.aleatorio(-1, 1));
        cuerpos.push(cuerpito);
    }
    let cuerpoEntorno: Cuerpo = Cuerpo.poligono(CENTROCANVAS.x, CENTROCANVAS.y, LADOSENTORNO, RADIOENTORNO);
    entorno.cuerpo = cuerpoEntorno;
    entorno.cuerpo.color = "white"
    
    requestAnimationFrame(animar);
    function animar(){
        function contador(): void{
            let tiempoInicio: number = Date.now();
            dibu.limpiarCanvas()
            // for(let cuerpito of cuerpos){
            //     cuerpito.posicion = entorno.envolverBorde(cuerpito.posicion);
            // }
            cuerpos = entorno.rebotarConBorde(cuerpos)
            cuerpos = Composicion.actualizarMovimientoCuerpos(cuerpos);
            cuerpos = Interaccion.reboteEntreCuerpos(cuerpos);
            for(let cuerpito of cuerpos){
                // cuerpito.aceleracion = Fuerza.atraerAVector(cuerpito, Vector.crear(CENTROCANVAS.x, CENTROCANVAS.y), 0.02)
                cuerpito.aceleracion = Fuerza.repelerDeVector(cuerpito, Vector.crear(CENTROCANVAS.x, CENTROCANVAS.y), 0.02);
                cuerpito.velocidad = Vector.escalar(cuerpito.velocidad, 0.995)
                if(cuerpito.velocidad.magnitud < 0.005){
                    cuerpito.velocidad = Vector.cero()
                }
            }
            dibu.trazar(entorno.cuerpo)
            dibu.trazarFormas(cuerpos)
            let tiempoFinal: number = Date.now();
            dibu.escribir((`${tiempoFinal - tiempoInicio}` + " milisegundos"), 20, 20, 12, 2, "calibri", "left")
        }
        contador()
        requestAnimationFrame(animar);
    }
    animar()
})


