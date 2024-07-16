import { Forma } from "../src/Formas.js";
import { Matematica } from "../src/Matematica.js";
import { Punto } from "../src/Punto.js";
import { Dibujante } from "../src/Dibujante.js";
import { Vector } from "../src/Vector.js";
const CANVAS: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
const CONTEXT: CanvasRenderingContext2D = CANVAS.getContext("2d")!;
CANVAS.width = 500;
CANVAS.height = 500;
CANVAS.style.backgroundColor = "darkblue";

window.addEventListener("load", ()=>{
    let circunferencia: Forma = Forma.circunferencia(250, 250, 4);
    let hexagono: Forma = Forma.poligono(100, 250, 6, 40);
    let octogono: Forma = Forma.poligono(400, 250, 8, 40);
    // let raya: Forma = Forma.linea({x: 100, y: 250}, {x: 400, y: 250});
    let punto1: Punto = Punto.origen();
    let punto2: Punto = Punto.origen();
    punto1.x = hexagono.posicion.x
    punto1.y = hexagono.posicion.y
    punto2.x = octogono.posicion.x
    punto2.y = octogono.posicion.y
    let dibujante = new Dibujante(CONTEXT);
    let raya: Forma = Forma.recta(hexagono.posicion, octogono.posicion);
    dibujante.opacidad = 1;
    dibujante.color = "white";
    dibujante.grosorTrazo = 4;
    let vectorUno: Vector = Vector.segunComponentes(50, 100);
    vectorUno.origen = Punto.crear(250, 250);
    let trazo: Forma = Forma.trazo([Punto.crear(250, 210),Punto.crear(250, 250),Punto.crear(150, 300),Punto.crear(150, 200),Punto.crear(200, 150)])
    
    dibujante.trazar(trazo);
    function animar(){
        // trazo.ubicar(hexagono.posicion)
        let centroTrazo: Forma = Forma.circunferencia(trazo.posicion.x, trazo.posicion.y, 2)
        raya.moverVertice(0, hexagono.posicion);
        raya.moverVertice(1, octogono.posicion);
        CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
        vectorUno.origen = hexagono.posicion;
        dibujante.trazarVector(vectorUno);
        dibujante.trazar(trazo);
        dibujante.rellenar(centroTrazo)
        dibujante.rellenar(circunferencia);
        dibujante.trazar(hexagono);
        dibujante.trazar(octogono);
        dibujante.trazar(raya)
        // raya.rotarSegunCentro(Matematica.gradoARadian(2))
        hexagono.rotarSegunPunto(circunferencia.posicion, Matematica.gradoARadian(2));
        octogono.rotarSegunPunto(circunferencia.posicion, Matematica.gradoARadian(2));
        hexagono.rotarSegunCentro(Matematica.gradoARadian(-2));
        trazo.rotarSegunPunto(trazo.vertices[1], Matematica.gradoARadian(-4));
        // trazo.rotarSegunCentro(Matematica.gradoARadian(-4));
        // octogono.rotarSegunCentro(Matematica.gradoARadian(-2));
        requestAnimationFrame(animar);
    }
    animar();
})