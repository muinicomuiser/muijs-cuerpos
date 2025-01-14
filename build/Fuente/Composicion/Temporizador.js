/**Contador de tiempo, en milisegundos.
 * Su propiedad 'activo' se vuelve false cuando ha transcurrido el tiempo ingresado.
*/
export class Temporizador {
    constructor(duracionMilisegundos) {
        this.tiempoInicial = Date.now();
        this.activo = true;
        this.duracion = duracionMilisegundos;
        setTimeout(() => this.activo = false, this.duracion);
    }
    /**Retorna el tiempo, en milisegundos, transcurrido desde la creación del temporizador.*/
    get tiempoTranscurrido() {
        return Date.now() - this.tiempoInicial;
    }
}
