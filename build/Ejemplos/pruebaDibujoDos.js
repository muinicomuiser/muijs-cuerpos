import { Vector } from "../Fuente/GeometriaPlana/Vector.js";
import { Renderizado } from "../Fuente/Renderizado/Renderizado.js";
import { Cuerpo } from "../Fuente/Fisicas/Cuerpo.js";
const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");
CANVAS.width = 650;
CANVAS.height = 650;
CANVAS.style.backgroundColor = Renderizado.colorHSL(220, 70, 0);
let centroCanvas = { x: CANVAS.width / 2, y: CANVAS.height / 2 };
window.addEventListener("load", () => {
    let verticesPrueba = [Vector.crear(0, 30), Vector.crear(-20, -30), Vector.crear(0, -20), Vector.crear(20, -30)];
    let triangulo = Cuerpo.poligono(centroCanvas.x * 0.3, centroCanvas.y * 0.3, 3, 30);
    triangulo.vertices = verticesPrueba;
    let render = new Renderizado(CANVAS);
    render.color = Renderizado.colorHSL(220, 70, 100);
    render.colorVectores = Renderizado.colorHSL(0, 70, 50);
    render.grosorTrazo = 2;
    triangulo.rotarSegunVelocidad = true;
    triangulo.velocidad = Vector.crear(2, -2);
    triangulo.escala = 0.7;
    let atractor = Vector.crear(centroCanvas.x, centroCanvas.y);
    // triangulo.rotacion = 1;
    console.log(triangulo);
    // triangulo.trazar(Renderizado);
    // triangulo.trazarVelocidad(Renderizado);
    function animar() {
        let aceleracion = Vector.segunPuntos(triangulo.posicion, atractor);
        aceleracion = Vector.normalizar(aceleracion);
        aceleracion = Vector.escalar(aceleracion, 0.5);
        triangulo.aceleracion = aceleracion;
        render.limpiarCanvas();
        // triangulo.rotar(Matematica.gradoARadian(2));
        ///
        CONTEXT.beginPath();
        CONTEXT.fillStyle = "white";
        // CONTEXT.fillText(`${(triangulo.posicion.y)}`, 30, 30, 80)
        CONTEXT.fillText(`${Vector.angulo(triangulo.velocidad) - Vector.angulo(triangulo.vertices[0])}`, 30, 30, 80);
        ///
        // triangulo.rotar(Matematica.gradoARadian(2))
        triangulo.mover();
        triangulo.trazar(render);
        triangulo.trazarVelocidad(render);
        requestAnimationFrame(animar);
    }
    animar();
});
