import { Matematica } from "./Matematica.js";
//POR REVISAR
export class Vector {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._origen = { x: 0, y: 0 };
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
        return Matematica.raiz(Matematica.sumaSegura(Matematica.potencia(vector.x, 2), Matematica.potencia(vector.y, 2)), 2);
    }
    static angulo(vector) {
        if (vector.x > 0 && vector.y >= 0) {
            return Math.acos(vector.x / Vector.magnitud(vector));
        }
        else if (vector.x <= 0 && vector.y >= 0) {
            return Math.acos(vector.x / Vector.magnitud(vector));
        }
        else if (vector.x >= 0 && vector.y < 0) {
            // return Math.asin(vector.y / Vector.magnitud(vector));
            return Matematica.DOS_PI + Math.asin(vector.y / Vector.magnitud(vector));
        }
        else if (vector.x <= 0 && vector.y < 0) {
            return Matematica.PI - Math.asin(vector.y / Vector.magnitud(vector));
        }
        else {
            return 0;
        }
        // if(vector.x == 0 && vector.y > 0){
        //     return Matematica.PI * 0.5;
        // }
        // else if (vector.x == 0 && vector.y < 0){
        //     return Matematica.PI * 1.5;
        // }
        // else if (vector.x == 0 && vector.y == 0){
        //     return Matematica.PI * 0.5;
        // }
        // else {
        //     return Math.atan(vector.y / vector.x)
        // }
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
        let vectorSuma = new Vector(Matematica.sumaSegura(vectorUno.x, vectorDos.x), Matematica.sumaSegura(vectorUno.y, vectorDos.y));
        return vectorSuma;
    }
    static resta(vectorUno, vectorDos) {
        let vectorResta = new Vector(Matematica.sumaSegura(vectorUno.x, -vectorDos.x), Matematica.sumaSegura(vectorUno.y, -vectorDos.y));
        return vectorResta;
    }
    static escalar(vector, escalar) {
        let vectorEscalado = new Vector(Matematica.multiplicacionSegura(vector.x, escalar), Matematica.multiplicacionSegura(vector.y, escalar));
        return vectorEscalado;
    }
    static normalizar(vector) {
        let magnitud = Matematica.raiz(vector.x ** 2 + vector.y ** 2, 2);
        return new Vector(vector.x / magnitud, vector.y / magnitud);
    }
    static punto(vectorUno, vectorDos) {
        let productoX = Matematica.multiplicacionSegura(vectorUno.x, vectorDos.x);
        let productoY = Matematica.multiplicacionSegura(vectorUno.y, vectorDos.y);
        let producto = Matematica.sumaSegura(productoX, productoY);
        return producto;
    }
    static cruz(vectorUno, vectorDos) {
        let magnitudes = Vector.magnitud(vectorUno) * Vector.magnitud(vectorDos);
        let angulo = Vector.anguloVectores(vectorUno, vectorDos);
        return magnitudes * Math.sin(angulo);
    }
    static anguloVectores(vectorUno, vectorDos) {
        let punto = Vector.punto(vectorUno, vectorDos);
        let magnitudes = Matematica.multiplicacionSegura(vectorUno.magnitud, vectorDos.magnitud);
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
        let x = Math.cos(angulo) * vector.x - Math.sin(angulo) * vector.y;
        let y = Math.sin(angulo) * vector.x + Math.cos(angulo) * vector.y;
        return new Vector(x, y);
    }
}
