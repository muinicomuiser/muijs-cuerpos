import { Cuerpo } from "./Cuerpo.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Geometria } from "../Utiles/Geometria.js";

//Momento lineal, movimiento acelerado, momento angular, energía cinética y potencial.

export class Cinematica{

    /**Retorna un vector velocidad de un cuerpo que colisiona con una superficie.*/
    static reboteSimple(cuerpo: Cuerpo, normal: Vector): Vector{
        let vectorRebotado: Vector = cuerpo.velocidad;
        if(Vector.anguloVectores(vectorRebotado, normal) > Geometria.PI_MEDIO){
            vectorRebotado = Vector.invertir(vectorRebotado);
        }
        return Vector.rotar(vectorRebotado, (Vector.angulo(normal) - Vector.angulo(vectorRebotado))*2)
    }
}