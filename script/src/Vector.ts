import { Matematica } from "./Matematica.js";
import { Matriz } from "./Matrices.js";
import { Punto } from "./Punto.js";
//POR REVISAR
//Producto cruz
export class Vector{
    private _x: number;
    private _y: number;
    private _origen: Punto;
    constructor(x: number, y: number){
        this._x = x;
        this._y = y;
        this._origen = {x: 0, y: 0};
    }
    public get x(): number{
        return this._x;
    }
    public get y(): number{
        return this._y;
    }
    public get magnitud(): number{
        return Vector.magnitud(this);
    }
    public get angulo(): number{
        return Vector.angulo(this);
    }
    public get origen(): Punto{
        return {x: this._origen.x, y: this._origen.y};
    }
    public set origen(origen: Punto){
        this._origen = {x: origen.x, y: origen.y};
    }
    // get magnitud(): number{
    //     return this._magnitud!;
    // }
    // get angulo(): number{
    //     return this._angulo!;
    // }
    static magnitud(vector: Vector): number{
            return Matematica.raiz(Matematica.sumaSegura(Matematica.potencia(vector.x, 2), Matematica.potencia(vector.y, 2)), 2)
        }
    static angulo(vector: Vector): number{
        if(vector.x == 0 && vector.y > 0){
            return Matematica.PI * 0.5;
        }
        else if (vector.x == 0 && vector.y! < 0){
            return Matematica.PI * 1.5;
        }
        else if (vector.x == 0 && vector.y! == 0){
            return 0;
        }
        else {
            return Math.atan(vector.y / vector.x)
        }
    }
    static cero(): Vector{
        return new Vector(0, 0);
    }
    static arriba(): Vector{
        return new Vector(0, -1);
    }
    static abajo(): Vector{
        return new Vector(0, 1);
    }
    static izquierda(): Vector{
        return new Vector(-1, 0);
    }
    static derecha(): Vector{
        return new Vector(1, 0);
    }
    static crear(x: number, y: number): Vector{
        return new Vector(x, y);
    }
    static segunPuntos(origen: Punto, extremo: Punto): Vector{
        let vector: Vector = new Vector(extremo.x - origen.x, extremo.y - origen.y);
        return vector;
    }
    static clonar(vector: Vector): Vector{
        let x: number = vector.x;
        let y: number = vector.y;
        return new Vector(x, y)
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
        let magnitud: number = Matematica.raiz(vector.x**2 + vector.y**2, 2);
        return new Vector(vector.x / magnitud, vector.y / magnitud);
    }
    static punto(vectorUno: Vector, vectorDos: Vector): number{
        let productoX: number = Matematica.multiplicacionSegura(vectorUno.x, vectorDos.x)
        let productoY: number = Matematica.multiplicacionSegura(vectorUno.y, vectorDos.y)
        let producto: number = Matematica.sumaSegura(productoX, productoY);
        return producto;
    }
    static anguloVectores(vectorUno: Vector, vectorDos: Vector): number{
        let punto: number = Vector.punto(vectorUno, vectorDos);
        let magnitudes: number = Matematica.multiplicacionSegura(vectorUno.magnitud, vectorDos.magnitud);
        return Math.acos(punto / magnitudes);
    }
    static clonarConjunto(vectores: Vector[]): Vector[]{
        let conjuntoCopia: Vector[] = [];
        for(let vector of vectores){
            conjuntoCopia.push(Vector.clonar(vector));
        }
        return conjuntoCopia;
    }
    static rotar(vector: Vector, angulo: number): Vector{
        // cos*x -sin*y, sin*x + cos*y
        let x: number = Math.cos(angulo)*vector.x - Math.sin(angulo)*vector.y;
        let y: number = Math.sin(angulo)*vector.x + Math.cos(angulo)*vector.y;
        return new Vector(x, y);
    }
}