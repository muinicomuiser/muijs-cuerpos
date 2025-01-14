import { Temporizador } from "./Temporizador.js";
export class Tiempo {
    constructor() {
        this._tiempoInicial = Date.now();
        this.temporizadores = [];
    }
    /**Retorna el número de temporizadores activos.*/
    get numeroTemporizadores() {
        return this.temporizadores.length;
    }
    /**Retorna el momento en milisegundos de la instanciación de este objeto.*/
    get tiempoInicial() {
        return this._tiempoInicial;
    }
    /**Retorna el tiempo en milisegundos transcurrido desde la última vez que se consultó .delta.
     * Si no se lo ha consultado antes, retorna el tiempo transcurrido desde la instanciación del objeto Tiempo.
    */
    get delta() {
        if (!this.tiempoPrevio) {
            this.tiempoPrevio = Date.now();
        }
        this.tiempoActual = Date.now();
        let delta = this.tiempoActual - this.tiempoPrevio;
        this.tiempoPrevio = this.tiempoActual;
        return delta;
    }
    /**Ejecuta una función un número determinado de veces por segundo.*/
    iterarPorSegundo(funcion, numeroIteraciones) {
        const periodo = 1000 / numeroIteraciones;
        if (!this.tiempoPrevio) {
            this.tiempoPrevio = Date.now();
        }
        this.tiempoActual = Date.now();
        if (this.tiempoActual - this.tiempoPrevio >= periodo) {
            funcion();
            this.tiempoPrevio = this.tiempoActual;
        }
    }
    /**Crea un termporizador nuevo con la duración ingresada y lo agrega a la lista de temporizadores de la composición.*/
    crearTemporizador(tiempoMilisegundos) {
        const temporizador = new Temporizador(tiempoMilisegundos);
        this.temporizadores.push(temporizador);
        return temporizador;
    }
    /**Elimina del registro de temporizadores aquellos que estén inactivos.*/
    actualizarTemporizadores() {
        let indiceInactivo = this.temporizadores.findIndex((temporizador) => temporizador.activo == false);
        if (indiceInactivo != -1) {
            this.temporizadores.splice(indiceInactivo, 1);
        }
    }
}
