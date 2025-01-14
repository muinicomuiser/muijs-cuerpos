"use strict";
// import { Geometria, Punto, Forma, Vector, Renderizado, Cuerpo, Fuerza, Restriccion, Entorno, Matematica, ManejadorEventos, Composicion, Dibujante, Interaccion } from "../Fuente/mui.js";
// //Archivo estandar para iniciar pruebas del módulo
// //CONSTANTES
// const COLORFONDO: string = Renderizado.colorHSL(220, 0, 0);
// const DIBU: Renderizado = Renderizado.crearPorIdCanvas('canvas')
// DIBU.anchoCanvas = 660;
// DIBU.altoCanvas = 660;
// DIBU.colorFondo = COLORFONDO;
// window.addEventListener("load", () => {
//     //Colores
//     const COLORPROTAGONISTA: string = Renderizado.colorHSL(200, 0, 80);
//     const COLORSECUNDARIOS: string = Renderizado.colorHSL(250, 0, 80);
//     //Figuras
//     const RADIOBOLITOS: number = 8;
//     //Cuerpos
//     let cuerpoProtagonista: Cuerpo = Cuerpo.rectangulo(DIBU.centroCanvas.x, DIBU.centroCanvas.y, 30, 30, { colorRelleno: COLORPROTAGONISTA, colorTrazo: COLORPROTAGONISTA, rellenada: true, trazada: true })
//     let puntaProtagonista: Cuerpo = Cuerpo.poligono(50, 50, 3, 30, { colorRelleno: COLORPROTAGONISTA, colorTrazo: COLORPROTAGONISTA, rellenada: true, trazada: true })
//     function crearSecundarios(numeroCuerpos: number, radioEsparcimiento: number): Cuerpo[] {
//         let formaGeneradora: Forma = Forma.poligono(DIBU.centroCanvas.x, DIBU.centroCanvas.y, numeroCuerpos, radioEsparcimiento)
//         let cuerpos: Cuerpo[] = []
//         for (let i: number = 0; i < formaGeneradora.lados; i++) {
//             cuerpos.push(Cuerpo.circunferencia(formaGeneradora.verticesTransformados[i].x, formaGeneradora.verticesTransformados[i].y, RADIOBOLITOS, { grosorTrazo: 2, colorTrazo: COLORSECUNDARIOS, trazada: true, rellenada: false }))
//         }
//         return cuerpos;
//     }
//     let cuerpos: Cuerpo[] = []
//     let cuerposSecundarios: Cuerpo[] = crearSecundarios(50, 200);
//     let cuerposSecundariosUno: Cuerpo[] = crearSecundarios(50, 250);
//     let cuerposSecundariosDos: Cuerpo[] = crearSecundarios(50, 350);
//     let cuerposSecundariosDosDos: Cuerpo[] = crearSecundarios(50, 300);
//     let cuerposSecundariosTres: Cuerpo[] = crearSecundarios(50, 100);
//     let cuerposSecundariosTresTres: Cuerpo[] = crearSecundarios(50, 150);
//     cuerpos.push(...cuerposSecundariosDos, ...cuerposSecundariosTres, ...cuerposSecundarios, ...cuerposSecundariosUno, ...cuerposSecundariosDosDos, ...cuerposSecundariosTresTres)
//     cuerpoProtagonista.controles.rapidez = 10
//     let entorno: Entorno = Entorno.crearEntornoCanvas(DIBU.canvas)
//     entorno.cuerpo.colorTrazo = COLORPROTAGONISTA;
//     entorno.cuerpo.trazada = true
//     entorno.cuerpo.rellenada = false
//     //Control
//     ManejadorEventos.eventoKeydown('ArrowUp', () => cuerpoProtagonista.controles.arriba = true)
//     ManejadorEventos.eventoKeydown('ArrowDown', () => cuerpoProtagonista.controles.abajo = true)
//     ManejadorEventos.eventoKeydown('ArrowLeft', () => cuerpoProtagonista.controles.rotarIzquierda = true)
//     ManejadorEventos.eventoKeydown('ArrowRight', () => cuerpoProtagonista.controles.rotarDerecha = true)
//     ManejadorEventos.eventoKeyup('ArrowUp', () => cuerpoProtagonista.controles.arriba = false)
//     ManejadorEventos.eventoKeyup('ArrowDown', () => cuerpoProtagonista.controles.abajo = false)
//     ManejadorEventos.eventoKeyup('ArrowLeft', () => cuerpoProtagonista.controles.rotarIzquierda = false)
//     ManejadorEventos.eventoKeyup('ArrowRight', () => cuerpoProtagonista.controles.rotarDerecha = false)
//     // function animar() {
//     //     DIBU.limpiarCanvas()
//     //     Composicion.actualizarMovimientoCuerpos(...cuerpos);
//     //     cuerpoProtagonista.controlar()
//     //     Interaccion.reboteEntreCuerpos([cuerpoProtagonista, ...cuerpos])
//     //     Interaccion.reboteEntreCuerpos([puntaProtagonista, ...cuerpos])
//     //     entorno.rebotarConBorde([cuerpoProtagonista, ...cuerpos, puntaProtagonista])
//     //     puntaProtagonista.rotacion = cuerpoProtagonista.rotacion + Geometria.PI_MEDIO / 3
//     //     puntaProtagonista.posicion = Vector.suma(cuerpoProtagonista.posicion, Vector.escalar(Vector.normalizar(cuerpoProtagonista.normales[0]), cuerpoProtagonista.apotema))
//     //     DIBU.renderizarFormas([...cuerpos, cuerpoProtagonista, entorno.cuerpo, puntaProtagonista])
//     //     requestAnimationFrame(animar);
//     // }
//     // requestAnimationFrame(animar)
// })
