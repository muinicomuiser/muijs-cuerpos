// import { Contenedor } from "../Fuente/Fisicas/Contenedor.js";
// import { Punto, Forma, Vector, Renderizado, Cuerpo, Fuerza, Geometria, Entorno, Composicion, Interaccion } from "../Fuente/mui.js";

// /**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/
// const Compo: Composicion = new Composicion('canvas')
// const COLORFONDO: string = Renderizado.colorHSL(220, 100, 0);
// let anchoCanvas = window.innerWidth - 20 > 360 ? window.innerWidth - 20 : 360;
// let altoCanvas = window.innerHeight - 20;
// Compo.tamanoCanvas(anchoCanvas, altoCanvas)
// Compo.render.colorFondo = COLORFONDO;


// //CONSTANTES
// const BORDEMENOR = anchoCanvas < altoCanvas ? anchoCanvas : altoCanvas

// const LADOSENTORNO: number = 10;
// let RADIOENTORNO: number = 200 < (BORDEMENOR) / 4 ? 200 : (BORDEMENOR) / 4;
// RADIOENTORNO = 180 > RADIOENTORNO ? 180 : RADIOENTORNO;

// const RADIOFORMAGENERADORA: number = RADIOENTORNO / 2;

// const NUMEROCUERPOS: number = 15;
// const RADIOCUERPO: number = 14;

// let COLORCUERPO: string = Renderizado.colorHSL(220, 0, 100);

// ////////////////

// window.addEventListener("load", () => {

//     let cuerpoEntorno: Cuerpo = Cuerpo.poligono(Compo.render.centroCanvas.x, Compo.render.centroCanvas.y, LADOSENTORNO, RADIOENTORNO);
//     let entorno: Contenedor = new Contenedor(cuerpoEntorno);
//     Compo.render.grosorTrazo = 3;
//     /**Forma generadora de posiciones.*/
//     let formaGeneradora: Forma = Forma.poligono(Compo.render.centroCanvas.x, Compo.render.centroCanvas.y, NUMEROCUERPOS, RADIOFORMAGENERADORA);

//     /**Cuerpos.*/
//     let cuerpos: Cuerpo[] = [];
//     for (let i: number = 0; i < NUMEROCUERPOS; i++) {
//         let cuerpito: Cuerpo = Cuerpo.circunferencia(formaGeneradora.verticesTransformados[i].x, formaGeneradora.verticesTransformados[i].y, RADIOCUERPO);
//         cuerpito.colorTrazo = COLORCUERPO;
//         // cuerpito.velocidad = Vector.crear(Matematica.aleatorio(-1, 1), Matematica.aleatorio(-1, 1));
//         cuerpos.push(cuerpito);
//     }
//     let circulo: Cuerpo = Cuerpo.circunferencia(Compo.render.centroCanvas.x, Compo.render.centroCanvas.y * (1 / 1.2), RADIOENTORNO / 4)
//     let circuloDos: Cuerpo = Cuerpo.circunferencia(Compo.render.centroCanvas.x, Compo.render.centroCanvas.y * 1.2, RADIOENTORNO / 4)
//     circulo.fijo = true;
//     circulo.rotacion = Geometria.PI_MEDIO;
//     circuloDos.fijo = true;
//     circuloDos.rotacion = Geometria.PI_MEDIO;

//     let cuerpoAtractor: Cuerpo = Cuerpo.circunferencia(Compo.render.centroCanvas.x, Compo.render.centroCanvas.y + RADIOENTORNO + 20, 8);
//     circulo.colorTrazo = "skyblue"
//     circuloDos.colorTrazo = "skyblue"
//     cuerpoAtractor.colorTrazo = "white"
//     entorno.cuerpo.colorTrazo = "skyblue"
//     Compo.agregarCuerpos(...cuerpos, circulo, circuloDos, cuerpoAtractor)

//     requestAnimationFrame(animar);
//     function animar() {
//         animacion()
//         function animacion(): void {
//             Compo.render.limpiarCanvas()
//             entorno.cuerpo.rotar(0.005)
//             for (let cuerpito of cuerpos) {
//                 cuerpito.aceleracion = Fuerza.atraer(cuerpito, cuerpoAtractor, 0.002)
//                 // cuerpito.aceleracion = Fuerza.repelerDeVector(cuerpito, Vector.crear(CENTROCANVAS.x, CENTROCANVAS.y), 0.02);
//                 cuerpito.velocidad = Vector.escalar(cuerpito.velocidad, 0.99)
//                 if (cuerpito.velocidad.magnitud < 0.00005) {
//                     cuerpito.velocidad = Vector.cero()
//                 }
//             }

//             cuerpoAtractor.rotarSegunPunto(Compo.render.centroCanvas, Geometria.gradoARadian(-0.5))

//             // circulo.rotar(Geometria.gradoARadian(-0.4))
//             for (let i: number = 0; i < 3; i++) {
//                 cuerpos = entorno.rebotarConBorde(cuerpos)
//             }
//             Compo.actualizarMovimientoCuerpos()
//             Compo.renderizarCuerpos()
//             circulo.rotarSegunPunto(Compo.render.centroCanvas, -0.01)
//             circuloDos.rotarSegunPunto(Compo.render.centroCanvas, -0.01)
//             // entorno.cuerpo.rotar(Geometria.gradoARadian(-0.4));


//             Compo.render.trazar(entorno.cuerpo)
//             // dibu.trazarNormales(entorno.cuerpo);
//             // dibu.escribir((`${tiempoFinal - tiempoInicio}` + " milisegundos"), 20, 20, 12, 2, "left")
//         }
//         requestAnimationFrame(animar);
//     }
//     animar()
// })


