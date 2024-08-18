import { Matematica } from "../Fuente/Utiles/Matematica.js";
import { Forma } from "../Fuente/GeometriaPlana/Formas.js";
import { Vector } from "../Fuente/GeometriaPlana/Vector.js";
import { Renderizado } from "../Fuente/Renderizado/Renderizado.js";
import { Cuerpo } from "../Fuente/Fisicas/Cuerpo.js";
import { Fuerza } from "../Fuente/Fisicas/Fuerza.js";
import { Entorno } from "../Fuente/Interaccion/Entorno.js";
import { Composicion } from "../Fuente/Composicion/Composicion.js";
import { Interaccion } from "../Fuente/Interaccion/Interaccion.js";
/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/
const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");
CANVAS.width = 850;
CANVAS.height = 680;
//CONSTANTES
const CENTROCANVAS = { x: CANVAS.width / 2, y: CANVAS.height / 2 };
const RADIOFORMAGENERADORA = 100;
const RADIOENTORNO = 200;
const LADOSENTORNO = 10;
const NUMEROCUERPOS = 300;
const RADIOCUERPO = 5;
let COLORCUERPO = Renderizado.colorHSL(220, 0, 100);
let COLORFONDO = Renderizado.colorHSL(220, 100, 0);
////////////////
CANVAS.style.backgroundColor = COLORFONDO;
window.addEventListener("load", () => {
    let entorno = new Entorno(CANVAS);
    let dibu = new Renderizado(CANVAS);
    dibu.colorFondo = COLORFONDO;
    /**Forma generadora de posiciones.*/
    let formaGeneradora = Forma.poligono(CENTROCANVAS.x, CENTROCANVAS.y, NUMEROCUERPOS, RADIOFORMAGENERADORA);
    /**Cuerpos.*/
    let cuerpos = [];
    for (let i = 0; i < NUMEROCUERPOS; i++) {
        let cuerpito = Cuerpo.circunferencia(formaGeneradora.verticesTransformados[i].x, formaGeneradora.verticesTransformados[i].y, RADIOCUERPO);
        cuerpito.color = COLORCUERPO;
        cuerpito.velocidad = Vector.crear(Matematica.aleatorio(-1, 1), Matematica.aleatorio(-1, 1));
        cuerpos.push(cuerpito);
    }
    let cuerpoEntorno = Cuerpo.poligono(CENTROCANVAS.x, CENTROCANVAS.y, LADOSENTORNO, RADIOENTORNO);
    entorno.cuerpo = cuerpoEntorno;
    entorno.cuerpo.color = "white";
    requestAnimationFrame(animar);
    function animar() {
        function contador() {
            let tiempoInicio = Date.now();
            dibu.limpiarCanvas();
            // for(let cuerpito of cuerpos){
            //     cuerpito.posicion = entorno.envolverBorde(cuerpito.posicion);
            // }
            cuerpos = entorno.rebotarConBorde(cuerpos);
            cuerpos = Composicion.actualizarMovimientoCuerpos(cuerpos);
            cuerpos = Interaccion.reboteEntreCuerpos(cuerpos);
            for (let cuerpito of cuerpos) {
                // cuerpito.aceleracion = Fuerza.atraerAVector(cuerpito, Vector.crear(CENTROCANVAS.x, CENTROCANVAS.y), 0.02)
                cuerpito.aceleracion = Fuerza.repelerDeVector(cuerpito, Vector.crear(CENTROCANVAS.x, CENTROCANVAS.y), 0.02);
                cuerpito.velocidad = Vector.escalar(cuerpito.velocidad, 0.995);
                if (cuerpito.velocidad.magnitud < 0.005) {
                    cuerpito.velocidad = Vector.cero();
                }
            }
            dibu.trazar(entorno.cuerpo);
            dibu.trazarFormas(cuerpos);
            let tiempoFinal = Date.now();
            dibu.escribir((`${tiempoFinal - tiempoInicio}` + " milisegundos"), 20, 20, 12, 2, "calibri", "left");
        }
        contador();
        requestAnimationFrame(animar);
    }
    animar();
});
