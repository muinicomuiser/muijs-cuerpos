import { Renderizado, Dibujante, Celda, Cuadricula, Punto, Composicion, ManejadorEventos } from "../Fuente/mui.js";

// const CANVAS: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
// const CENTROCANVAS: Punto = {x: CANVAS.width / 2, y: CANVAS.height / 2}
const RENDERIZADOR: Renderizado = Renderizado.crearPorIdCanvas("canvas");
let cuadricula: Cuadricula = new Cuadricula(45, 45, 15, 2);
RENDERIZADOR.anchoCanvas = cuadricula.anchoCuadricula;
RENDERIZADOR.altoCanvas = cuadricula.altoCuadricula;
RENDERIZADOR.colorFondo = Dibujante.colorHSL(0, 0, 0);

let PINTAR: boolean = true

window.addEventListener("load", () => {

    cuadricula.estadosAleatorios();
    let opacidad: number = 1
    let tono: number = 0;
    const COMPOSITOR: Composicion = new Composicion();

    ManejadorEventos.eventoTeclado('keyup', 'ArrowRight', (valor) => { if (tono < 360) { tono += valor } }, 5);
    ManejadorEventos.eventoTeclado('keyup', 'ArrowLeft', (valor) => { if (tono > 0) { tono -= valor } }, 5);
    ManejadorEventos.eventoTeclado('keyup', 'ArrowDown', (valor) => { if (opacidad <= 0.95) { opacidad += valor } }, 0.05);
    ManejadorEventos.eventoTeclado('keyup', 'ArrowUp', (valor) => { if (opacidad >= 0.05) { opacidad -= valor } }, 0.05);
    ManejadorEventos.eventoTeclado('keyup', 'Space', () => PINTAR = !PINTAR);

    ManejadorEventos.eventoMouseEnCanvas('click', RENDERIZADOR.canvas, (event) => {
        let mouseX = event.pageX - RENDERIZADOR.canvas.offsetLeft;
        let mouseY = event.pageY - RENDERIZADOR.canvas.offsetTop;
        cuadricula.celdaEnPosicionMouse(mouseX, mouseY).rellenar(RENDERIZADOR);
    })

    function pintarCuadricula(): void {
        cuadricula.colorCeldas = Dibujante.colorHSL(tono, 80, 70)
        RENDERIZADOR.limpiarCanvas(opacidad);
        cuadricula.estadosAleatorios();
        cuadricula.rellenarCeldas(RENDERIZADOR);
    }
    function animar() {
        if (PINTAR) {
            COMPOSITOR.iterarPorSegundo(pintarCuadricula, 2);
        }
        requestAnimationFrame(animar)
    }

    requestAnimationFrame(animar)
})
