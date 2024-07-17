import { Matematica } from "./Matematica.js";
import { Punto } from "./Punto.js";
//POR REVISAR
//Revisar métodos de recálculo de componentes, ángulo y magnitud

export class Vector{
    private _x?: number;
    private _y?: number;
    private _angulo?: number;
    private _magnitud?: number;
    private _id?: number;
    private _origen: Punto;
    private _extremo: Punto;
    constructor(x?: number, y?: number, magnitud?: number, angulo?: number){
        if(x && y){
            this._x = x;
            this._y = y;
            this.calcularMagnitud();
            this.calcularAngulo();
        }
        else if(angulo && magnitud){
            this._magnitud = magnitud;
            this._angulo = angulo;
            this.calcularComponentes()
        }
        this._origen = Punto.origen();
        this._extremo = Punto.crear(this._x! + this._origen.x, this._y! + this._origen.y);
    }
    get origen(): Punto{
        let origen: Punto = Punto.clonar(this._origen);
        return origen;
    }
    get extremo(): Punto{
        let extremo: Punto = Punto.clonar(this._extremo);
        return extremo;
    }
    get x(): number{
        return this._x!;
    }
    get y(): number{
        return this._y!;
    }
    get magnitud(): number{
        return this._magnitud!;
    }
    get angulo(): number{
        return this._angulo!;
    }
    set origen(origen: Punto){
        this._origen = Punto.clonar(origen);
        this._extremo.x += origen.x;
        this._extremo.y += origen.y;
    }
    private calcularMagnitud(){
        if(this._x == 0 && this._y == 0){
            this._magnitud = 0;
        }
        else{
            this._magnitud = Matematica.raiz(Matematica.sumaSegura(Matematica.potencia(this._x!, 2), Matematica.potencia(this._y!, 2)), 2);
        }
    }
    private calcularAngulo(){
        if(this._x! == 0 && this._y! >= 0){
            this._angulo = Matematica.PI * 0.5;
        }
        else if (this._x == 0 && this._y! < 0){
            this._angulo = Matematica.PI * 1.5;
        }
        else {
            this._angulo = Math.atan(this._y! / this._x!)
        }
    }
    private calcularComponentes(){
        this._x = Matematica.multiplicacionSegura(this._magnitud!, Math.cos(this._angulo!));
        this._y = Matematica.multiplicacionSegura(this._magnitud!, Math.sin(this._angulo!));
    }
    static segunComponentes(x: number, y: number): Vector{
        return new Vector(x, y);
    }
    static segunAngulo(magnitud: number, angulo: number): Vector{
        return new Vector(undefined, undefined, magnitud, angulo);
    }    
    static segunPuntos(origen: Punto, extremo: Punto): Vector{
        let vector: Vector = new Vector(extremo.x - origen.x, extremo.y - origen.y);
        return vector;
    }
    static clonar(vector: Vector): Vector{
        return new Vector(vector.x, vector.y)
    }
    static suma(vectorUno: Vector, vectorDos: Vector): Vector{
        let vectorSuma: Vector = new Vector(Matematica.sumaSegura(vectorUno.x, vectorDos.x), Matematica.sumaSegura(vectorUno.y, vectorDos.y));
        return vectorSuma;
    }
    static resta(vectorUno: Vector, vectorDos: Vector): Vector{
        let vectorResta: Vector = new Vector(Matematica.sumaSegura(vectorUno.x, -vectorDos.x), Matematica.sumaSegura(vectorUno.y, -vectorDos.y));
        return vectorResta;
    }
    static escalar(vector: Vector, escalar: number): Vector{
        let vectorEscalado: Vector = new Vector(Matematica.multiplicacionSegura(vector.x, escalar), Matematica.multiplicacionSegura(vector.y, escalar));
        return vectorEscalado;
    }
    static normalizar(vector: Vector){
        let normalizado = Vector.segunComponentes(Matematica.divisionSegura(vector.x, vector.magnitud), Matematica.divisionSegura(vector.y, vector.magnitud))
        return normalizado;
    }
    static productoPunto(vectorUno: Vector, vectorDos: Vector): number{
        let productoX: number = Matematica.multiplicacionSegura(vectorUno.x, vectorDos.x)
        let productoY: number = Matematica.multiplicacionSegura(vectorUno.y, vectorDos.y)
        let producto: number = Matematica.sumaSegura(productoX, productoY);
        return producto;
    }
    static anguloConVector(vectorUno: Vector, vectorDos: Vector): number{
        let punto: number = Vector.productoPunto(vectorUno, vectorDos);
        let magnitudes: number = Matematica.multiplicacionSegura(vectorUno.magnitud, vectorDos.magnitud);
        return Math.acos(punto / magnitudes);
    }

}