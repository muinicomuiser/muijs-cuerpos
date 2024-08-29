import { Geometria, Punto, Forma, Vector, Renderizado, Cuerpo, Fuerza, Restriccion, Entorno, Matematica } from "../Fuente/mui.js";

//Archivo estandar para iniciar pruebas del módulo

//CONSTANTES
const COLORFONDO: string = Renderizado.colorHSL(220, 100, 0);
const DIBU: Renderizado = Renderizado.crearPorIdCanvas('canvas')
DIBU.anchoCanvas = 800;
DIBU.altoCanvas = 600;
DIBU.colorFondo = COLORFONDO;
const CENTROCANVAS: Punto = { x: DIBU.anchoCanvas / 2, y: DIBU.altoCanvas / 2 };

window.addEventListener("load", () => {
    function animar() {
        DIBU.limpiarCanvas()
        requestAnimationFrame(animar);
    }
    requestAnimationFrame(animar)
})

let DETECTARMOUSE: boolean = false;
eventosMouse(DETECTARMOUSE);
/**Detección de ingreso, movimiento y salida del mouse del canvas.      
 * Funciona con una variable boolean de activación
*/
function eventosMouse(detectar: boolean): void {
    if (detectar) {
        DIBU.canvas.addEventListener("mouseenter", (event) => {
            if (event) {
            }
        })
        DIBU.canvas.addEventListener("mouseleave", (event) => {
            if (event) {
            }
        })
        DIBU.canvas.addEventListener("mousemove", (event) => {
            let mouseX: number = event.pageX - DIBU.canvas.offsetLeft;
            let mouseY: number = event.pageY - DIBU.canvas.offsetTop
        })
    }
}


