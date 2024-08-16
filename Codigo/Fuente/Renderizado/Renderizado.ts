import { Cuerpo } from "../Fisicas/Cuerpo.js";
import { Forma } from "../GeometriaPlana/Formas.js";
import { Dibujante } from "./Dibujante.js";

export class Renderizado extends Dibujante{
    private _canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement){
        super(canvas.getContext("2d")!);
        this._canvas = canvas;
    }
    trazarFormas(formas: Forma[]): void{
        for(let forma of formas){
            forma.trazar(this);
        }
    }   
    rellenarFormas(formas: Forma[]): void{
        for(let forma of formas){
            forma.rellenar(this);
        }
    }   

    /**Borra el contenido del canvas.       
     * Si se especifica opacidad, pinta el canvas completo usando como color el atributo colorFondo y con la opacidad especificada.
     */
    limpiarCanvas(opacidad?: number): void{
        if(opacidad){
            this._context.globalAlpha = opacidad;
            this._context.fillStyle = this._colorFondo;
            this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
            this._context.globalAlpha = this._opacidad;
            this._context.fillStyle = this._color;
        }
        else{
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
    }
}