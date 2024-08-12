"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fuerza = void 0;
const Vector_js_1 = require("../GeometriaPlana/Vector.js");
//Módulo de cálculos físicos
//Considerar: fricción, gravedad, resortes, torques.
class Fuerza {
    /**Retorna un vector correspondiente a la aceleración de un cuerpo atraído hacia un cuerpo atractor.
     * TODAVÍA NO HE INCORPORADO LA MASA NI LA DISTANCIA.
    */
    static atraer(cuerpo, atractor, magnitudAceleracion) {
        let vectorAtractor = Vector_js_1.Vector.segunPuntos(cuerpo.posicion, atractor.posicion);
        vectorAtractor = Vector_js_1.Vector.normalizar(vectorAtractor);
        vectorAtractor = Vector_js_1.Vector.escalar(vectorAtractor, magnitudAceleracion);
        return vectorAtractor;
    }
    /**Retorna un vector correspondiente a la aceleración de un cuerpo atraído hacia un vector atractor.
     * TODAVÍA NO HE INCORPORADO LA MASA NI LA DISTANCIA.
    */
    static atraerAVector(cuerpo, atractor, magnitudAceleracion) {
        let vectorAtractor = Vector_js_1.Vector.segunPuntos(cuerpo.posicion, atractor);
        vectorAtractor = Vector_js_1.Vector.normalizar(vectorAtractor);
        vectorAtractor = Vector_js_1.Vector.escalar(vectorAtractor, magnitudAceleracion);
        return vectorAtractor;
    }
    /**Retorna un vector correspondiente a la aceleración de un cuerpo repelido por un cuerpo repulsor.
    * TODAVÍA NO HE INCORPORADO LA MASA NI LA DISTANCIA.
    */
    static repeler(cuerpo, repulsor, magnitudAceleracion) {
        let vectorAtractor = Vector_js_1.Vector.segunPuntos(repulsor.posicion, cuerpo.posicion);
        vectorAtractor = Vector_js_1.Vector.normalizar(vectorAtractor);
        vectorAtractor = Vector_js_1.Vector.escalar(vectorAtractor, magnitudAceleracion);
        return vectorAtractor;
    }
    /**Retorna un vector correspondiente a la aceleración de un cuerpo repelido por un vector repulsor.
    * TODAVÍA NO HE INCORPORADO LA MASA NI LA DISTANCIA.
   */
    static repelerDeVector(cuerpo, repulsor, magnitudAceleracion) {
        let vectorRepulsor = Vector_js_1.Vector.segunPuntos(repulsor, cuerpo.posicion);
        vectorRepulsor = Vector_js_1.Vector.normalizar(vectorRepulsor);
        vectorRepulsor = Vector_js_1.Vector.escalar(vectorRepulsor, magnitudAceleracion);
        return vectorRepulsor;
    }
}
exports.Fuerza = Fuerza;
