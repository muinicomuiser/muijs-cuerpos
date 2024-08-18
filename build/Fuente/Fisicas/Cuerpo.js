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
    _velocidad = Vector.cero();
    _aceleracion = Vector.cero();
    _rotarSegunVelocidad = false;
    _fijo = false;
    _masa = 1;
    _densidad = 1;
    constructor() {
        super();
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
    get verticesTransformados() {
        if (this._rotarSegunVelocidad == true) {
            this._transformacion.rotacion = Vector.angulo(this._velocidad) - Vector.angulo(this._vertices[0]);
        }
        let verticesTransformados = this._transformacion.transformarConjuntoVectores(this._vertices);
        return verticesTransformados;
    }
    set velocidad(velocidad) {
        this._velocidad = Vector.clonar(velocidad);
    }
    set aceleracion(aceleracion) {
        this._aceleracion = Vector.clonar(aceleracion);
    }
    set masa(masa) {
        this._masa = masa;
    }
    set densidad(densidad) {
        this._densidad = densidad;
    }
    set fijo(fijo) {
        this._fijo = fijo;
    }
    set rotarSegunVelocidad(opcion) {
        this._rotarSegunVelocidad = opcion;
    }
    trazarVelocidad(dibujante) {
        let vectorVelocidad = Vector.clonar(this._velocidad);
        vectorVelocidad = Vector.escalar(Vector.normalizar(vectorVelocidad), this._radio);
        vectorVelocidad.origen = this._transformacion.posicion;
        dibujante.trazarVector(vectorVelocidad);
    }
    static cuerpoSegunForma(forma) {
        let cuerpo = new Cuerpo();
        cuerpo.vertices = forma.vertices;
        cuerpo.transformacion = forma.transformacion;
        cuerpo.lados = forma.lados;
        cuerpo.radio = forma.radio;
        cuerpo.tipo = forma.tipo;
        return cuerpo;
    }
    /**Retorna un cuerpo geométrico regular.
     * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
    static poligono(x, y, lados, radio, masa = 1, densidad = 1) {
        let poliForma = super.poligono(x, y, lados, radio);
        let poligono = Cuerpo.cuerpoSegunForma(poliForma);
        poligono.masa = masa;
        poligono.densidad = densidad;
        poligono.fijo = false;
        return poligono;
    }
    /**Retorna un cuerpo geométrico regular.
     * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
    static poligonoSegunVertices(vertices, masa = 1, densidad = 1) {
        let poliForma = super.poligonoSegunVertices(vertices);
        let poligono = Cuerpo.cuerpoSegunForma(poliForma);
        poligono.masa = masa;
        poligono.densidad = densidad;
        poligono.fijo = false;
        return poligono;
    }
    /**Retorna un cuerpo rectangular.*/
    static rectangulo(x, y, base, altura, masa = 1, densidad = 1) {
        let rectForma = super.rectangulo(x, y, base, altura);
        let rectangulo = Cuerpo.cuerpoSegunForma(rectForma);
        rectangulo.masa = masa;
        rectangulo.densidad = densidad;
        rectangulo.fijo = false;
        return rectangulo;
    }
    /**Retorna un cuerpo con forma de circunferencia.*/
    static circunferencia(x, y, radio, masa = 1, densidad = 1) {
        let circuloForma = super.circunferencia(x, y, radio);
        let circunferencia = Cuerpo.cuerpoSegunForma(circuloForma);
        circunferencia.masa = masa;
        circunferencia.densidad = densidad;
        circunferencia.fijo = false;
        return circunferencia;
    }
    /**Suma la velocidad y la aceleración a la posición.*/
    mover() {
        this._velocidad = Vector.suma(this._velocidad, this._aceleracion);
        this._transformacion.posicion = Vector.suma(this._transformacion.posicion, this._velocidad);
    }
}
