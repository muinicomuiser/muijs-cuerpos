import { Matematica } from "./Matematica.js";
import { Matriz } from "./Matrices.js";
import { Punto } from "./Punto.js";
import { Vector } from "./Vector.js";
//POR INTEGRAR
//  Para una forma personalizada, ya sea abierta o cerrada, agragar un método para calcular su radio o su centro
export class Forma{
    protected _id: string;
    protected _centro: Vector;
    protected _lados: number;
    protected _radio: number;
    protected _vertices: Vector[];
    private constructor(x: number, y: number, lados: number = 0, radio: number = 0){
        this._id = "";
        this._centro = Vector.crear(x, y);
        this._lados = lados;
        this._radio = radio;
        this._vertices = this.crearVertices();
    }
    get id(): string{
        return this._id;
    }
    get centro(): Vector{
        let centro: Vector = Vector.crear(this._centro.x, this._centro.y);
        return centro;
    }
    get lados(): number{
        return this._lados;
    }
    get radio(): number{
        return this._radio;
    }
    get vertices(): Vector[]{
        return Vector.clonarConjunto(this._vertices);
    }
    set id(nuevaId: string){
        this._id = nuevaId;
    }
    set centro(nuevoCentro: Vector){
        this._centro = Vector.clonar(nuevoCentro);
    }
    set lados(numeroLados: number){
        this._lados = numeroLados;
    }
    set radio(nuevoRadio: number){
        this._radio = nuevoRadio;
    }
    set vertices(vertices: Vector[]){
        this._vertices = Vector.clonarConjunto(vertices);
    }
    private crearVertices(): Vector[]{
        if(this._lados == 0){
            return [];
        }
        let theta = Matematica.DOS_PI / this._lados;
        let offset = theta * 0.5;
        let nVertices = [];
        for (let i: number = 0; i < this._lados; i ++) {
            let angulo = offset + (i * theta);
            let xx = Math.cos(angulo) * this._radio + this._centro.x;
            let yy = Math.sin(angulo) * this._radio + this._centro.y;
            let vertice: Vector = Vector.crear(xx, yy);
            nVertices.push(vertice);
        }
        return nVertices;
    }

    //Agregar control de errores para índices mayores al número de vértices
    public moverVertice(indice: number, punto: Punto){
        this._vertices[indice] = Vector.crear(punto.x, punto.y);
    }
    static poligono(x: number, y: number, lados: number, radio: number){
        let nuevoPoligono = new Forma(x, y, lados, radio);
        nuevoPoligono.id = "poligono";
        return nuevoPoligono;
    }
    static circunferencia(x: number, y: number, radio: number){
        let lados = 10 + Matematica.truncar(radio / 10, 0); 
        if(lados % 2 == 1){
            lados++
        }
        if(lados > 30){
            lados = 30;
        }
        let nuevaCircunferencia = new Forma(x, y, lados, radio);
        nuevaCircunferencia.id = "circunferencia";
        return nuevaCircunferencia;
    }
    static rectangulo(x: number, y: number, base: number, altura: number){
        let rectangulo = new Forma(x, y, 4, Matematica.hipotenusa(base * 0.5, altura * 0.5));
        rectangulo.id = "poligono";

        let ver1: Vector = Vector.crear(Matematica.sumaSegura(base/2, x), Matematica.sumaSegura(altura/2, y));
        let ver2: Vector = Vector.crear(Matematica.sumaSegura(-base/2, x), Matematica.sumaSegura(altura/2, y));
        let ver3: Vector = Vector.crear(Matematica.sumaSegura(-base/2, x), Matematica.sumaSegura(-altura/2, y));
        let ver4: Vector = Vector.crear(Matematica.sumaSegura(base/2, x), Matematica.sumaSegura(-altura/2, y));
        let rectVertices = [ver1, ver2, ver3, ver4];
        rectangulo.vertices = rectVertices;
        return rectangulo;
    }
    static recta(puntoUno: Punto, puntoDos: Punto){
        let centro = Vector.crear(puntoUno.x / 2 + puntoDos.x / 2, puntoUno.y / 2 + puntoDos.y / 2);
        let vertices: Vector[] = [Vector.crear(puntoUno.x, puntoUno.y), Vector.crear(puntoDos.x, puntoDos.y)];
        let linea: Forma = new Forma(centro.x, centro.y, 1);
        linea.vertices = vertices;
        linea.id = "linea";
        return linea;
    }
    static trazo(vertices: Vector[]): Forma{
        let centro: Punto = {x: 0, y: 0};
        let trazo: Forma = new Forma(0, 0);
        for(let vertice of vertices){
            centro.x += vertice.x / vertices.length;
            centro.y += vertice.y / vertices.length;
            trazo.vertices.push(vertice);
        }
        trazo.centro = Vector.crear(centro.x, centro.y);
        trazo.id = "linea";
        trazo.lados = vertices.length - 1;
        return trazo;
    }


    //Centra la forma en el punto
    private ubicar(punto: Punto): void{
        let dx: number = this._centro.x - punto.x;
        let dy: number = this._centro.y - punto.y;
        let nuevosVertices: Vector[] = []
        for(let vertice of this._vertices){
            nuevosVertices.push(Vector.resta(vertice, Vector.crear(dx, dy)));
        }
        this._vertices = Vector.clonarConjunto(nuevosVertices);
        this._centro = Vector.crear(punto.x, punto.y);
    } 
    public rotarSegunOrigen(angulo: number): void{
        let nuevosVertices: Vector[] = []
        for(let vertice of this._vertices){
            let verticeRotado = Vector.rotar(vertice, angulo);
            nuevosVertices.push(verticeRotado);
        }
        this._vertices = Vector.clonarConjunto(nuevosVertices);
        this._centro = Vector.rotar(this._centro, angulo);
    }
    public rotarSegunCentro(angulo: number): void{
        let centro: Punto = {x: this._centro.x, y: this._centro.y};
        let origen: Punto = {x: 0, y: 0};
        this.ubicar(origen);
        this.rotarSegunOrigen(angulo);
        this.ubicar(centro);
    }
    public rotarSegunPunto(punto: Punto, angulo: number): void{
        let dx: number = this._centro.x - punto.x;
        let dy: number = this._centro.y - punto.y;
        let centroRotacion: Punto = {x: dx, y: dy};
        this.ubicar(centroRotacion);
        this.rotarSegunOrigen(angulo);
        centroRotacion = {x: this._centro.x + punto.x, y: this._centro.y + punto.y};
        this.ubicar(centroRotacion);
    }
    public mover(vector: Vector){
        let vectorSuma = Vector.suma(this._centro, vector)
        this.ubicar(vectorSuma);
    }
}
