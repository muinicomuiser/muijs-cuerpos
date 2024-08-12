import { Matematica } from "../Utiles/Matematica.js";
import { Vector } from "../GeometriaPlana/Vector.js";
//Momento lineal, movimiento acelerado, momento angular, energía cinética y potencial.
export class Cinematica {
    static rebote(cuerpo, normal) {
        let anguloNormal = Vector.angulo(normal);
        let anguloTangente = anguloNormal - (Matematica.PI / 2);
        let x = cuerpo.velocidad.x * (Math.cos(2 * anguloTangente) + Math.sin(2 * anguloTangente));
        let y = -cuerpo.velocidad.y * (Math.cos(2 * anguloTangente) - Math.sin(2 * anguloTangente));
        return (Vector.crear(x, y));
    }
}
