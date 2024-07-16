import { Matematica } from "./Matematica.js";
import { Punto } from "./Punto.js";
//POR REVISAR
//Revisar métodos de recálculo de componentes, ángulo y magnitud
export class Vector {
    constructor(x, y, magnitud, angulo) {
        if (x && y) {
            this._x = x;
            this._y = y;
            this._magnitud = this.calcularMagnitud();
            this._angulo = this.calcularAngulo();
            console.log("calculé la magnitud");
        }
        else if (angulo && magnitud) {
            this._magnitud = magnitud;
            this._angulo = angulo;
            this._x = this._magnitud * Math.cos(this._angulo);
            this._y = this._magnitud * Math.sin(this._angulo);
            console.log("calculé las componentes");
        }
        this._origen = Punto.origen();
    }
    get origen() {
        let origen = Punto.clonar(this._origen);
        return origen;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get magnitud() {
        return this._magnitud;
    }
    get angulo() {
        return this._angulo;
    }
    set magnitud(magnitud) {
        this._magnitud = magnitud;
        this.calcularComponentes();
    }
    set angulo(angulo) {
        this._angulo = angulo;
        this.calcularComponentes();
    }
    set y(y) {
        this._y = y;
        this._magnitud = this.calcularMagnitud();
        this._angulo = this.calcularAngulo();
    }
    set x(x) {
        this._x = x;
        this._magnitud = this.calcularMagnitud();
        this._angulo = this.calcularAngulo();
    }
    set origen(punto) {
        this._origen = Punto.clonar(punto);
    }
    static segunComponentes(x, y) {
        return new Vector(x, y);
    }
    static segunAngulo(magnitud, angulo) {
        return new Vector(undefined, undefined, magnitud, angulo);
    }
    static segunPuntos(puntoUno, puntoDos) {
        let vector = new Vector(puntoDos.x - puntoUno.x, puntoDos.y - puntoUno.y);
        return vector;
    }
    calcularMagnitud() {
        let magnitud = Matematica.raiz(Matematica.sumaSegura(Matematica.potencia(this._x, 2), Matematica.potencia(this._y, 2)), 2);
        return magnitud;
    }
    calcularAngulo() {
        let angulo = Math.acos(this._x / this.calcularMagnitud());
        return angulo;
    }
    calcularComponentes() {
        this._x = Matematica.multiplicacionSegura(this._magnitud, Math.cos(this._angulo));
        this._y = Matematica.multiplicacionSegura(this._magnitud, Math.sin(this._angulo));
    }
    suma(vector) {
        let vectorSuma = new Vector(Matematica.sumaSegura(this._x, vector.x), Matematica.sumaSegura(this._y, vector.y));
        return vectorSuma;
    }
    resta(vector) {
        let vectorSuma = new Vector(Matematica.sumaSegura(this._x, -vector.x), Matematica.sumaSegura(this._y, -vector.y));
        return vectorSuma;
    }
    escalar(escalar) {
        let vectorEscalado = new Vector(Matematica.multiplicacionSegura(this._x, escalar), Matematica.multiplicacionSegura(this._y, escalar));
        return vectorEscalado;
    }
    productoPunto(vector) {
        let productoX = Matematica.multiplicacionSegura(this._x, vector.x);
        let productoY = Matematica.multiplicacionSegura(this._y, vector.y);
        let producto = Matematica.sumaSegura(productoX, productoY);
        return producto;
    }
    anguloConVector(vector) {
        let punto = this.productoPunto(vector);
        let magnitudes = Matematica.multiplicacionSegura(this._magnitud, vector.magnitud);
        return Math.acos(punto / magnitudes);
    }
}
