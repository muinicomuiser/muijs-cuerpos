import { Matematica } from "../Utiles/Matematica.js";
//POR REVISAR
export class Vector {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._origen = { x: 0, y: 0 };
        this._id = 0;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get magnitud() {
        return Vector.magnitud(this);
    }
    get angulo() {
        return Vector.angulo(this);
    }
    get origen() {
        return { x: this._origen.x, y: this._origen.y };
    }
    set origen(origen) {
        this._origen = { x: origen.x, y: origen.y };
    }
    static magnitud(vector) {
        // return Matematica.raiz(Matematica.suma(Matematica.potencia(vector.x, 2), Matematica.potencia(vector.y, 2)), 2)
        return (vector.x ** 2 + vector.y ** 2) ** (1 / 2);
    }
    //REVISARRRRRRRRRRRRRRRR
    static angulo(vector) {
        if (vector.x == 0 && vector.y == 0) {
            return 0;
        }
        if (vector.x > 0 && vector.y >= 0) {
            return Math.acos(vector.x / Vector.magnitud(vector));
        }
        else if (vector.x <= 0 && vector.y >= 0) {
            return Math.acos(vector.x / Vector.magnitud(vector));
        }
        else if (vector.x >= 0 && vector.y < 0) {
            return Matematica.DOS_PI + Math.asin(vector.y / Vector.magnitud(vector));
        }
        else if (vector.x <= 0 && vector.y < 0) {
            return Matematica.PI - Math.asin(vector.y / Vector.magnitud(vector));
        }
        else {
            return 0;
        }
    }
    static cero() {
        return new Vector(0, 0);
    }
    static arriba() {
        return new Vector(0, -1);
    }
    static abajo() {
        return new Vector(0, 1);
    }
    static izquierda() {
        return new Vector(-1, 0);
    }
    static derecha() {
        return new Vector(1, 0);
    }
    static crear(x, y) {
        return new Vector(x, y);
    }
    static segunPuntos(origen, extremo) {
        let vector = new Vector(extremo.x - origen.x, extremo.y - origen.y);
        return vector;
    }
    static clonar(vector) {
        let x = vector.x;
        let y = vector.y;
        return new Vector(x, y);
    }
    static suma(vectorUno, vectorDos) {
        let vectorSuma = new Vector((vectorUno.x + vectorDos.x), (vectorUno.y + vectorDos.y));
        // let vectorSuma: Vector = new Vector(Matematica.suma(vectorUno.x, vectorDos.x), Matematica.suma(vectorUno.y, vectorDos.y));
        return vectorSuma;
    }
    static resta(vectorUno, vectorDos) {
        let vectorResta = new Vector((vectorUno.x - vectorDos.x), (vectorUno.y - vectorDos.y));
        // let vectorResta: Vector = new Vector(Matematica.suma(vectorUno.x, -vectorDos.x), Matematica.suma(vectorUno.y, -vectorDos.y));
        return vectorResta;
    }
    static escalar(vector, escalar) {
        let vectorEscalado = new Vector((vector.x * escalar), (vector.y * escalar));
        // let vectorEscalado: Vector = new Vector(Matematica.multiplicacion(vector.x, escalar), Matematica.multiplicacion(vector.y, escalar));
        return vectorEscalado;
    }
    static normalizar(vector) {
        // let magnitud: number = Matematica.raiz(vector.x**2 + vector.y**2, 2);
        // return new Vector(vector.x / magnitud, vector.y / magnitud);
        return new Vector(vector.x / vector.magnitud, vector.y / vector.magnitud);
    }
    /**Retorna un vector resultante de invertir la dirección del vector ingresado.*/
    static invertir(vector) {
        return new Vector(-vector.x, -vector.y);
    }
    /**Retorna el vector normal de un segmento formado por dos vectores.
     * El ángulo de la normal va en sentido antihorario según la dirección del primer al segundo vector.
     * (Según la inverción de ejes de las coordenadas de JS, donde los ángulos crecen en sentido horario).
    */
    static normal(vectorUno, vectorDos) {
        let vectorSegmento = Vector.segunPuntos(vectorUno, vectorDos);
        return Vector.rotar(vectorSegmento, -Matematica.PI_MEDIO);
    }
    static punto(vectorUno, vectorDos) {
        return (vectorUno.x * vectorDos.x) + (vectorUno.y * vectorDos.y);
        // let productoX: number = Matematica.multiplicacion(vectorUno.x, vectorDos.x)
        // let productoY: number = Matematica.multiplicacion(vectorUno.y, vectorDos.y)
        // let producto: number = Matematica.suma(productoX, productoY);
        // return producto;
    }
    static cruz(vectorUno, vectorDos) {
        return vectorUno.x * vectorDos.y - vectorUno.y * vectorDos.x;
        // return Matematica.multiplicacion(vectorUno.x, vectorDos.y) - Matematica.multiplicacion(vectorUno.y, vectorDos.x)
    }
    static proyeccion(vectorUno, vectorEje) {
        return (Vector.punto(vectorUno, vectorEje) / Vector.magnitud(vectorEje));
        // return Matematica.division(Vector.punto(vectorUno, vectorEje), Vector.magnitud(vectorEje));
    }
    static anguloVectores(vectorUno, vectorDos) {
        let punto = Vector.punto(vectorUno, vectorDos);
        let magnitudes = vectorUno.magnitud * vectorDos.magnitud;
        // let magnitudes: number = Matematica.multiplicacion(vectorUno.magnitud, vectorDos.magnitud);
        return Math.acos(punto / magnitudes);
    }
    static clonarConjunto(vectores) {
        let conjuntoCopia = [];
        for (let vector of vectores) {
            conjuntoCopia.push(Vector.clonar(vector));
        }
        return conjuntoCopia;
    }
    static rotar(vector, angulo) {
        let x = (Math.cos(angulo) * vector.x) - (Math.sin(angulo) * vector.y);
        let y = (Math.sin(angulo) * vector.x) + (Math.cos(angulo) * vector.y);
        /**Las dos líneas siguientes demoran 4 veces más que las dos líneas anteriores.*/
        // let x: number = Matematica.suma(Matematica.multiplicacion(Math.cos(angulo), vector.x), - Matematica.multiplicacion(Math.sin(angulo), vector.y));
        // let y: number = Matematica.suma(Matematica.multiplicacion(Math.sin(angulo), vector.x), Matematica.multiplicacion(Math.cos(angulo), vector.y));
        return new Vector(x, y);
    }
}
