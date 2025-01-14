// import { Renderizado, Punto, Vector, Cuerpo, Geometria, Fuerza } from "../Fuente/mui.js";

// let numeroAtractores: number = 1;
// let numeroCuerpos: number = 120;
// let renderizado: Renderizado = Renderizado.crearPorIdCanvas('canvas');
// renderizado.anchoCanvas = 650;
// renderizado.altoCanvas = 650;
// renderizado.colorFondo = Renderizado.colorHSL(220, 70, 0);
// let centroCanvas: Punto = { x: renderizado.anchoCanvas / 2, y: renderizado.altoCanvas / 2 };

// let velocidad: Vector = Vector.crear(1, 1);
// let cuerpoDeCuerpos: Cuerpo = Cuerpo.poligono(centroCanvas.x * 1.1, centroCanvas.y, numeroCuerpos, 20);
// let cuerpoGuia: Cuerpo = Cuerpo.poligono(centroCanvas.x, centroCanvas.y, numeroAtractores, 100);
// let atractores: Cuerpo[] = crearAtractores(cuerpoGuia);
// let cuerpos: Cuerpo[] = crearCuerpos(cuerpoDeCuerpos);
// function crearCuerpos(cuerpo: Cuerpo): Cuerpo[] {
//     let cuerpitos: Cuerpo[] = [];
//     for (let vertice of cuerpo.verticesTransformados) {
//         let cuerpito: Cuerpo = Cuerpo.circunferencia(vertice.x, vertice.y, 10);
//         cuerpito.colorTrazo = Renderizado.colorHSL(150, 100, 40)
//         cuerpitos.push(cuerpito);
//     }
//     return cuerpitos;
// }
// function crearAtractores(cuerpo: Cuerpo): Cuerpo[] {
//     let atractoresEnVertices: Cuerpo[] = [];
//     for (let vertice of cuerpo.verticesTransformados) {
//         let atractor: Cuerpo = Cuerpo.circunferencia(vertice.x, vertice.y, 8);
//         atractor.colorTrazo = Renderizado.colorHSL(300, 100, 40);
//         atractoresEnVertices.push(atractor);
//     }
//     return atractoresEnVertices;
// }
// let escalita: number = 2;
// let escalador: number = 0.01;
// window.addEventListener("load", () => {

//     renderizado.grosorTrazo = 1;
//     function prueba() {
//         renderizado.limpiarCanvas(0.6);
//         // Renderizado.escribir("hola", centroCanvas.x, centroCanvas.y, 50, 300, "serif", "center")
//         if (escalita > 4) {
//             escalador = Math.abs(escalador) * -1;
//         }
//         if (escalita < 2) {
//             escalador = Math.abs(escalador);
//         }
//         escalita += escalador;
//         for (let i in atractores) {
//             atractores[i].rotarSegunPunto({ x: centroCanvas.x, y: centroCanvas.y }, Geometria.gradoARadian(-1));
//             atractores[i].mover();
//             atractores[i].trazar(renderizado);
//         }
//         for (let cuerpito of cuerpos) {
//             cuerpito.aceleracion = Vector.cero();
//             for (let atractor of atractores) {
//                 let vectorAtraccion: Vector = Fuerza.atraer(cuerpito, atractor, 0.2);
//                 cuerpito.aceleracion = Vector.suma(vectorAtraccion, cuerpito.aceleracion);
//             }
//             cuerpito.escala = escalita;
//             cuerpito.mover();
//             cuerpito.trazar(renderizado);
//         }
//         requestAnimationFrame(prueba)
//     }
//     prueba();

// })


