import { Forma } from "../src/Formas.js";
import { Matematica } from "../src/Matematica.js";
import { Dibujante } from "../src/Dibujante.js";
import { Vector } from "../src/Vector.js";
const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");
CANVAS.width = 500;
CANVAS.height = 500;
CANVAS.style.backgroundColor = "darkblue";
window.addEventListener("load", () => {
    // let dibujante: Dibujante = new Dibujante(CONTEXT);
    // let vectorUno: Vector = Vector.segunComponentes(50, 100);
    // dibujante.color = "white";    
    // let poligonoUno = Forma.poligono(250, 250, 10, 80);
    // let vel: Vector = Vector.segunComponentes(150, 150)
    // console.log(poligonoUno)
    // poligonoUno.mover(vel)
    // console.log(poligonoUno)
    // poligonoUno.rotarSegunPunto({x: 350, y: 350}, Matematica.gradoARadian(10));
    // dibujante.trazar(poligonoUno);
    // console.log(poligonoUno)
    // function animar(){
    //     CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    //     dibujante.trazar(poligonoUno);
    //     // dibujante.trazarVector(poligonoUno.centro);
    //     //poligonoUno.rotarSegunCentro(Matematica.gradoARadian(2));
    //     poligonoUno.rotarSegunPunto({x: 350, y: 350}, Matematica.gradoARadian(2));
    //     // poligonoUno.mover(vel)
    //     requestAnimationFrame(animar);
    // }
    // animar();
});
function probar() {
    let dibujante = new Dibujante(CONTEXT);
    let vectorUno = Vector.segunComponentes(50, 100);
    dibujante.color = "white";
    let poligonoUno = Forma.poligono(250, 250, 10, 80);
    let vel = Vector.segunComponentes(150, 150);
    console.log(poligonoUno);
    poligonoUno.mover(vel);
    console.log(poligonoUno);
    poligonoUno.rotarSegunPunto({ x: 350, y: 350 }, Matematica.gradoARadian(10));
    dibujante.trazar(poligonoUno);
    console.log(poligonoUno);
}
probar();
