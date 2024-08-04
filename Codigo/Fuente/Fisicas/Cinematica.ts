import { Cuerpo } from "./Cuerpo.js";
import { Matematica } from "../Utiles/Matematica.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Punto } from "../GeometriaPlana/Punto.js";

//Momento lineal, movimiento acelerado, momento angular, energía cinética y potencial.

export class Cinematica{
    static rebote(cuerpo: Cuerpo, normal: Vector): Vector{
        let anguloNormal: number = Vector.angulo(normal);
        let anguloTangente: number = anguloNormal - (Matematica.PI/2);
        let x: number = cuerpo.velocidad.x * (Math.cos(2*anguloTangente) + Math.sin(2*anguloTangente));
        let y: number = - cuerpo.velocidad.y * (Math.cos(2*anguloTangente) - Math.sin(2*anguloTangente));    
        return (Vector.crear(x, y))
    }
}