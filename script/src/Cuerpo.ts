import { Forma } from "./Formas.js";
import { Matematica } from "./Matematica.js";
import { Vector } from "./Vector.js";
import { Punto } from "./Punto.js";
import { Dibujante } from "./Dibujante.js";
import { Transformacion } from "./Transformacion.js";
//Una propiedad que defina si es necesario actualizar la posición y la rotación.
//Un solo método para aplicar transformar y actualizar transformaciones
export class Cuerpo extends Forma{
    _masa: number;
    _densidad: number;
    _velocidad: Vector;
    _aceleracion: Vector;
    _fijo: boolean;
    protected constructor(x: number, y: number, lados: number = 0, radio: number = 0, masa: number = 1, densidad: number = 1, velocidad: Vector = Vector.cero()){
        super(x, y, lados, radio);
        this._masa = masa;
        this._densidad = densidad;
        this._velocidad = velocidad;
        this._velocidad.origen = this._transformacion.posicion;
        this._aceleracion = Vector.cero();
        this._fijo = false;
    }
    get fijo(): boolean{
        return this._fijo;
    }
    get masa(): number{
        return this._masa;
    }
    get densidad(): number{
        return this._densidad;
    }
    get velocidad(): Vector{
        return Vector.clonar(this._velocidad)
    }
    get aceleracion(): Vector{
        return Vector.clonar(this._aceleracion);
    }
    set velocidad(velocidad: Vector){
        this._velocidad = Vector.clonar(velocidad);
    }
    set aceleracion(aceleracion: Vector){
        this._aceleracion = Vector.clonar(aceleracion);
    }
    set fijo(fijo: boolean){
        this._fijo = fijo;
    }
    public trazar(dibujante: Dibujante): void{
        dibujante.trazar(this);
    }
    public trazarVelocidad(dibujante: Dibujante): void{
        let vectorVelocidad: Vector = Vector.clonar(this._velocidad);  
        vectorVelocidad = Vector.escalar(Vector.normalizar(vectorVelocidad), this._radio);
        vectorVelocidad.origen = this._transformacion.posicion;      
        dibujante.trazarVector(vectorVelocidad);
    }
    public rellenar(dibujante: Dibujante): void{
        dibujante.rellenar(this);
    }
    static poligono(x: number, y: number, lados: number, radio: number, masa: number = 1, densidad: number= 1, velocidad?: Vector){
        let poli: Forma = super.poligono(x, y, lados, radio);
        let poligono: Cuerpo = new Cuerpo(x, y, lados, radio, masa, densidad, velocidad);
        poligono.id = poli.id;
        return poligono; 
    }
    static rectangulo(x: number, y: number, base: number, altura: number, masa: number = 1, densidad: number= 1, velocidad?: Vector){
        let rect: Forma = super.rectangulo(x, y, base, altura);
        let rectangulo: Cuerpo = new Cuerpo(x, y, 4, rect.radio);
        rectangulo.id = "poligono";
        return rectangulo;
    }
    static circunferencia(x: number, y: number, radio: number, masa: number = 1, densidad: number= 1, velocidad?: Vector): Cuerpo {
        let circulo: Forma = super.circunferencia(x, y, radio);
        let circunferencia: Cuerpo = new Cuerpo(x, y, circulo.lados, circulo.radio, masa, densidad, velocidad);
        circunferencia.id = circulo.id;
        circunferencia.lados = circulo.lados;
        return circunferencia;
    }
    public actualizarMovimiento(): void{
        this._velocidad = Vector.suma(this._velocidad, this._aceleracion);
        this.mover(this._velocidad);
        this._velocidad.origen = this._transformacion.posicion;
    }
    public mover(vector: Vector): void{
        super.mover(vector);
        this._velocidad.origen = this._transformacion.posicion;
    }
    public rotar(angulo: number): void {
        super.rotar(angulo);
        this._velocidad.origen = this._transformacion.posicion;
    }
}