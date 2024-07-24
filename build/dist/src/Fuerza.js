import { Matematica } from "./Matematica.js";
import { Vector } from "./Vector.js";
//Módulo de cálculos
//Considerar: fricción, gravedad, momento, resortes, movimiento angular, torques.
export class Fuerza {
    static rebote(cuerpo, normal) {
        let anguloNormal = Vector.angulo(normal);
        let anguloTangente = anguloNormal - (Matematica.PI / 2);
        let x = cuerpo.velocidad.x * (Math.cos(2 * anguloTangente) + Math.sin(2 * anguloTangente));
        let y = -cuerpo.velocidad.y * (Math.cos(2 * anguloTangente) - Math.sin(2 * anguloTangente));
        return (Vector.crear(x, y));
    }
}
