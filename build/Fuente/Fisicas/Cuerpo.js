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
    rotarSegunVelocidad = false;
    fijo = false;
    masa = 1;
    densidad = 1;
    constructor() {
        super();
    }
    get velocidad() {
        return Vector.clonar(this._velocidad);
    }
    get aceleracion() {
        return Vector.clonar(this._aceleracion);
    }
    /**Retorna el conjunto de vértices después de */
    get verticesTransformados() {
        if (this.rotarSegunVelocidad == true) {
            this.rotacion = Vector.angulo(this._velocidad) - Vector.angulo(this._vertices[0]);
            return super.verticesTransformados;
        }
        return super.verticesTransformados;
    }
    /**Retorna una copia del vector velocidad.*/
    set velocidad(velocidad) {
        this._velocidad = Vector.clonar(velocidad);
    }
    /**Retorna una copia del vector aceleración. */
    set aceleracion(aceleracion) {
        this._aceleracion = Vector.clonar(aceleracion);
    }
    /**Retorna un cuerpo geométrico regular.
     * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
    static poligono(x, y, lados, radio, masa = 1, densidad = 1) {
        let poliForma = super.poligono(x, y, lados, radio);
        let poligono = Cuerpo.cuerpoSegunForma(poliForma);
        poligono.masa = masa;
        poligono.densidad = densidad;
        return poligono;
    }
    /**Retorna un cuerpo geométrico regular.
     * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
    static poligonoSegunVertices(vertices, masa = 1, densidad = 1) {
        let poliForma = super.poligonoSegunVertices(vertices);
        let poligono = Cuerpo.cuerpoSegunForma(poliForma);
        poligono.masa = masa;
        poligono.densidad = densidad;
        return poligono;
    }
    /**Retorna un cuerpo rectangular.*/
    static rectangulo(x, y, base, altura, masa = 1, densidad = 1) {
        let rectForma = super.rectangulo(x, y, base, altura);
        let rectangulo = Cuerpo.cuerpoSegunForma(rectForma);
        rectangulo.masa = masa;
        rectangulo.densidad = densidad;
        return rectangulo;
    }
    /**Retorna un cuerpo con forma de circunferencia.*/
    static circunferencia(x, y, radio, masa = 1, densidad = 1) {
        let circuloForma = super.circunferencia(x, y, radio);
        let circunferencia = Cuerpo.cuerpoSegunForma(circuloForma);
        circunferencia.masa = masa;
        circunferencia.densidad = densidad;
        return circunferencia;
    }
    /**Método auxiliar. Crea un cuerpo base a partir de una forma.*/
    static cuerpoSegunForma(forma) {
        let cuerpo = new Cuerpo();
        cuerpo.vertices = forma.vertices;
        cuerpo.transformacion = forma.transformacion;
        cuerpo.lados = forma.lados;
        cuerpo.radio = forma.radio;
        cuerpo.tipo = forma.tipo;
        return cuerpo;
    }
    /**Suma la velocidad y la aceleración a la posición.*/
    mover() {
        this._velocidad = Vector.suma(this._velocidad, this._aceleracion);
        if (!this.fijo) {
            this.posicion = Vector.suma(this.posicion, this._velocidad);
        }
    }
    /**Traza el vector velocidad del cuerpo a partir de su centro.*/
    trazarVelocidad(dibujante) {
        let vectorVelocidad = Vector.clonar(this._velocidad);
        vectorVelocidad = Vector.escalar(Vector.normalizar(vectorVelocidad), this.radio);
        vectorVelocidad.origen = this._transformacion.posicion;
        dibujante.trazarVector(vectorVelocidad);
    }
}
