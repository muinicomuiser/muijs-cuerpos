import { Forma } from "../src/Formas.js";
import { Matematica } from "../src/Matematica.js";
import { Dibujante } from "../src/Dibujante.js";
const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");
CANVAS.width = 500;
CANVAS.height = 500;
CANVAS.style.backgroundColor = "darkblue";
window.addEventListener("load", () => {
    let circunferencia = Forma.circunferencia(250, 250, 4);
    let hexagono = Forma.poligono(100, 250, 6, 40);
    let octogono = Forma.poligono(400, 250, 8, 40);
    // let raya: Forma = Forma.linea({x: 100, y: 250}, {x: 400, y: 250});
    let punto1 = { x: 0, y: 0 };
    let punto2 = { x: 0, y: 0 };
    punto1.x = hexagono.posicion.x;
    punto1.y = hexagono.posicion.y;
    punto2.x = octogono.posicion.x;
    punto2.y = octogono.posicion.y;
    let dibujante = new Dibujante(CONTEXT);
    let raya = Forma.linea(hexagono.posicion, octogono.posicion);
    console.log(raya);
    dibujante.opacidad = 0.5;
    dibujante.color = "yellow";
    dibujante.grosorTrazo = 4;
    console.log(raya);
    function animar() {
        raya.moverVertice(1, hexagono.posicion);
        raya.moverVertice(2, octogono.posicion);
        CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
        dibujante.rellenar(circunferencia);
        dibujante.trazar(hexagono);
        dibujante.trazar(octogono);
        dibujante.trazar(raya);
        // raya.rotarSegunCentro(Matematica.gradoARadian(2))
        hexagono.rotarSegunPunto(circunferencia.posicion, Matematica.gradoARadian(2));
        octogono.rotarSegunPunto(circunferencia.posicion, Matematica.gradoARadian(2));
        hexagono.rotarSegunCentro(Matematica.gradoARadian(-2));
        octogono.rotarSegunCentro(Matematica.gradoARadian(-2));
        requestAnimationFrame(animar);
    }
    animar();
});
