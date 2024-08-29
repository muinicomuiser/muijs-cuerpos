import { Geometria, Punto, Forma, Vector, Renderizado, Cuerpo, Fuerza, Restriccion, Entorno, Matematica, Temporizador, Composicion } from "../Fuente/mui.js";

//Archivo estandar para iniciar pruebas del módulo

//CONSTANTES
const COLORFONDO: string = Renderizado.colorHSL(220, 100, 0);
const DIBU: Renderizado = Renderizado.crearPorIdCanvas("canvas")
DIBU.anchoCanvas = 800;
DIBU.altoCanvas = 600;
const CENTROCANVAS: Punto = { x: DIBU.anchoCanvas / 2, y: DIBU.altoCanvas / 2 };
DIBU.colorFondo = COLORFONDO;
DIBU.colorTrazo = "yellow"

//Crear objetos
let triangulo: Cuerpo = Cuerpo.poligono(CENTROCANVAS.x, CENTROCANVAS.y, 3, 100, { colorTrazo: "red", escala: 1.5, rellenada: true });
let trianguloAcoplado: Cuerpo = Cuerpo.poligono(CENTROCANVAS.x, CENTROCANVAS.y, 3, 30, { rellenada: false });
console.log(trianguloAcoplado)
let circulitoAcoplado: Cuerpo = Cuerpo.circunferencia(CENTROCANVAS.x, CENTROCANVAS.y * 1.5, 30)

/**Mueve el cuerpo a un vértice y retorna un cuerpo*/
function acoplar(cuerpo: Cuerpo, vertice: Vector): Cuerpo {
    cuerpo.posicion = vertice;
    return cuerpo;
}
const COMPOSITOR: Composicion = new Composicion();
let Cronometro: Temporizador = COMPOSITOR.crearTemporizador(1000);
DIBU.opcionesTexto = { tamano: 20, color: "green" }
window.addEventListener("load", () => {
    function animar() {
        DIBU.limpiarCanvas()

        //Prueba acople.
        triangulo.rotar(0.02);
        triangulo.mover()
        trianguloAcoplado = acoplar(trianguloAcoplado, triangulo.verticesTransformados[1]);
        trianguloAcoplado.rotacion = Vector.angulo(Vector.segunPuntos(triangulo.posicion, trianguloAcoplado.posicion))

        if (Cronometro.activo) {
            DIBU.escribir('pun pun', 40, 40)
        }
        COMPOSITOR.actualizarTemporizadores()
        DIBU.escribir(`${COMPOSITOR.numeroTemporizadores}`, 200, 100)
        //Dibujo
        DIBU.renderizarFormas([triangulo, trianguloAcoplado])
        // triangulo.trazar(DIBU);
        // trianguloAcoplado.trazar(DIBU)

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


