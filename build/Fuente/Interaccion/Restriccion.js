export class Restriccion {
    /**Limita la magnitud de la velocidad de un cuerpo.
     * Retorna una copia del vector velocidad si se ha modificado su magnitud.
    */
    static limitarVelocidad(cuerpo, limite) {
        let magnitudVel = cuerpo.velocidad.magnitud;
        if (magnitudVel > limite) {
            let velNormalizado = cuerpo.velocidad.normalizar();
            return velNormalizado.escalar(limite);
        }
        return cuerpo.velocidad;
    }
    /**Retorna un vector de aceleracion escalado de tal manera que al sumarlo a la velocidad del cuerpo, la magnitud
     * de la velocidad no supere el límite ingresado.*/
    static limitarAceleracionSegunVelocidad(cuerpo, limiteVelocidad) {
        let magnitudVelocidad = cuerpo.velocidad.magnitud;
        let magnitudAceleracion = cuerpo.aceleracion.magnitud;
        if (magnitudAceleracion != 0 && magnitudVelocidad != 0) {
            if (magnitudVelocidad + magnitudAceleracion > limiteVelocidad) {
                let razonAceleracion = magnitudAceleracion / (magnitudAceleracion + magnitudVelocidad);
                let aceleracionNormalizada = cuerpo.aceleracion.normalizar();
                let aceleracionEscalada = aceleracionNormalizada.escalar(razonAceleracion * limiteVelocidad);
                return aceleracionEscalada;
            }
        }
        return cuerpo.aceleracion;
    }
}
