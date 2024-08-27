import { Geometria, Punto, Forma, Vector, Renderizado, Cuerpo, Fuerza, Restriccion, Entorno, Matematica } from "../Fuente/mui.js";

//Archivo estandar para iniciar pruebas del módulo

//CONSTANTES
const CANVAS: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
const COLORFONDO: string = Renderizado.colorHSL(220, 100, 0);
const DIBU: Renderizado = new Renderizado(CANVAS)
CANVAS.width = 800;
CANVAS.height = 600;
const CENTROCANVAS: Punto = {x:CANVAS.width/2, y: CANVAS.height/2};
CANVAS.style.backgroundColor = COLORFONDO;
DIBU.colorFondo = COLORFONDO;
DIBU.colorTrazo = "yellow"

//Crear objetos
let triangulo: Cuerpo = Cuerpo.poligono(CENTROCANVAS.x, CENTROCANVAS.y, 3, 100, {colorTrazo: "red", escala: 1.5, rellenada: true});
let trianguloAcoplado: Cuerpo = Cuerpo.poligono(CENTROCANVAS.x, CENTROCANVAS.y, 3, 30, {rellenada: false});
console.log(trianguloAcoplado)
let circulitoAcoplado: Cuerpo = Cuerpo.circunferencia(CENTROCANVAS.x, CENTROCANVAS.y*1.5, 30)

/**Mueve el cuerpo a un vértice y retorna un cuerpo*/
function acoplar(cuerpo: Cuerpo, vertice: Vector): Cuerpo{
    cuerpo.posicion = vertice;
    return cuerpo;
}


window.addEventListener("load", ()=>{
    function animar(){
        DIBU.limpiarCanvas()
        
        //Prueba acople.
        triangulo.rotar(0.02);
        triangulo.mover()
        trianguloAcoplado = acoplar(trianguloAcoplado, triangulo.verticesTransformados[1]);
        trianguloAcoplado.rotacion = Vector.angulo(Vector.segunPuntos(triangulo.posicion, trianguloAcoplado.posicion))

        
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
function eventosMouse(detectar: boolean): void{
    if(detectar){
        CANVAS.addEventListener("mouseenter", (event)=>{
            if(event){
            }
        })
        CANVAS.addEventListener("mouseleave", (event)=>{
            if(event){
            }
        })
        CANVAS.addEventListener("mousemove", (event)=>{
            let mouseX: number = event.pageX - CANVAS.offsetLeft;
            let mouseY: number = event.pageY - CANVAS.offsetTop
        })
    }
}


