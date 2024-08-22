import { Cuerpo } from "../Fisicas/Cuerpo.js";
import { Forma } from "../GeometriaPlana/Formas.js";
import { Vector } from "../GeometriaPlana/Vector.js";
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

    trazarNormales(forma: Forma): void{
        let saltoColor: number = 360 / forma.normales.length;
        let color: number = 0; 
        forma.normales.forEach((normal)=>{
            // let normalTrazable: Vector = Vector.escalar(Vector.normalizar(normal), forma.radioTransformado);
            let normalTrazable: Vector = normal;
            this.colorVectores = Renderizado.colorHSL(color, 100, 50);
            this.colorTexto = Renderizado.colorHSL(color, 100, 50);
            normalTrazable.origen = Vector.suma(forma.posicion, Vector.escalar(Vector.normalizar(normal), forma.apotema));
            this.trazarVector(normalTrazable)
            color += saltoColor;
        })
    }
}