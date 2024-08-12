import { Matematica } from "../Utiles/Matematica.js";
import { Vector } from "./Vector.js";
import { Transformacion } from "./Transformacion.js";
import { Geometria } from "../Utiles/Geometria.js";
//POR INTEGRAR
// Para una forma personalizada, ya sea abierta o cerrada, agragar un método para calcular su radio o su centro
// Función de escalar, reflejar
// SUMAR FORMAS
export class Forma {
    _id;
    _centro;
    _lados;
    _radio;
    _vertices;
    _verticesTransformados;
    _transformacion;
    _radioTransformado;
    _color;
    constructor(x, y, lados = 0, radio = 0) {
        this._id = "";
        this._centro = Vector.cero();
        this._lados = lados;
        this._radio = radio;
        this._vertices = this.crearVertices();
        this._verticesTransformados = [];
        this._transformacion = new Transformacion(x, y);
        this.aplicarTransformacion();
        this._radioTransformado = this._radio * this._transformacion.escala;
        this._color = "blue";
    }
    /**Retorna un string que indica el tipo de forma geométrica.
     * "poligono", "circunferencia", "linea"
    */
    get id() {
        return this._id;
    }
    /**Retorna una copia del vector de la posición después de aplicar las transformaciones*/
    get posicion() {
        let posicion = Vector.clonar(this._transformacion.posicion);
        return posicion;
    }
    /**Retorna el número de lados de la figura.*/
    get lados() {
        return this._lados;
    }
    /**Retorna el valor del radio con la transformación de escala aplicada.*/
    get radio() {
        this._radioTransformado = this._radio * this._transformacion.escala;
        return this._radioTransformado;
    }
    /**Retorna el arreglo de vértices sin transformaciones.*/
    get vertices() {
        return Vector.clonarConjunto(this._vertices);
    }
    /**Retorna el arreglo de vértices después de aplicar las transformaciones de escala, rotación y desplazamiento..*/
    get verticesTransformados() {
        return Vector.clonarConjunto(this._verticesTransformados);
    }
    /**Retorna una copia de la transformación de la forma.*/
    get transformacion() {
        return new Transformacion(this._transformacion.posicion.x, this._transformacion.posicion.y, this._transformacion.rotacion, this._transformacion.escala);
    }
    /**Retorna el ángulo de rotación actual de la forma.*/
    get rotacion() {
        return this._transformacion.rotacion;
    }
    /**Retorna un conjunto de vectores normales de cada arista del polígono.
     * El orden de las aristas es en sentido horario.
    */
    get normales() {
        let normales = [];
        for (let i = 0; i < this.verticesTransformados.length; i++) {
            if (i != this.verticesTransformados.length - 1) {
                let normal = Vector.normal(this.verticesTransformados[i], this.verticesTransformados[i + 1]);
                normales.push(normal);
            }
            else {
                let normal = Vector.normal(this.verticesTransformados[i], this.verticesTransformados[0]);
                normales.push(normal);
            }
        }
        return normales;
    }
    get color() {
        return this._color;
    }
    set id(nuevaId) {
        this._id = nuevaId;
    }
    set posicion(nuevaPosicion) {
        this._transformacion.posicion = Vector.clonar(nuevaPosicion);
    }
    set escala(nuevaEscala) {
        this._transformacion.escala = nuevaEscala;
    }
    /**Modifica el valor de la rotación de la figura con respecto a su forma sin transformaciones.*/
    set rotacion(rotacion) {
        this._transformacion.rotacion = rotacion;
    }
    set lados(numeroLados) {
        this._lados = numeroLados;
    }
    set radio(nuevoRadio) {
        this._radio = nuevoRadio;
    }
    set vertices(vertices) {
        this._vertices = Vector.clonarConjunto(vertices);
    }
    set color(color) {
        this._color = color;
    }
    crearVertices() {
        if (this._lados == 0) {
            return [];
        }
        let theta = Matematica.DOS_PI / this._lados;
        let offset = theta * 0.5;
        let nVertices = [];
        for (let i = 0; i < this._lados; i++) {
            let angulo = offset + (i * theta);
            let xx = Math.cos(angulo) * this._radio;
            let yy = Math.sin(angulo) * this._radio;
            let vertice = Vector.crear(xx, yy);
            nVertices.push(vertice);
        }
        return nVertices;
    }
    //Agregar control de errores para índices mayores al número de vértices
    moverVertice(indice, punto) {
        this._vertices[indice] = Vector.crear(punto.x, punto.y);
    }
    static poligono(x, y, lados, radio) {
        let nuevoPoligono = new Forma(x, y, lados, radio);
        nuevoPoligono.id = "poligono";
        return nuevoPoligono;
    }
    static circunferencia(x, y, radio) {
        let lados = 10 + Matematica.truncar(radio / 10, 0);
        if (lados % 2 == 1) {
            lados++;
        }
        if (lados > 30) {
            lados = 30;
        }
        let nuevaCircunferencia = new Forma(x, y, lados, radio);
        nuevaCircunferencia.id = "circunferencia";
        return nuevaCircunferencia;
    }
    static rectangulo(x, y, base, altura) {
        let rectangulo = new Forma(x, y, 4, Geometria.hipotenusa(base * 0.5, altura * 0.5));
        rectangulo.id = "poligono";
        let ver1 = Vector.crear(base / 2, altura / 2);
        let ver2 = Vector.crear(-base / 2, altura / 2);
        let ver3 = Vector.crear(-base / 2, -altura / 2);
        let ver4 = Vector.crear(base / 2, -altura / 2);
        let rectVertices = [ver1, ver2, ver3, ver4];
        rectangulo.vertices = rectVertices;
        rectangulo.aplicarTransformacion();
        return rectangulo;
    }
    /**Crea una recta centrada en el origen y con la posición ingresada almacenada en su registro de transformación.*/
    static recta(puntoUno, puntoDos) {
        let centro = Vector.crear(puntoUno.x / 2 + puntoDos.x / 2, puntoUno.y / 2 + puntoDos.y / 2);
        let vertices = [Vector.crear(puntoUno.x - centro.x, puntoUno.y - centro.y), Vector.crear(puntoDos.x - centro.x, puntoDos.y - centro.y)];
        let linea = new Forma(centro.x, centro.y, 1);
        linea.vertices = vertices;
        linea.aplicarTransformacion();
        linea.id = "linea";
        return linea;
    }
    /**
     * Crea un conjunto de rectas a partir de un grupo de vértices.
     * Calcula el centro de los vértices, centra la forma en el origen y almacena
     * el centro en el registro de transformación.
     */
    static trazo(vertices) {
        let centro = { x: 0, y: 0 };
        for (let vertice of vertices) {
            centro.x += vertice.x / vertices.length;
            centro.y += vertice.y / vertices.length;
        }
        let posicion = Vector.crear(centro.x, centro.y);
        let trazo = new Forma(centro.x, centro.y);
        for (let vertice of vertices) {
            trazo.vertices.push(Vector.resta(vertice, posicion));
        }
        trazo.aplicarTransformacion();
        trazo.id = "linea";
        trazo.lados = vertices.length - 1;
        return trazo;
    }
    aplicarTransformacion() {
        this._verticesTransformados = this._transformacion.transformarConjuntoVectores(this._vertices);
    }
    /**Suma el ángulo ingresado al ángulo de rotación de la figura.*/
    rotar(angulo) {
        this._transformacion.rotacion += angulo;
        this.aplicarTransformacion();
    }
    /**Suma el vector ingresado al vector de posición de la figura.*/
    desplazar(vector) {
        this._transformacion.posicion = Vector.suma(this._transformacion.posicion, vector);
        this.aplicarTransformacion();
    }
    rotarSegunOrigen(angulo) {
        this._transformacion.posicion = Vector.rotar(this._transformacion.posicion, angulo);
        this.aplicarTransformacion();
    }
    rotarSegunPunto(punto, angulo) {
        let vectorAcomodador = Vector.crear(punto.x, punto.y);
        this._transformacion.posicion = Vector.resta(this._transformacion.posicion, vectorAcomodador);
        this.rotarSegunOrigen(angulo);
        this._transformacion.posicion = Vector.suma(this._transformacion.posicion, vectorAcomodador);
        this.aplicarTransformacion();
    }
    escalar(escala) {
        this._transformacion.escala = escala;
        this.aplicarTransformacion();
    }
    trazar(dibujante) {
        dibujante.color = this._color;
        dibujante.trazar(this);
    }
    rellenar(dibujante) {
        dibujante.color = this._color;
        dibujante.rellenar(this);
    }
}
