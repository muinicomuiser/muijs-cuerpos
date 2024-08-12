import { Vector } from "../GeometriaPlana/Vector.js";
export class Restriccion {
    static limitarVelocidad(cuerpo, limite) {
        let magnitudVel = cuerpo.velocidad.magnitud;
        if (magnitudVel > limite) {
            let velNormalizado = Vector.normalizar(cuerpo.velocidad);
            return Vector.escalar(velNormalizado, limite);
        }
        return cuerpo.velocidad;
    }
    /**Retorna un vector de aceleracion escalado de tal manera que al sumarlo a la velocidad del cuerpo, la magnitud
     * de la velocidad no supere el límite ingresado.*/
    static limitarAceleracionSegunVelocidad(cuerpo, limite) {
        let magnitudVelocidad = cuerpo.velocidad.magnitud;
        let magnitudAceleracion = cuerpo.aceleracion.magnitud;
        if (magnitudAceleracion != 0 && magnitudVelocidad != 0) {
            if (magnitudVelocidad + magnitudAceleracion > limite) {
                let razonAceleracion = magnitudAceleracion / (magnitudAceleracion + magnitudVelocidad);
                let aceleracionNormalizada = Vector.normalizar(cuerpo.aceleracion);
                let aceleracionEscalada = Vector.escalar(aceleracionNormalizada, razonAceleracion * limite);
                return aceleracionEscalada;
            }
        }
        return cuerpo.aceleracion;
    }
}
