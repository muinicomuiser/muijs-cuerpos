"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restriccion = void 0;
const Vector_js_1 = require("./build/Fuente/GeometriaPlana/Vector.js");
class Restriccion {
    static limitarVelocidad(cuerpo, limite) {
        let magnitudVel = cuerpo.velocidad.magnitud;
        if (magnitudVel > limite) {
            let velNormalizado = Vector_js_1.Vector.normalizar(cuerpo.velocidad);
            return Vector_js_1.Vector.escalar(velNormalizado, limite);
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
                let aceleracionNormalizada = Vector_js_1.Vector.normalizar(cuerpo.aceleracion);
                let aceleracionEscalada = Vector_js_1.Vector.escalar(aceleracionNormalizada, razonAceleracion * limite);
                return aceleracionEscalada;
            }
        }
        return cuerpo.aceleracion;
    }
}
exports.Restriccion = Restriccion;
