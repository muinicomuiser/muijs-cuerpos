import { Renderizado, Dibujante, Celda, Cuadricula, Punto } from "../Fuente/mui.js";

const CANVAS: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
const CENTROCANVAS: Punto = {x: CANVAS.width / 2, y: CANVAS.height / 2}

window.addEventListener("load", ()=>{
    
    let cuadricula: Cuadricula = new Cuadricula(90, 150, 6, 2);
    CANVAS.width = cuadricula.anchoCuadricula;
    CANVAS.height = cuadricula.altoCuadricula;
    cuadricula.estadosAleatorios();
    const RENDERIZADOR: Renderizado = new Renderizado(CANVAS);
    RENDERIZADOR.colorFondo = Dibujante.colorHSL(200, 0, 0);
    CANVAS.style.backgroundColor = RENDERIZADOR.colorFondo;
    cuadricula.colorCeldas = Dibujante.colorHSL(200, 0, 50)
    cuadricula.rellenarCeldas(RENDERIZADOR);
    function animar(){
        RENDERIZADOR.limpiarCanvas();
        cuadricula.estadosAleatorios();
        cuadricula.rellenarCeldas(RENDERIZADOR);
        requestAnimationFrame(animar)
    }
    requestAnimationFrame(animar)
})