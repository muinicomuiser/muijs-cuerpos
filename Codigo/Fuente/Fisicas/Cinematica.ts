import { Cuerpo } from "./Cuerpo.js";
import { Matematica } from "../Utiles/Matematica.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Punto } from "../GeometriaPlana/Punto.js";

//Momento lineal, movimiento acelerado, momento angular, energía cinética y potencial.

export class Cinematica{
    /**Retorna un vector velocidad de un cuerpo que colisiona con una superficie.*/
    static reboteSimple(cuerpo: Cuerpo, normal: Vector): Vector{
        let anguloNormal: number = Vector.angulo(normal);
        let vectorRebotado: Vector = Vector.invertir(cuerpo.velocidad);
        vectorRebotado = Vector.rotar(vectorRebotado, (anguloNormal - Vector.angulo(vectorRebotado))*2)
        // let anguloTangente: number = anguloNormal - (Matematica.PI/2);
        // let x: number = cuerpo.velocidad.x * (Math.cos(2*anguloTangente) + Math.sin(2*anguloTangente));
        // let y: number = - cuerpo.velocidad.y * (Math.cos(2*anguloTangente) - Math.sin(2*anguloTangente));    
        // return (Vector.crear(x, y))
        return vectorRebotado;
    }
}