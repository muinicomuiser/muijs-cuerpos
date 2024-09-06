//Junta los cuerpos, interacciones, entorno, casos límite y renderizado.
//Debería estar acá la creación de canvas y contexto??

import { Contenedor } from "../Fisicas/Contenedor.js";
import { Cuerpo } from "../Fisicas/Cuerpo.js";
// import { Cuadricula, Entorno, Forma, Interaccion, Renderizado } from "../mui.js";
import { Cuadricula } from "../Cuadricula/Cuadricula.js";
import { Entorno } from "../Interaccion/Entorno.js";
import { Forma } from "../GeometriaPlana/Formas.js";
import { Interaccion } from "../Interaccion/Interaccion.js";
import { Renderizado } from "../Renderizado/Renderizado.js";
import { Tiempo } from "./Tiempo.js";

export class Composicion {

    render: Renderizado;
    cuerpos: Cuerpo[] = []
    formas: Forma[] = [];
    cuadricula!: Cuadricula;
    tiempo!: Tiempo;
    contenedor!: Contenedor;
    entorno!: Entorno;
    fps: number = 60;

    constructor(idCanvas: string) {
        this.render = Renderizado.crearPorIdCanvas(idCanvas);

    }

    tamanoCanvas(ancho: number, alto: number) {
        this.render.anchoCanvas = ancho;
        this.render.altoCanvas = alto;
    }

    agregarCuerpos(...cuerpos: Cuerpo[]): void {
        this.cuerpos.push(...cuerpos);
    }

    /**Actualiza la posición de un conjunto de cuerpos sumando la velocidad instantanea a la posición.*/
    actualizarMovimientoCuerpos() {
        this.cuerpos.forEach((cuerpo) => cuerpo.mover())
        Interaccion.reboteEntreCuerpos(this.cuerpos)
    }

    rellenarCuerpos() {
        this.render.rellenarFormas(this.cuerpos)
    }

    trazarCuerpos() {
        this.render.trazarFormas(this.cuerpos)
    }

    renderizarCuerpos() {
        this.render.renderizarFormas(this.cuerpos)
    }

    renderizarFormas() {
        this.render.renderizarFormas(this.formas)
    }
    // static actualizarMovimientoCuerpos(...cuerpos: Cuerpo[]): Cuerpo[] {
    //     cuerpos.forEach((cuerpo) => cuerpo.mover())
    //     return cuerpos;
    // }

}