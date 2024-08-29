import { Matematica, Punto, Forma, Vector, Renderizado, Cuerpo, Fuerza, Geometria, Restriccion, Entorno } from "../Fuente/mui.js"

/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/


//CONSTANTES
const dibu: Renderizado = Renderizado.crearPorIdCanvas('canvas')
const COLORFONDO: string = Renderizado.colorHSL(220, 100, 0);
dibu.anchoCanvas = 1150;
dibu.altoCanvas = 680;
dibu.colorFondo = COLORFONDO;


const CENTROCANVAS: Punto = { x: dibu.anchoCanvas / 2, y: dibu.altoCanvas / 2 };


const DETECTARMOUSE: boolean = true;

////////////////

let mousePresente: boolean = false;
let mouse: Vector = Vector.cero();

window.addEventListener("load", () => {
    const bordeCanvas: Forma = Forma.rectangulo(CENTROCANVAS.x, CENTROCANVAS.y, dibu.anchoCanvas, dibu.altoCanvas);
    bordeCanvas.colorTrazo = "white"
    const forma: Forma = Forma.poligono(500, 300, 5, 50)
    const cuerpo: Cuerpo = Cuerpo.poligono(200, 300, 5, 50)

    dibu.opcionesTexto = { tamano: 20, alineacion: "left" };
    dibu.colorFondo = COLORFONDO;
    let vectorMouse: Vector = Vector.segunPuntos(CENTROCANVAS, mouse);
    function animar() {
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
        dibu.opcionesTexto = { color: "white" };
        dibu.escribir(`Ángulo vector (en rad):  ${vectorMouse.angulo}`, 30, 30)
        vectorMouse.origen = CENTROCANVAS
        dibu.trazarVector(vectorMouse)
        requestAnimationFrame(animar);
    }
    animar()
})
if (DETECTARMOUSE) {
    dibu.canvas.addEventListener("mouseenter", (event) => {
        if (event) {
            mousePresente = true;
        }
    })
    dibu.canvas.addEventListener("mouseleave", (event) => {
        if (event) {
            mousePresente = false;
        }
    })
    dibu.canvas.addEventListener("mousemove", (event) => {
        let mouseX: number = event.pageX - dibu.canvas.offsetLeft;
        let mouseY: number = event.pageY - dibu.canvas.offsetTop;
        mouse = Vector.crear(mouseX, mouseY);
    })
}

