import { Cuerpo } from "../Fisicas/Cuerpo";
import { Vector } from "../GeometriaPlana/Vector";

export class Restriccion {

    /**Limita la magnitud de la velocidad de un cuerpo.     
     * Retorna una copia del vector velocidad si se ha modificado su magnitud.
    */
    static limitarVelocidad(cuerpo: Cuerpo, limite: number): Vector {
        let magnitudVel: number = cuerpo.velocidad.magnitud;
        if (magnitudVel > limite) {
            let velNormalizado: Vector = cuerpo.velocidad.normalizar()
            return velNormalizado.escalar(limite);
        }
        return cuerpo.velocidad;
    }

    /**Retorna un vector de aceleracion escalado de tal manera que al sumarlo a la velocidad del cuerpo, la magnitud 
     * de la velocidad no supere el límite ingresado.*/
    static limitarAceleracionSegunVelocidad(cuerpo: Cuerpo, limiteVelocidad: number): Vector {
        let magnitudVelocidad: number = cuerpo.velocidad.magnitud;
        let magnitudAceleracion: number = cuerpo.aceleracion.magnitud;
        if (magnitudAceleracion != 0 && magnitudVelocidad != 0) {
            if (magnitudVelocidad + magnitudAceleracion > limiteVelocidad) {
                let razonAceleracion: number = magnitudAceleracion / (magnitudAceleracion + magnitudVelocidad);
                let aceleracionNormalizada: Vector = cuerpo.aceleracion.normalizar()
                let aceleracionEscalada: Vector = aceleracionNormalizada.escalar(razonAceleracion * limiteVelocidad)
                return aceleracionEscalada;
            }
        }
        return cuerpo.aceleracion;
    }
}