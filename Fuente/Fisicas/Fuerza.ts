//Módulo de cálculos físicos

import { Vector } from "../geometria-plana/vector";
import { Cuerpo } from "./cuerpo";

//Considerar: fricción, gravedad, resortes, torques.
export class Fuerza {

    /**Retorna un vector correspondiente a la aceleración de un cuerpo atraído hacia un cuerpo atractor.        
     * TODAVÍA NO HE INCORPORADO LA MASA NI LA DISTANCIA.
    */
    static atraer(cuerpo: Cuerpo, atractor: Cuerpo, magnitudAtraccion: number): Vector {
        let vectorAtractor: Vector = Vector.segunPuntos(cuerpo.posicion, atractor.posicion);
        vectorAtractor = vectorAtractor.normalizar();
        vectorAtractor = vectorAtractor.escalar(magnitudAtraccion);
        return vectorAtractor;
    }
    /**Retorna un vector correspondiente a la aceleración de un cuerpo atraído hacia un vector atractor.        
     * TODAVÍA NO HE INCORPORADO LA MASA NI LA DISTANCIA.
    */
    static atraerAVector(cuerpo: Cuerpo, atractor: Vector, magnitudAtraccion: number): Vector {
        let vectorAtractor: Vector = Vector.segunPuntos(cuerpo.posicion, atractor);
        vectorAtractor = vectorAtractor.normalizar();
        vectorAtractor = vectorAtractor.escalar(magnitudAtraccion);
        return vectorAtractor;
    }

    /**Retorna un vector correspondiente a la aceleración de un cuerpo repelido por un cuerpo repulsor.        
    * TODAVÍA NO HE INCORPORADO LA MASA NI LA DISTANCIA.
    */
    static repeler(cuerpo: Cuerpo, repulsor: Cuerpo, magnitudRepulsion: number): Vector {
        let vectorAtractor: Vector = Vector.segunPuntos(repulsor.posicion, cuerpo.posicion);
        vectorAtractor = vectorAtractor.normalizar();
        vectorAtractor = vectorAtractor.escalar(magnitudRepulsion);
        return vectorAtractor;
    }

    /**Retorna un vector correspondiente a la aceleración de un cuerpo repelido por un vector repulsor.        
    * TODAVÍA NO HE INCORPORADO LA MASA NI LA DISTANCIA.
   */
    static repelerDeVector(cuerpo: Cuerpo, repulsor: Vector, magnitudRepulsion: number): Vector {
        let vectorRepulsor: Vector = Vector.segunPuntos(repulsor, cuerpo.posicion);
        vectorRepulsor = vectorRepulsor.normalizar();
        vectorRepulsor = vectorRepulsor.escalar(magnitudRepulsion);
        return vectorRepulsor;
    }
}