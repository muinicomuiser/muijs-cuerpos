"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Formas_js_1 = require("../Fuente/GeometriaPlana/Formas.js");
const Dibujante_js_1 = require("../Fuente/Renderizado/Dibujante.js");
const Colision_js_1 = require("../Fuente/Interaccion/Colision.js");
const Geometria_js_1 = require("../Fuente/Utiles/Geometria.js");
/**AQUÍ EMPECÉ A PROBAR EL MÓDULO DE COLISIONES.*/
const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");
CANVAS.width = 650;
CANVAS.height = 650;
CANVAS.style.backgroundColor = Dibujante_js_1.Dibujante.colorHSL(220, 70, 100);
let centroCanvas = { x: CANVAS.width / 2, y: CANVAS.height / 2 };
window.addEventListener("load", () => {
    let poligonoUno = Formas_js_1.Forma.poligono(centroCanvas.x, centroCanvas.y, 3, 150);
    let cuadradoDos = Formas_js_1.Forma.rectangulo(centroCanvas.x + 150, centroCanvas.y + 150, 170, 170);
    let circunferenciaTres = Formas_js_1.Forma.circunferencia(centroCanvas.x - 200, centroCanvas.y - 200, 100);
    let dibu = new Dibujante_js_1.Dibujante(CONTEXT);
    poligonoUno.color = Dibujante_js_1.Dibujante.colorHSL(120, 100, 50);
    cuadradoDos.color = "purple";
    circunferenciaTres.color = "yellow";
    dibu.opacidad = 0.4;
    function animar() {
        dibu.limpiarCanvas(CANVAS);
        poligonoUno.rotar(Geometria_js_1.Geometria.gradoARadian(1));
        cuadradoDos.rotarSegunPunto(centroCanvas, Geometria_js_1.Geometria.gradoARadian(-1));
        if (Colision_js_1.Colision.detectar(poligonoUno, cuadradoDos)) {
            cuadradoDos.color = "red";
        }
        else {
            cuadradoDos.color = "purple";
        }
        if (Colision_js_1.Colision.detectar(circunferenciaTres, cuadradoDos)) {
            circunferenciaTres.color = "red";
        }
        else {
            circunferenciaTres.color = "yellow";
        }
        poligonoUno.rellenar(dibu);
        cuadradoDos.rellenar(dibu);
        circunferenciaTres.rellenar(dibu);
        requestAnimationFrame(animar);
    }
    animar();
});
