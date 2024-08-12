/**
        =============================================
                 * MÓDULO DE CUERPOS *
        =============================================
        Trabaja usando objetos de tipo Forma.

        Crea cuerpos geométricos con masa y densidad.

        Contiene métodos para mover según velocidad y aceleración.

 */
import { Forma } from "../GeometriaPlana/Formas.js";
import { Vector } from "../GeometriaPlana/Vector.js";
//TAREAS
//Una propiedad que defina si es necesario actualizar la posición y la rotación.
//Un solo método para aplicar transformar y actualizar transformaciones
//Buscar un modo de anclar un vértice a otro vector. Así se puede acoplar un ala a otro cuerpo. Método anclar(vector)
/**MÓDULO DE CUERPOS
 * Trabaja usando objetos de tipo Forma.
 */
export class Cuerpo extends Forma {
    _masa;
    _densidad;
    _velocidad;
    _aceleracion;
    _fijo;
    _rotarSegunVelocidad;
    constructor(x, y, lados = 0, radio = 0, masa = 1, densidad = 1, fijo = false) {
        super(x, y, lados, radio);
        this._masa = masa;
        this._densidad = densidad;
        this._velocidad = Vector.cero();
        this._velocidad.origen = this._transformacion.posicion;
        this._aceleracion = Vector.cero();
        this._fijo = fijo;
        this._rotarSegunVelocidad = false;
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
    trazarVelocidad(dibujante) {
        let vectorVelocidad = Vector.clonar(this._velocidad);
        vectorVelocidad = Vector.escalar(Vector.normalizar(vectorVelocidad), this.radio);
        vectorVelocidad.origen = this._transformacion.posicion;
        dibujante.trazarVector(vectorVelocidad);
    }
    /**Retorna un cuerpo geométrico regular.
     * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
    static poligono(x, y, lados, radio, masa = 1, densidad = 1) {
        let poli = super.poligono(x, y, lados, radio);
        let poligono = new Cuerpo(x, y, lados, radio, masa, densidad);
        poligono.id = poli.id;
        return poligono;
    }
    /**Retorna un cuerpo rectangular.*/
    static rectangulo(x, y, base, altura, masa = 1, densidad = 1) {
        let rect = super.rectangulo(x, y, base, altura);
        let rectangulo = new Cuerpo(x, y, 4, rect.radio, masa);
        rectangulo.vertices = rect.vertices;
        rectangulo.id = "poligono";
        return rectangulo;
    }
    /**Retorna un cuerpo con forma de circunferencia.*/
    static circunferencia(x, y, radio, masa = 1, densidad = 1, fijo = false) {
        let circulo = super.circunferencia(x, y, radio);
        let circunferencia = new Cuerpo(x, y, circulo.lados, circulo.radio, masa, densidad, fijo);
        circunferencia.id = circulo.id;
        circunferencia.lados = circulo.lados;
        return circunferencia;
    }
    /**Suma la velocidad y la aceleración a la posición y aplica las transformaciones de escala, rotación y posición.*/
    mover() {
        this._velocidad = Vector.suma(this._velocidad, this._aceleracion);
        this._transformacion.posicion = Vector.suma(this._transformacion.posicion, this._velocidad);
        this.actualizarTransformacion();
    }
    /**Aplica las transformaciones de escala, rotación y posición.*/
    actualizarTransformacion() {
        if (this._rotarSegunVelocidad == true) {
            let anguloTransformacionVelocidad = Vector.angulo(this._velocidad) - Vector.angulo(this._vertices[0]);
            this._transformacion.rotacion += anguloTransformacionVelocidad;
            this.aplicarTransformacion();
            this._transformacion.rotacion -= anguloTransformacionVelocidad;
        }
        else {
            this.aplicarTransformacion();
        }
    }
}
