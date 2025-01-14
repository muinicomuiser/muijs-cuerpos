"use strict";
// import { Cuerpo } from "../Fisicas/Cuerpo.js"
// import { Dibujante } from "../mui.js";
// import { OpcionesGraficasForma } from "../Renderizado/OpcionesGraficasForma.js";
// import { QuadTree } from "./QuadTree.js"
// export class QuadTreeCuerpos extends QuadTree {
//     subDivisionesQuadCuerpo: QuadTreeCuerpos[] = [];
//     cuerpos: Cuerpo[] = []
//     cuerposRepetidos: Cuerpo[] = []
//     constructor(x: number, y: number, ancho: number, alto: number, capacidad: number = 4) {
//         super(x, y, ancho, alto, capacidad)
//     }
//     /**Agrega un punto a un QuadTree. Si al agregar el punto se sobrepasa la capacidad del QuadTree, se subdivide en cuatro QuadTrees nuevos. */
//     insertarCuerpo(cuerpo: Cuerpo): boolean {
//         if (this.comprobarInsercionCuerpo(cuerpo)) {
//             if (this.buscarCuerpoRepetido(cuerpo)) {
//                 this.cuerposRepetidos.push(cuerpo)
//             }
//             else if (this.cuerpos.length < this.capacidad) {
//                 this.cuerpos.push(cuerpo)
//             }
//             else {
//                 if (!this.subDividido) {
//                     let quadSurEste: QuadTreeCuerpos = new QuadTreeCuerpos(this.x + this.ancho / 2, this.y + this.alto / 2, this.ancho / 2, this.alto / 2, this.capacidad)
//                     let quadSurOeste: QuadTreeCuerpos = new QuadTreeCuerpos(this.x, this.y + this.alto / 2, this.ancho / 2, this.alto / 2, this.capacidad)
//                     let quadNorOeste: QuadTreeCuerpos = new QuadTreeCuerpos(this.x, this.y, this.ancho / 2, this.alto / 2, this.capacidad)
//                     let quadNorEste: QuadTreeCuerpos = new QuadTreeCuerpos(this.x + this.ancho / 2, this.y, this.ancho / 2, this.alto / 2, this.capacidad)
//                     this.subDivisionesQuadCuerpo.push(quadSurEste, quadSurOeste, quadNorOeste, quadNorEste)
//                     // this.cuerpos.forEach(cuerpoGuardado => {
//                     //     quadSurEste.insertarCuerpo(cuerpoGuardado);
//                     //     quadSurOeste.insertarCuerpo(cuerpoGuardado);
//                     //     quadNorOeste.insertarCuerpo(cuerpoGuardado);
//                     //     quadNorEste.insertarCuerpo(cuerpoGuardado);
//                     // })
//                     this.subDividido = true;
//                 }
//                 if (this.subDivisionesQuadCuerpo[0].insertarCuerpo(cuerpo)) { return true }
//                 else if (this.subDivisionesQuadCuerpo[1].insertarCuerpo(cuerpo)) { return true }
//                 else if (this.subDivisionesQuadCuerpo[2].insertarCuerpo(cuerpo)) { return true }
//                 else if (this.subDivisionesQuadCuerpo[3].insertarCuerpo(cuerpo)) { return true }
//             }
//             return true;
//         }
//         return false;
//     }
//     cuerposEnRango(limiteIzquierda: number, limiteDerecha: number, limiteSuperior: number, limiteInferior: number): Cuerpo[] {
//         let CuerposDentroDelRango: Cuerpo[] = [];
//         this.cuerpos.forEach(cuerpo => {
//             if (cuerpo.posicion.x >= limiteIzquierda && cuerpo.posicion.x <= limiteDerecha && cuerpo.posicion.y >= limiteSuperior && cuerpo.posicion.y <= limiteInferior) {
//                 CuerposDentroDelRango.push(cuerpo)
//             }
//         })
//         this.cuerposRepetidos.forEach(cuerpo => {
//             if (cuerpo.posicion.x >= limiteIzquierda && cuerpo.posicion.x <= limiteDerecha && cuerpo.posicion.y >= limiteSuperior && cuerpo.posicion.y <= limiteInferior) {
//                 CuerposDentroDelRango.push(cuerpo)
//             }
//         })
//         if (this.subDivisionesQuadCuerpo.length > 0) {
//             this.subDivisionesQuadCuerpo.forEach(subdivision => {
//                 if ((subdivision.x <= limiteDerecha || subdivision.x + subdivision.ancho >= limiteIzquierda) && (subdivision.y <= limiteInferior || subdivision.y + subdivision.alto >= limiteSuperior))
//                     CuerposDentroDelRango.push(...subdivision.cuerposEnRango(limiteIzquierda, limiteDerecha, limiteSuperior, limiteInferior))
//             })
//         }
//         return CuerposDentroDelRango;
//     }
//     buscarCuerpoRepetido(cuerpo: Cuerpo): boolean {
//         let coincidencia: boolean = false;
//         this.cuerpos.forEach((cuerpoGuardado) => {
//             if (cuerpo.posicion.x == cuerpoGuardado.posicion.x && cuerpo.posicion.y == cuerpoGuardado.posicion.y) {
//                 coincidencia = true
//             }
//         })
//         return coincidencia
//     }
//     comprobarInsercionCuerpo(cuerpo: Cuerpo): boolean {
//         if (cuerpo.posicion.x >= this.x && cuerpo.posicion.x <= this.x + this.ancho && cuerpo.posicion.y >= this.y && cuerpo.posicion.y <= this.y + this.alto) {
//             return true;
//         }
//         return false;
//     }
//     trazarQuadCuerpo(dibujante: Dibujante, opciones?: OpcionesGraficasForma) {
//         if (opciones) {
//             this.contorno.estiloGrafico = opciones;
//         }
//         this.contorno.trazar(dibujante)
//         if (this.subDivisionesQuadCuerpo.length > 0) {
//             this.subDivisionesQuadCuerpo.forEach(sub => sub.trazarQuadCuerpo(dibujante, opciones))
//         }
//     }
// }
