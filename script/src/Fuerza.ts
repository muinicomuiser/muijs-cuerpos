import { Matematica } from "./Matematica.js";
import { Cuerpo } from "./Cuerpo.js";
import { Vector } from "./Vector.js";
//Módulo de cálculos
export class Fuerza{
    static rebote(cuerpo: Cuerpo, normal: Vector): Vector{
        let anguloNormal: number = Vector.angulo(normal);
        let anguloTangente: number = anguloNormal - (Matematica.PI/2);
        let x: number = cuerpo.velocidad.x * (Math.cos(2*anguloTangente) + Math.sin(2*anguloTangente));
        let y: number = - cuerpo.velocidad.y * (Math.cos(2*anguloTangente) - Math.sin(2*anguloTangente));    
        return (Vector.crear(x, y))
    }
}