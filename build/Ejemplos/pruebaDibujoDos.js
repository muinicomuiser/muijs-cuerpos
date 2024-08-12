"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_js_1 = require("../Fuente/GeometriaPlana/Vector.js");
const Dibujante_js_1 = require("../Fuente/Renderizado/Dibujante.js");
const Cuerpo_js_1 = require("../Fuente/Fisicas/Cuerpo.js");
const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");
CANVAS.width = 650;
CANVAS.height = 650;
CANVAS.style.backgroundColor = Dibujante_js_1.Dibujante.colorHSL(220, 70, 0);
let centroCanvas = { x: CANVAS.width / 2, y: CANVAS.height / 2 };
window.addEventListener("load", () => {
    let verticesPrueba = [Vector_js_1.Vector.crear(0, 30), Vector_js_1.Vector.crear(-20, -30), Vector_js_1.Vector.crear(0, -20), Vector_js_1.Vector.crear(20, -30)];
    let triangulo = Cuerpo_js_1.Cuerpo.poligono(centroCanvas.x * 0.3, centroCanvas.y * 0.3, 3, 30);
    triangulo.vertices = verticesPrueba;
    let dibujante = new Dibujante_js_1.Dibujante(CONTEXT);
    dibujante.color = Dibujante_js_1.Dibujante.colorHSL(220, 70, 100);
    dibujante.colorVectores = Dibujante_js_1.Dibujante.colorHSL(0, 70, 50);
    dibujante.grosorTrazo = 2;
    triangulo.rotarSegunVelocidad = true;
    triangulo.velocidad = new Vector_js_1.Vector(2, -2);
    triangulo.escala = 0.7;
    let atractor = new Vector_js_1.Vector(centroCanvas.x, centroCanvas.y);
    // triangulo.rotacion = 1;
    triangulo.actualizarTransformacion();
    console.log(triangulo);
    // triangulo.trazar(dibujante);
    // triangulo.trazarVelocidad(dibujante);
    function animar() {
        let aceleracion = Vector_js_1.Vector.segunPuntos(triangulo.posicion, atractor);
        aceleracion = Vector_js_1.Vector.normalizar(aceleracion);
        aceleracion = Vector_js_1.Vector.escalar(aceleracion, 0.5);
        triangulo.aceleracion = aceleracion;
        dibujante.limpiarCanvas(CANVAS);
        // triangulo.rotar(Matematica.gradoARadian(2));
        ///
        CONTEXT.beginPath();
        CONTEXT.fillStyle = "white";
        // CONTEXT.fillText(`${(triangulo.posicion.y)}`, 30, 30, 80)
        CONTEXT.fillText(`${Vector_js_1.Vector.angulo(triangulo.velocidad) - Vector_js_1.Vector.angulo(triangulo.vertices[0])}`, 30, 30, 80);
        ///
        // triangulo.rotar(Matematica.gradoARadian(2))
        triangulo.mover();
        triangulo.trazar(dibujante);
        triangulo.trazarVelocidad(dibujante);
        requestAnimationFrame(animar);
    }
    animar();
});
