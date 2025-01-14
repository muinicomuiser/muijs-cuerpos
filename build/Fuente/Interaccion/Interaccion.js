//Interacciones entre cuerpos.
import { Cinematica } from "../Fisicas/Cinematica.js";
import { Geometria } from "../Utiles/Geometria.js";
import { Colision } from "./Colision.js";
export class Interaccion {
    static get iteraciones() {
        return 1;
    }
    /**Retorna una copia del conjunto de cuerpos con la resolución de rebote para cuerpos que han colisionado.      */
    static reboteEntreCuerpos(cuerpos) {
        for (let iteracion = 0; iteracion < Interaccion.iteraciones; iteracion++) {
            // let cuerposRebotados: Cuerpo[] = [];
            for (let i = 0; i < cuerpos.length - 1; i++) {
                for (let j = i + 1; j < cuerpos.length; j++) {
                    if (Colision.detectar(cuerpos[i], cuerpos[j])) {
                        let normales = Colision.normalesContacto(cuerpos[i], cuerpos[j]);
                        let velocidadesFinales = Cinematica.reboteElastico(cuerpos[i], cuerpos[j]);
                        cuerpos[i].velocidad = velocidadesFinales[0];
                        cuerpos[j].velocidad = velocidadesFinales[1];
                        // cuerpos[i].velocidad = Cinematica.reboteSimple(cuerpos[i], normales[1])
                        // cuerpos[j].velocidad = Cinematica.reboteSimple(cuerpos[j], normales[0])
                        if (cuerpos[i].fijo) {
                            cuerpos[j].posicion = cuerpos[j].posicion.sumar(Interaccion.resolverSolapamiento(cuerpos[j], cuerpos[i], normales[0]));
                        }
                        else if (cuerpos[j].fijo) {
                            cuerpos[i].posicion = cuerpos[i].posicion.sumar(Interaccion.resolverSolapamiento(cuerpos[i], cuerpos[j], normales[1]));
                        }
                        else {
                            cuerpos[i].posicion = cuerpos[i].posicion.sumar(Interaccion.resolverSolapamiento(cuerpos[i], cuerpos[j], normales[1]));
                            cuerpos[j].posicion = cuerpos[j].posicion.sumar(Interaccion.resolverSolapamiento(cuerpos[j], cuerpos[i], normales[0]));
                        }
                    }
                }
                // cuerposRebotados.push(cuerpos[i])
            }
            // cuerposRebotados.push(cuerpos[cuerpos.length - 1])
        }
        return cuerpos;
        // return cuerposRebotados;
    }
    /**Retorna una copia del conjunto de cuerpos con la resolución de contacto sólido para cuerpos que han colisionado.      */
    static contactoSimple(cuerpos) {
        // console.log('Comprobando')
        for (let iteracion = 0; iteracion < Interaccion.iteraciones; iteracion++) {
            // let cuerposRebotados: Cuerpo[] = [];
            for (let i = 0; i < cuerpos.length - 1; i++) {
                for (let j = i + 1; j < cuerpos.length; j++) {
                    if (Colision.detectar(cuerpos[i], cuerpos[j])) {
                        let normales = Colision.normalesContacto(cuerpos[i], cuerpos[j]);
                        let velocidadesFinales = Cinematica.reboteElastico(cuerpos[i], cuerpos[j]);
                        if (cuerpos[i].fijo) {
                            cuerpos[j].posicion = cuerpos[j].posicion.sumar(Interaccion.resolverSolapamiento(cuerpos[j], cuerpos[i], normales[0]));
                        }
                        else if (cuerpos[j].fijo) {
                            cuerpos[i].posicion = cuerpos[i].posicion.sumar(Interaccion.resolverSolapamiento(cuerpos[i], cuerpos[j], normales[1]));
                        }
                        else {
                            cuerpos[i].posicion = cuerpos[i].posicion.sumar(Interaccion.resolverSolapamiento(cuerpos[i], cuerpos[j], normales[1]));
                            cuerpos[j].posicion = cuerpos[j].posicion.sumar(Interaccion.resolverSolapamiento(cuerpos[j], cuerpos[i], normales[0]));
                        }
                    }
                }
                // cuerposRebotados.push(cuerpos[i])
            }
            // cuerposRebotados.push(cuerpos[cuerpos.length - 1])
        }
        return cuerpos;
        // return cuerposRebotados;
    }
    static resolverSolapamiento(cuerpoUno, cuerpoDos, normal) {
        let vectorDesplazamiento = normal.normalizar();
        let solapamiento = (cuerpoDos.radio + cuerpoUno.radio) - Geometria.distanciaEntrePuntos(cuerpoDos.posicion, cuerpoUno.posicion);
        if (cuerpoDos.fijo) {
            vectorDesplazamiento = vectorDesplazamiento.escalar(solapamiento);
            return vectorDesplazamiento;
        }
        vectorDesplazamiento = vectorDesplazamiento.escalar(0.5 * solapamiento);
        return vectorDesplazamiento;
    }
    /**Retorna una copia del conjunto de circunferencias con la resolución de rebote para cuerpos que han colisionado con los bordes de un entorno.      */
    static reboteCircunferenciasConEntorno(circunferencias, entorno) {
        let cuerposRebotados = [];
        for (let i = 0; i < circunferencias.length; i++) {
            let solapamiento = Colision.circunferenciaEntorno(circunferencias[i], entorno);
            if (solapamiento != null) {
                let normal = Colision.normalContactoConEntorno(circunferencias[i], entorno);
                let normalInvertida = normal.invertir();
                // circunferencias[i].velocidad = Cinematica.reboteElastico(circunferencias[i], entorno)[0]
                // circunferencias[i].velocidad = Vector.invertir(Cinematica.reboteElastico(circunferencias[i], entorno)[0])
                circunferencias[i].velocidad = Cinematica.reboteSimple(circunferencias[i], normalInvertida);
                circunferencias[i].posicion = circunferencias[i].posicion.sumar(Interaccion.resolverSolapamientoEntorno(normalInvertida, solapamiento));
            }
            cuerposRebotados.push(circunferencias[i]);
        }
        return cuerposRebotados;
    }
    static resolverSolapamientoEntorno(normal, solapamiento) {
        let vectorDesplazamiento = normal.normalizar();
        vectorDesplazamiento = vectorDesplazamiento.escalar(1 * solapamiento);
        return vectorDesplazamiento;
    }
}
