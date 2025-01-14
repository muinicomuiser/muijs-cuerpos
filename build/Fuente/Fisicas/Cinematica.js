import { Geometria } from "../Utiles/Geometria.js";
//Momento lineal, movimiento acelerado, momento angular, energía cinética y potencial.
export class Cinematica {
    /**Retorna un vector velocidad de un cuerpo que colisiona con una superficie.*/
    static reboteSimple(cuerpo, normal) {
        let vectorRebotado = cuerpo.velocidad;
        if (vectorRebotado.anguloVectores(normal) > Geometria.PI_MEDIO) {
            vectorRebotado = vectorRebotado.invertir();
        }
        return vectorRebotado.rotar((normal.angulo - vectorRebotado.angulo) * 2);
    }
    /**Retorna en un arreglo las velocidades finales después de un choque elástico entre dos cuerpos.*/
    static reboteElastico(cuerpoUno, cuerpoDos) {
        return [Cinematica.velocidadUnoFinal(cuerpoUno, cuerpoDos), Cinematica.velocidadDosFinal(cuerpoUno, cuerpoDos)];
    }
    static velocidadUnoFinal(cuerpoUno, cuerpoDos) {
        const velUnoInicial = cuerpoUno.velocidad;
        const divisionMasas = (2 * cuerpoDos.masa) / (cuerpoUno.masa + cuerpoDos.masa);
        const restaVelocidades = cuerpoDos.velocidad.restar(cuerpoUno.velocidad);
        const restaPosiciones = cuerpoDos.posicion.restar(cuerpoUno.posicion);
        const puntoVelocidadesPosiciones = restaVelocidades.punto(restaPosiciones);
        const moduloPosicionesCuadrado = Math.pow(restaPosiciones.magnitud, 2);
        const velUnoFinal = velUnoInicial.sumar(restaPosiciones.escalar(divisionMasas * puntoVelocidadesPosiciones / moduloPosicionesCuadrado));
        return velUnoFinal;
    }
    static velocidadDosFinal(cuerpoUno, cuerpoDos) {
        const velDosInicial = cuerpoDos.velocidad;
        const divisionMasas = (2 * cuerpoUno.masa) / (cuerpoUno.masa + cuerpoDos.masa);
        const restaVelocidades = cuerpoUno.velocidad.restar(cuerpoDos.velocidad);
        const restaPosiciones = cuerpoUno.posicion.restar(cuerpoDos.posicion);
        const puntoVelocidadesPosiciones = restaVelocidades.punto(restaPosiciones);
        const moduloPosicionesCuadrado = Math.pow(restaPosiciones.magnitud, 2);
        const velDosFinal = velDosInicial.sumar(restaPosiciones.escalar(divisionMasas * puntoVelocidadesPosiciones / moduloPosicionesCuadrado));
        return velDosFinal;
    }
}
