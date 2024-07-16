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
    constructor(x?: number, y?: number, magnitud?: number, angulo?: number){
        if(x && y){
            this._x = x;
            this._y = y;
            this._magnitud = this.calcularMagnitud();
            this._angulo = this.calcularAngulo();
            console.log("calculé la magnitud")
        }
        else if(angulo && magnitud){
            this._magnitud = magnitud;
            this._angulo = angulo;
            this._x = this._magnitud * Math.cos(this._angulo);
            this._y = this._magnitud * Math.sin(this._angulo);
            console.log("calculé las componentes")
        }
        this._origen = Punto.origen();
    }
    get origen(): Punto{
        let origen: Punto = Punto.clonar(this._origen);
        return origen;
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
    set magnitud(magnitud: number){
        this._magnitud = magnitud;
        this.calcularComponentes();
    }
    set angulo(angulo: number){
        this._angulo = angulo;
        this.calcularComponentes();
    }
    set y(y: number){
        this._y = y;
        this._magnitud = this.calcularMagnitud();
        this._angulo = this.calcularAngulo();
    }
    set x(x: number){
        this._x = x;
        this._magnitud = this.calcularMagnitud();
        this._angulo = this.calcularAngulo();
    }
    set origen(punto: Punto){
        this._origen = Punto.clonar(punto);
    }
    static segunComponentes(x: number, y: number): Vector{
        return new Vector(x, y);
    }
    static segunAngulo(magnitud: number, angulo: number): Vector{
        return new Vector(undefined, undefined, magnitud, angulo);
    }    
    static segunPuntos(puntoUno: Punto, puntoDos: Punto): Vector{
        let vector: Vector = new Vector(puntoDos.x - puntoUno.x, puntoDos.y - puntoUno.y);
        return vector;
    }
    private calcularMagnitud(): number{
        let magnitud: number = Matematica.raiz(Matematica.sumaSegura(Matematica.potencia(this._x!, 2), Matematica.potencia(this._y!, 2)), 2);
        return magnitud;
    }
    private calcularAngulo(): number{
        let angulo: number = Math.acos(this._x!/this.calcularMagnitud());
        return angulo;
    }
    private calcularComponentes(){
        this._x = Matematica.multiplicacionSegura(this._magnitud!, Math.cos(this._angulo!));
        this._y = Matematica.multiplicacionSegura(this._magnitud!, Math.sin(this._angulo!));
    }
    public suma(vector: Vector): Vector{
        let vectorSuma: Vector = new Vector(Matematica.sumaSegura(this._x!, vector.x), Matematica.sumaSegura(this._y!, vector.y));
        return vectorSuma;
    }
    public resta(vector: Vector): Vector{
        let vectorSuma: Vector = new Vector(Matematica.sumaSegura(this._x!, -vector.x), Matematica.sumaSegura(this._y!, -vector.y));
        return vectorSuma;
    }
    public escalar(escalar: number): Vector{
        let vectorEscalado: Vector = new Vector(Matematica.multiplicacionSegura(this._x!, escalar), Matematica.multiplicacionSegura(this._y!, escalar));
        return vectorEscalado;
    }
    public productoPunto(vector: Vector): number{
        let productoX: number = Matematica.multiplicacionSegura(this._x!, vector.x)
        let productoY: number = Matematica.multiplicacionSegura(this._y!, vector.y)
        let producto: number = Matematica.sumaSegura(productoX, productoY);
        return producto;
    }
    public anguloConVector(vector: Vector): number{
        let punto: number = this.productoPunto(vector);
        let magnitudes: number = Matematica.multiplicacionSegura(this._magnitud!, vector.magnitud);
        return Math.acos(punto / magnitudes);
    }
}