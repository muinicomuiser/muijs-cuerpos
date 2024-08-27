import { Celda } from "../Cuadricula/Celda.js";
import { Forma } from "../GeometriaPlana/Formas.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Dibujante } from "./Dibujante.js";

/**MÓDULO DE RENDERIZADO        
 * Extiende las funciones de Dibujante.         
 * Permite trabajar con conjuntos de formas y sobre el canvas.          
 * Se instancia usando el canvas.
 */

export class Renderizado extends Dibujante{
    private canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement){
        super(canvas.getContext("2d")!);
        this.canvas = canvas;
    }

    /**Traza un conjunto de formas.*/
    trazarFormas(formas: Forma[]): void{
        for(let forma of formas){
            forma.trazar(this);
        }
    }   

    /**Rellena un conjunto de formas.*/
    rellenarFormas(formas: Forma[]): void{
        for(let forma of formas){
            forma.rellenar(this);
        }
    }   

    /**Rellena y/o traza, según el caso, un conjunto de formas.*/
    renderizarFormas(formas: Forma[]): void{
        for(let forma of formas){
            if(forma.trazada){
                forma.trazar(this);
            }
            if(forma.rellenada){
                forma.rellenar(this);
            }
        }
    }

    /**Borra el contenido del canvas.       
     * Si se especifica opacidad, pinta el canvas completo usando como color el atributo colorFondo y con la opacidad especificada.
     */
    limpiarCanvas(opacidad?: number): void{
        if(opacidad){
            this.context.globalAlpha = opacidad;
            this.context.fillStyle = this.colorFondo;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.globalAlpha = this.opacidad;
        }
        else{
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    /**Traza las normales de una forma geométrica.*/
    trazarNormales(forma: Forma): void{
        forma.normales.forEach((normal)=>{
            let normalTrazable: Vector = Vector.clonar(normal);
            normalTrazable.origen = Vector.suma(forma.posicion, Vector.escalar(Vector.normalizar(normal), forma.apotema));
            this.trazarVector(normalTrazable)
        })
    }
}