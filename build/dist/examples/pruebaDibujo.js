import { Forma } from "../src/Formas.js";
import { Matematica } from "../src/Matematica.js";
import { Dibujante } from "../src/Dibujante.js";
import { Vector } from "../src/Vector.js";
import { Cuerpo } from "../src/Cuerpo.js";
const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");
CANVAS.width = 650;
CANVAS.height = 650;
CANVAS.style.backgroundColor = Dibujante.colorHSL(220, 70, 100);
let centroCanvas = { x: CANVAS.width / 2, y: CANVAS.height / 2 };
window.addEventListener("load", () => {
    let dibujante = new Dibujante(CONTEXT);
    // dibujante.color = Dibujante.colorHSL(220, 100, 70);  
    dibujante.colorVectores = Dibujante.colorRGBA(200, 50, 50, 1);
    dibujante.grosorTrazo = 3;
    //Crear Cosas
    let numeroCuerpos = 55;
    let poligonoPatron = Forma.poligono(centroCanvas.x, centroCanvas.y * (1 / 2), numeroCuerpos, CANVAS.width * 0.2);
    let circulitoCentro = Cuerpo.circunferencia(centroCanvas.x * (7 / 8), centroCanvas.y * (2 / 2), CANVAS.width * 0.01);
    let circulitoExterno = Cuerpo.circunferencia(centroCanvas.x * (9 / 8), centroCanvas.y * (2 / 2), CANVAS.width * 0.01);
    let circulitos = [];
    for (let vertice of poligonoPatron.vertices) {
        // let circulito: Cuerpo = Cuerpo.poligono(vertice.x, vertice.y, 4, circulitoCentro.radio*0.5);
        let circulito = Cuerpo.circunferencia(vertice.x, vertice.y, circulitoCentro.radio * 0.5);
        let velocidad = Vector.rotar(Vector.segunPuntos(circulito.centro, poligonoPatron.centro), -Matematica.PI * 0.5);
        velocidad = Vector.normalizar(velocidad);
        velocidad = Vector.escalar(velocidad, 0.1);
        circulito.velocidad = velocidad;
        circulitos.push(circulito);
    }
    function prueba() {
        CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
        dibujante.color = Dibujante.colorHSL(300, 100, 20);
        circulitoCentro.rellenar(dibujante);
        circulitoExterno.rellenar(dibujante);
        dibujante.color = Dibujante.colorHSL(340, 100, 50);
        for (let circulito of circulitos) {
            let vectorAtractor = Vector.segunPuntos(circulito.centro, circulitoCentro.centro);
            vectorAtractor = Vector.normalizar(vectorAtractor);
            let vectorAtractorExterno = Vector.segunPuntos(circulito.centro, circulitoExterno.centro);
            vectorAtractorExterno = Vector.normalizar(vectorAtractorExterno);
            circulito.aceleracion = Vector.suma(vectorAtractor, vectorAtractorExterno);
            circulito.aceleracion = Vector.escalar(circulito.aceleracion, 0.05);
            circulito.actualizarMovimiento();
            circulito.trazar(dibujante);
        }
        circulitoCentro.rotarSegunPunto(centroCanvas, Matematica.gradoARadian(0.3));
        circulitoExterno.rotarSegunPunto(centroCanvas, Matematica.gradoARadian(0.3));
        circulitoCentro.actualizarMovimiento();
        circulitoExterno.actualizarMovimiento();
        requestAnimationFrame(prueba);
    }
    prueba();
    // function animar(){
    //     CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    //     poligonoUno.rotarSegunPunto(vectorPrueba, Matematica.gradoARadian(0.6));
    //     poligonoUno.rotarSegunCentro(Matematica.gradoARadian(-1));
    //     // dibujante.trazar(poligonoUno);
    //     for(let vertice of poligonoUno.vertices){
    //         let linea: Vector = Vector.segunPuntos(centroCanvas, vertice);
    //         // dibujante.opacidad = 1-Matematica.raiz(vertice.x/CANVAS.width, 3);
    //         dibujante.grosorTrazo = 1;
    //         linea.origen = centroCanvas
    //         dibujante.trazarVector(linea)
    //     }
    //     for(let vertice of poligonoUno.vertices){
    //         // dibujante.opacidad = 1-Matematica.raiz(vertice.x/CANVAS.width, 3);
    //         let circulo: Forma = Forma.circunferencia(vertice.x, vertice.y, 5);
    //         dibujante.trazar(circulo);
    //     }
    //     poligonoDos.rotarSegunPunto(vectorPrueba, Matematica.gradoARadian(0.4));
    //     poligonoDos.rotarSegunCentro(Matematica.gradoARadian(-1));
    //     // dibujante.trazar(poligonoDos);
    //     for(let vertice of poligonoDos.vertices){
    //         let linea: Vector = Vector.segunPuntos(centroCanvas, vertice);
    //         // dibujante.opacidad = 1-Matematica.raiz(vertice.x/CANVAS.width, 3);
    //         dibujante.grosorTrazo = 1;
    //         linea.origen = centroCanvas
    //         dibujante.trazarVector(linea)
    //     }
    //     for(let vertice of poligonoDos.vertices){
    //         // dibujante.opacidad = 1-Matematica.raiz(vertice.x/CANVAS.width, 3);
    //         let circulo: Forma = Forma.circunferencia(vertice.x, vertice.y, 5);
    //         dibujante.trazar(circulo);
    //     }
    //     requestAnimationFrame(animar);
    // }
    // animar();
});
