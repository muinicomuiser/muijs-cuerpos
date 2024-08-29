/**Contador de tiempo, en milisegundos.     
 * Su propiedad 'activo' se vuelve false cuando ha transcurrido el tiempo ingresado.
*/
export class Temporizador {
    private tiempoInicial: number = Date.now();
    duracion: number;
    activo: boolean = true;
    constructor(duracionMilisegundos: number) {
        this.duracion = duracionMilisegundos;
        setTimeout(() => this.activo = false, this.duracion)
    }
    get tiempoTranscurrido(): number {
        return Date.now() - this.tiempoInicial
    }
}