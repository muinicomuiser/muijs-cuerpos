import { Forma, Renderizado, Vector } from "../Fuente/mui.js";
const RENDER = Renderizado.crearPorIdCanvas('canvas');
const circulito = Forma.circunferencia(0, 250, 100);
RENDER.rellenar(circulito);
let tiempo_inicio = Date.now();
let tiempo_actual = Date.now();
// console.log('inicio')
// function contadorMilisegundos(): Promise<number> {
//     const promesa: Promise<number> = new Promise((resolve, reject) => {
//         let tiempo_actual = Date.now();
//         resolve(tiempo_actual);
//     });
//     return promesa;
// }
function contadorLoop(milisegundos) {
    if (tiempo_actual != Date.now()) {
        tiempo_actual = Date.now();
        if (tiempo_actual - tiempo_inicio < milisegundos) {
            contadorLoop(milisegundos);
        }
        else {
            tiempo_inicio = tiempo_actual;
            RENDER.limpiarCanvas();
            circulito.posicion = Vector.suma(circulito.posicion, Vector.derecha());
            console.log(circulito.posicion.x);
            RENDER.rellenar(circulito);
            contadorLoop(milisegundos);
        }
        contadorLoop(milisegundos);
    }
    contadorLoop(milisegundos);
}
contadorLoop(1000);
// function contadorLoop(milisegundos: number) {
//     contadorMilisegundos()
//         .then((tiempoActual) => {
//             if (tiempoActual - tiempo_inicio < milisegundos) {
//                 contadorLoop(milisegundos)
//             }
//             else {
//                 tiempo_inicio = tiempoActual;
//                 // RENDER.limpiarCanvas()
//                 circulito.posicion = Vector.suma(circulito.posicion, Vector.derecha())
//                 console.log(circulito.posicion.x)
//                 // RENDER.rellenar(circulito);
//                 contadorLoop(milisegundos)
//             }
//         })
// }
// contadorLoop(1000)
