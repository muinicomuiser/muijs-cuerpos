import { Renderizado, Dibujante, Celda, Cuadricula, Punto, Composicion, ManejadorEventos } from "../Fuente/mui.js";

// const CANVAS: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
// const CENTROCANVAS: Punto = {x: CANVAS.width / 2, y: CANVAS.height / 2}
const RENDERIZADOR: Renderizado = Renderizado.crearPorIdCanvas("canvas");
let cuadricula: Cuadricula = new Cuadricula(9, 9, 60, 20);
RENDERIZADOR.anchoCanvas = cuadricula.anchoCuadricula;
RENDERIZADOR.altoCanvas = cuadricula.altoCuadricula;
RENDERIZADOR.colorFondo = Dibujante.colorHSL(0, 0, 0);

window.addEventListener("load", () => {

    cuadricula.estadosAleatorios();
    let opacidad: number = 0.1
    let tono: number = 0;
    const COMPOSITOR: Composicion = new Composicion();

    ManejadorEventos.eventoTeclado('keyup', 'ArrowRight', (valor) => { if (tono < 360) { tono += valor } }, 5);
    ManejadorEventos.eventoTeclado('keyup', 'ArrowLeft', (valor) => { if (tono > 0) { tono -= valor } }, 5);
    ManejadorEventos.eventoTeclado('keyup', 'ArrowUp', (valor) => { if (opacidad <= 0.95) { opacidad += valor } }, 0.05);
    ManejadorEventos.eventoTeclado('keyup', 'ArrowDown', (valor) => { if (opacidad >= 0.05) { opacidad -= valor } }, 0.05);
    ManejadorEventos.eventoTeclado('keyup', 'Space', pintarCuadricula);

    function pintarCuadricula(): void {
        cuadricula.colorCeldas = Dibujante.colorHSL(tono, 80, 70)
        RENDERIZADOR.limpiarCanvas(opacidad);
        cuadricula.estadosAleatorios();
        cuadricula.rellenarCeldas(RENDERIZADOR);
    }
    // function animar() {
    //     COMPOSITOR.iterarPorSegundo(pintarCuadricula, 4);
    //     requestAnimationFrame(animar)
    // }

    // requestAnimationFrame(animar)
})
