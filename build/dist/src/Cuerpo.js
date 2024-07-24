import { Forma } from "./Formas.js";
import { Matematica } from "./Matematica.js";
import { Vector } from "./Vector.js";
//Una propiedad que defina si es necesario actualizar la posición y la rotación.
//Un solo método para aplicar transformar y actualizar transformaciones
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
    ///REVISAR
    setearRotacinVelocidad() {
        this._transformacion.rotacion = Vector.angulo(this._velocidad) - Matematica.PI;
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
        this.setearRotacinVelocidad();
    }
    set aceleracion(aceleracion) {
        this._aceleracion = Vector.clonar(aceleracion);
    }
    set fijo(fijo) {
        this._fijo = fijo;
    }
    set escala(escala) {
        this.transformacion.escala = escala;
    }
    trazar(dibujante) {
        dibujante.trazar(this);
    }
    trazarVelocidad(dibujante) {
        let vectorVelocidad = Vector.clonar(this._velocidad);
        // vectorVelocidad = Vector.escalar(Vector.normalizar(vectorVelocidad), this._radio);
        vectorVelocidad = Vector.escalar(Vector.normalizar(vectorVelocidad), this._radio);
        vectorVelocidad.origen = this._transformacion.posicion;
        console.log(vectorVelocidad);
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
        let rectangulo = new Cuerpo(x, y, 4, rect.radio);
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
    actualizarMovimiento() {
        this._velocidad = Vector.suma(this._velocidad, this._aceleracion);
        this.mover(this._velocidad);
    }
    mover(vector) {
        super.mover(vector);
    }
    rotar(angulo) {
        super.rotar(angulo);
    }
    escalar(escala) {
        super.escalar(escala);
    }
}
