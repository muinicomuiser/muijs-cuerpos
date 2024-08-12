"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cinematica = void 0;
const Matematica_js_1 = require("../Utiles/Matematica.js");
const Vector_js_1 = require("../GeometriaPlana/Vector.js");
//Momento lineal, movimiento acelerado, momento angular, energía cinética y potencial.
class Cinematica {
    static rebote(cuerpo, normal) {
        let anguloNormal = Vector_js_1.Vector.angulo(normal);
        let anguloTangente = anguloNormal - (Matematica_js_1.Matematica.PI / 2);
        let x = cuerpo.velocidad.x * (Math.cos(2 * anguloTangente) + Math.sin(2 * anguloTangente));
        let y = -cuerpo.velocidad.y * (Math.cos(2 * anguloTangente) - Math.sin(2 * anguloTangente));
        return (Vector_js_1.Vector.crear(x, y));
    }
}
exports.Cinematica = Cinematica;
