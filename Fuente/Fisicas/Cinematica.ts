import { Cuerpo } from "./Cuerpo";
import { Vector } from "../GeometriaPlana/Vector";
import { Geometria } from "../Utiles/Geometria";

//Momento lineal, movimiento acelerado, momento angular, energía cinética y potencial.

export class Cinematica {

    /**Retorna un vector velocidad de un cuerpo que colisiona con una superficie.*/
    static reboteSimple(cuerpo: Cuerpo, normal: Vector): Vector {
        let vectorRebotado: Vector = cuerpo.velocidad;
        if (vectorRebotado.anguloVectores(normal) > Geometria.PI_MEDIO) {
            vectorRebotado = vectorRebotado.invertir();
        }
        return vectorRebotado.rotar((normal.angulo - vectorRebotado.angulo) * 2)
    }


    /**Retorna en un arreglo las velocidades finales después de un choque elástico entre dos cuerpos.*/
    static reboteElastico(cuerpoUno: Cuerpo, cuerpoDos: Cuerpo): Vector[] {
        return [Cinematica.velocidadUnoFinal(cuerpoUno, cuerpoDos), Cinematica.velocidadDosFinal(cuerpoUno, cuerpoDos)]
    }

    private static velocidadUnoFinal(cuerpoUno: Cuerpo, cuerpoDos: Cuerpo): Vector {
        const velUnoInicial: Vector = cuerpoUno.velocidad;
        const divisionMasas: number = (2 * cuerpoDos.masa) / (cuerpoUno.masa + cuerpoDos.masa);
        const restaVelocidades: Vector = cuerpoDos.velocidad.restar(cuerpoUno.velocidad);
        const restaPosiciones: Vector = cuerpoDos.posicion.restar(cuerpoUno.posicion);
        const puntoVelocidadesPosiciones: number = restaVelocidades.punto(restaPosiciones);
        const moduloPosicionesCuadrado: number = restaPosiciones.magnitud ** 2;
        const velUnoFinal: Vector = velUnoInicial.sumar(restaPosiciones.escalar(divisionMasas * puntoVelocidadesPosiciones / moduloPosicionesCuadrado));
        return velUnoFinal;
    }

    private static velocidadDosFinal(cuerpoUno: Cuerpo, cuerpoDos: Cuerpo): Vector {
        const velDosInicial: Vector = cuerpoDos.velocidad;
        const divisionMasas: number = (2 * cuerpoUno.masa) / (cuerpoUno.masa + cuerpoDos.masa);
        const restaVelocidades: Vector = cuerpoUno.velocidad.restar(cuerpoDos.velocidad);
        const restaPosiciones: Vector = cuerpoUno.posicion.restar(cuerpoDos.posicion);
        const puntoVelocidadesPosiciones: number = restaVelocidades.punto(restaPosiciones);
        const moduloPosicionesCuadrado: number = restaPosiciones.magnitud ** 2;
        const velDosFinal: Vector = velDosInicial.sumar(restaPosiciones.escalar(divisionMasas * puntoVelocidadesPosiciones / moduloPosicionesCuadrado));
        return velDosFinal;
    }
}