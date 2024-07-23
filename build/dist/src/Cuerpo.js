import { Forma } from "./Formas.js";
import { Vector } from "./Vector.js";
//Funciones estáticas para crear formas específicas(circulares, cuadradas, poligonales)
//que baste con agrerar la posición y las dimensiones del cuerpo para 
//que el método cree la forma y los vectores
//O la clase Cuerpo extiende a Forma??
export class Cuerpo extends Forma {
    constructor(x, y, lados = 0, radio = 0, masa = 1, densidad = 1, velocidad = Vector.cero()) {
        super(x, y, lados, radio);
        this._masa = masa;
        this._densidad = densidad;
        this._velocidad = velocidad;
        this._velocidad.origen = this._transformacion.posicion;
        this._aceleracion = Vector.cero();
        this._fijo = false;
    }
    get fijo() {
        return this._fijo;
    }
    get masa() {
        return this._masa;
    }
    get densidad() {
        return this._densidad;
    }
    get velocidad() {
        return Vector.clonar(this._velocidad);
    }
    get aceleracion() {
        return Vector.clonar(this._aceleracion);
    }
    set velocidad(velocidad) {
        this._velocidad = Vector.clonar(velocidad);
    }
    set aceleracion(aceleracion) {
        this._aceleracion = Vector.clonar(aceleracion);
    }
    set fijo(fijo) {
        this._fijo = fijo;
    }
    trazar(dibujante) {
        dibujante.trazar(this);
    }
    trazarVelocidad(dibujante) {
        let vectorVelocidad = Vector.clonar(this._velocidad);
        vectorVelocidad = Vector.escalar(Vector.normalizar(vectorVelocidad), this._radio);
        vectorVelocidad.origen = this._transformacion.posicion;
        dibujante.trazarVector(vectorVelocidad);
    }
    rellenar(dibujante) {
        dibujante.rellenar(this);
    }
    static poligono(x, y, lados, radio, masa = 1, densidad = 1, velocidad) {
        let poli = super.poligono(x, y, lados, radio);
        let poligono = new Cuerpo(x, y, lados, radio, masa, densidad, velocidad);
        poligono.id = poli.id;
        return poligono;
    }
    static circunferencia(x, y, radio, masa = 1, densidad = 1, velocidad) {
        let circulo = super.circunferencia(x, y, radio);
        let circunferencia = new Cuerpo(x, y, circulo.lados, circulo.radio, masa, densidad, velocidad);
        circunferencia.id = circulo.id;
        circunferencia.lados = circulo.lados;
        return circunferencia;
    }
    actualizarMovimiento() {
        this._velocidad = Vector.suma(this._velocidad, this._aceleracion);
        this.mover(this._velocidad);
        this._velocidad.origen = this._transformacion.posicion;
    }
    mover(vector) {
        super.mover(vector);
        this._velocidad.origen = this._transformacion.posicion;
    }
    rotar(angulo) {
        super.rotar(angulo);
        this._velocidad.origen = this._transformacion.posicion;
    }
}
