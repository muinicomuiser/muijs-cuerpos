import { Forma } from "../GeometriaPlana/Formas.js";
import { Matematica } from "../Utiles/Matematica.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Punto } from "../GeometriaPlana/Punto.js";
import { Dibujante } from "../Renderizado/Dibujante.js";
import { Transformacion } from "../GeometriaPlana/Transformacion.js";
//Una propiedad que defina si es necesario actualizar la posición y la rotación.
//Un solo método para aplicar transformar y actualizar transformaciones
//Buscar un modo de anclar un vértice a otro vector. Así se puede acoplar un ala a otro cuerpo. Método anclar(vector)
export class Cuerpo extends Forma{
    _masa: number;
    _densidad: number;
    _velocidad: Vector;
    _aceleracion: Vector;
    _fijo: boolean;
    _rotarSegunVelocidad: boolean;
    protected constructor(x: number, y: number, lados: number = 0, radio: number = 0, masa: number = 1, densidad: number = 1, velocidad: Vector = Vector.cero()){
        super(x, y, lados, radio);
        this._masa = masa;
        this._densidad = densidad;
        this._velocidad = velocidad;
        this._velocidad.origen = this._transformacion.posicion;
        this._aceleracion = Vector.cero();
        this._fijo = false;
        this._rotarSegunVelocidad = false;
    }
    ///REVISAR
    setearRotacionSegunVelocidad(){
        // let vectorVerticeCero: Vector = Vector.segunPuntos({x: 0, y: 0}, this._vertices[0]);
        // let anguloVerticeCero: number = Vector.angulo(vectorVerticeCero);
        // let anguloTransformacionVelocidad: number = Vector.angulo(this._velocidad) - anguloVerticeCero;
        // this._transformacion.rotacion += anguloTransformacionVelocidad;
        let vectorVerticeCero: Vector = Vector.segunPuntos({x: 0, y: 0}, this._vertices[0]);
        let anguloVerticeCero: number = Vector.angulo(vectorVerticeCero);
        this._transformacion.rotacion = Vector.angulo(this._velocidad) - anguloVerticeCero;
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
    set escala(escala: number){
        this.transformacion.escala = escala;
        super.escalar(escala);
    }
    set rotarSegunVelocidad(opcion: boolean){
        this._rotarSegunVelocidad = opcion;
    }
    public trazar(dibujante: Dibujante): void{
        dibujante.trazar(this);
    }
    public trazarVelocidad(dibujante: Dibujante): void{
        let vectorVelocidad: Vector = Vector.clonar(this._velocidad);  
        vectorVelocidad = Vector.escalar(Vector.normalizar(vectorVelocidad), this.radio);
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
        let rectangulo: Cuerpo = new Cuerpo(x, y, 4, rect.radio, masa, densidad, velocidad);
        rectangulo.vertices = rect.vertices;
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
    public mover(): void{
        this._velocidad = Vector.suma(this._velocidad, this._aceleracion);
        this._transformacion.posicion = Vector.suma(this._transformacion.posicion, this._velocidad);
        this.actualizarTransformacion();
    }
    public actualizarTransformacion(): void{
        if(this._rotarSegunVelocidad == true){
            // this.setearRotacionSegunVelocidad();
            let vectorVerticeCero: Vector = Vector.segunPuntos({x: 0, y: 0}, this._vertices[0]);
            let anguloVerticeCero: number = Vector.angulo(vectorVerticeCero);
            let anguloTransformacionVelocidad: number = Vector.angulo(this._velocidad) - anguloVerticeCero;
            // let anguloTransformacionVelocidad: number = Vector.angulo(this._velocidad) - Vector.angulo(this._vertices[0]);
            this._transformacion.rotacion += anguloTransformacionVelocidad;
            super.aplicarTransformacion();
            this._transformacion.rotacion -= anguloTransformacionVelocidad;
        }
        else{
            this.aplicarTransformacion();
        }
    }
}