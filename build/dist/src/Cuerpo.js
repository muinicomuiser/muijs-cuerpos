import { Forma } from "./Formas.js";
import { Vector } from "./Vector.js";
//Una propiedad que defina si es necesario actualizar la posición y la rotación.
//Un solo método para aplicar transformar y actualizar transformaciones
//Buscar un modo de anclar un vértice a otro vector. Así se puede acoplar un ala a otro cuerpo. Método anclar(vector)
export class Cuerpo extends Forma {
    constructor(x, y, lados = 0, radio = 0, masa = 1, densidad = 1, velocidad = Vector.cero()) {
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
    setearRotacionVelocidad() {
        let vectorVerticeCero = Vector.segunPuntos({ x: 0, y: 0 }, this._vertices[0]);
        let anguloVerticeCero = Vector.angulo(vectorVerticeCero);
        this._transformacion.rotacion = Vector.angulo(this._velocidad) - anguloVerticeCero;
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
    set escala(escala) {
        this.transformacion.escala = escala;
        super.escalar(escala);
    }
    set rotarSegunVelocidad(opcion) {
        this._rotarSegunVelocidad = opcion;
    }
    trazar(dibujante) {
        dibujante.trazar(this);
    }
    trazarVelocidad(dibujante) {
        let vectorVelocidad = Vector.clonar(this._velocidad);
        vectorVelocidad = Vector.escalar(Vector.normalizar(vectorVelocidad), this.radio);
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
    static rectangulo(x, y, base, altura, masa = 1, densidad = 1, velocidad) {
        let rect = super.rectangulo(x, y, base, altura);
        let rectangulo = new Cuerpo(x, y, 4, rect.radio, masa, densidad, velocidad);
        rectangulo.vertices = rect.vertices;
        rectangulo.id = "poligono";
        return rectangulo;
    }
    static circunferencia(x, y, radio, masa = 1, densidad = 1, velocidad) {
        let circulo = super.circunferencia(x, y, radio);
        let circunferencia = new Cuerpo(x, y, circulo.lados, circulo.radio, masa, densidad, velocidad);
        circunferencia.id = circulo.id;
        circunferencia.lados = circulo.lados;
        return circunferencia;
    }
    mover() {
        this._velocidad = Vector.suma(this._velocidad, this._aceleracion);
        this._transformacion.posicion = Vector.suma(this._transformacion.posicion, this._velocidad);
        this.actualizarTransformacion();
    }
    actualizarTransformacion() {
        if (this._rotarSegunVelocidad == true) {
            let vectorVerticeCero = Vector.segunPuntos({ x: 0, y: 0 }, this._vertices[0]);
            let anguloVerticeCero = Vector.angulo(vectorVerticeCero);
            let anguloTransformacionVelocidad = Vector.angulo(this._velocidad) - anguloVerticeCero;
            this._transformacion.rotacion += anguloTransformacionVelocidad;
            super.aplicarTransformacion();
            this._transformacion.rotacion -= anguloTransformacionVelocidad;
        }
        else {
            this.aplicarTransformacion();
        }
    }
}
