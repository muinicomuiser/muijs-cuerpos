import { Forma } from "./Formas.js";
import { Matematica } from "./Matematica.js";
import { Vector } from "./Vector.js";
import { Punto } from "./Punto.js";
import { Dibujante } from "./Dibujante.js";
import { Transformacion } from "./Transformacion.js";
//Funciones estáticas para crear formas específicas(circulares, cuadradas, poligonales)
//que baste con agrerar la posición y las dimensiones del cuerpo para 
//que el método cree la forma y los vectores
//O la clase Cuerpo extiende a Forma??
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
        this._velocidad = Vector.clonar(velocidad);
        if(velocidad){
            this._velocidad = velocidad;
        }
        this._velocidad.origen = this._centro;
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
        vectorVelocidad.origen = this._centro;      
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
    static circunferencia(x: number, y: number, radio: number, masa: number = 1, densidad: number= 1, velocidad?: Vector): Cuerpo {
        let circulo: Forma = super.circunferencia(x, y, radio);
        let circunferencia: Cuerpo = new Cuerpo(x, y, circulo.lados, circulo.radio, masa, densidad, velocidad);
        circunferencia.id = circulo.id;
        circunferencia.lados = circulo.lados;
        return circunferencia;
    }
    public actualizarMovimiento(): void{
        this._velocidad = Vector.suma(this._velocidad, this._aceleracion);
        // this.rotarSegunVelocidad();
        super.mover(this._velocidad);
        this._velocidad.origen = this._centro;
    }
    public desplazar(vector: Vector): void{
        super.mover(vector);
        this._velocidad.origen = this._centro;
    }
    public rotarSegunPunto(punto: Punto, angulo: number): void {
        super.rotarSegunPunto(punto, angulo);
        this._velocidad.origen = this._centro;
    }
    // private rotarSegunVelocidad(){
    //     this._angulo = Vector.angulo(Vector.segunPuntos(this._centro, this._vertices[0]))
    //     let anguloRotacion: number = Vector.angulo(this._velocidad) - this._angulo;
    //     this.rotarSegunCentro(anguloRotacion);
    //     if(Vector.magnitud(this.velocidad) < 1){
    //         this._angulo = Vector.angulo(Vector.segunPuntos(this._centro, this._vertices[0]))
    //     }
    //     else{
    //         this._angulo = Vector.angulo(this._velocidad);
    //     }
    // }
}