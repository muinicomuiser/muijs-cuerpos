import { Matematica, Punto, Vector, Renderizado, Cuerpo } from "../Fuente/mui.js";

let render: Renderizado = Renderizado.crearPorIdCanvas("canvas");
render.anchoCanvas = 650;
render.altoCanvas = 650;
render.colorFondo = Renderizado.colorHSL(220, 70, 0);
let centroCanvas: Punto = { x: render.anchoCanvas / 2, y: render.altoCanvas / 2 };
window.addEventListener("load", () => {
    let verticesPrueba = [Vector.crear(0, 30), Vector.crear(-20, -30), Vector.crear(0, -20), Vector.crear(20, -30)]
    let triangulo: Cuerpo = Cuerpo.poligono(centroCanvas.x * 0.3, centroCanvas.y * 0.3, 3, 30);
    triangulo.vertices = verticesPrueba;
    render.colorTrazo = Renderizado.colorHSL(220, 70, 100);
    render.colorVectores = Renderizado.colorHSL(0, 70, 50);
    render.grosorTrazo = 2;
    triangulo.rotarSegunVelocidad = true;
    triangulo.velocidad = Vector.crear(2, -2)
    triangulo.escala = 0.7;
    let atractor = Vector.crear(centroCanvas.x, centroCanvas.y)
    // triangulo.rotacion = 1;
    console.log(triangulo);
    // triangulo.trazar(Renderizado);
    render.opcionesTexto = { tamano: 20, color: "blue", fuente: 'arial' }
    console.log(render)
    // triangulo.trazarVelocidad(Renderizado);
    function animar() {
        let aceleracion: Vector = Vector.segunPuntos(triangulo.posicion, atractor);
        aceleracion = Vector.normalizar(aceleracion);
        aceleracion = Vector.escalar(aceleracion, 0.5)
        triangulo.aceleracion = aceleracion;
        render.limpiarCanvas();
        // triangulo.rotar(Matematica.gradoARadian(2));

        ///
        render.escribir(`${Vector.angulo(triangulo.velocidad) - Vector.angulo(triangulo.vertices[0])}`, 30, 30)
        // render.context.beginPath()
        // render.context.fillStyle = "white";
        // CONTEXT.fillText(`${(triangulo.posicion.y)}`, 30, 30, 80)
        // render.context.fillText(`${Vector.angulo(triangulo.velocidad) - Vector.angulo(triangulo.vertices[0])}`, 30, 30, 80)
        ///

        // triangulo.rotar(Matematica.gradoARadian(2))
        triangulo.mover();
        triangulo.trazar(render);
        triangulo.trazarVelocidad(render);
        requestAnimationFrame(animar);
    }
    animar()
})