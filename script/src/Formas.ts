import { Matematica } from "./Matematica.js";
import { Matriz } from "./Matrices.js";
import { Punto } from "./Punto.js";
export class Forma{
    protected _id?: string;
    protected _posicion: Punto;
    protected _lados: number;
    protected _radio: number;
    protected _vertices?: Punto[];
    constructor(posicionX: number, posicionY: number, lados: number, radio: number){
        this._posicion = {x: posicionX, y: posicionY};
        this._lados = lados;
        this._radio = radio;
        this.crearVertices();
    }
    get id(): string{
        return this._id!;
    }
    get posicion(): Punto{
        let punto: Punto = {x: this._posicion.x, y: this._posicion.y};
        return punto;
    }
    // get posicion(): Punto{
    //     return this._posicion!;
    // }
    get lados(): number{
        return this._lados;
    }
    get radio(): number{
        return this._radio;
    }
    get vertices(): Punto[]{
        let copiaVertices: Punto[] = [];
        for(let vertice of this._vertices!){
            let punto: Punto = {x: vertice.x, y: vertice.y};
            copiaVertices.push(punto);
        }
        return copiaVertices;
    }
    // get vertices(): Punto[]{
    //     return this._vertices!;
    // }
    set id(nuevaId: string){
        this._id = nuevaId;
    }
    set posicion(nuevaPosicion: Punto){
        this._posicion = nuevaPosicion;
    }
    set lados(numeroLados: number){
        this._lados = numeroLados;
    }
    set radio(nuevoRadio: number){
        this._radio = nuevoRadio;
    }
    set vertices(vertices: Punto[]){
        this._vertices = vertices;
    }
    protected crearVertices(){
        let theta = Matematica.DOS_PI / this._lados;
        let offset = theta * 0.5;
        let nVertices = [];
        for (let i: number = 0; i < this._lados; i += 1) {
            let angulo = offset + (i * theta);
            let xx = Math.cos(angulo) * this._radio + this._posicion.x;
            let yy = Math.sin(angulo) * this._radio + this._posicion.y;
            let vertice: Punto = {x: xx, y: yy};
            nVertices.push(vertice);
        }
        this._vertices = nVertices;
    }
    public moverVertice(i: number, punto: Punto){
        this._vertices![i-1].x = punto.x;
        this._vertices![i-1].y = punto.y;
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
        let ver1: Punto = {x: base/2 + x, y: altura/2 + y};
        let ver2: Punto = {x: -base/2 + x, y: altura/2 + y};
        let ver3: Punto = {x: -base/2 + x, y: -altura/2 + y};
        let ver4: Punto = {x: base/2 + x, y: -altura/2 + y};
        let rectVertices = [ver1, ver2, ver3, ver4];
        rectangulo.vertices = rectVertices;
        return rectangulo;
    }
    static linea(puntoUno: Punto, puntoDos: Punto){
        let centro = {x: puntoUno.x / 2 + puntoDos.x / 2, y: puntoUno.y / 2 + puntoDos.y / 2};
        let vertices: Punto[] = [puntoUno, puntoDos];
        let linea: Forma = new Forma(centro.x, centro.y, 2, 1);
        linea.vertices = vertices;
        linea.id = "linea";
        return linea;
    }


    //Mueve la forma ubicando el centro en el punto ingresado
    public ubicar(punto: Punto): void{
        let dx: number = this._posicion.x - punto.x;
        let dy: number = this._posicion.y - punto.y;
        for(let vertice of this._vertices!){
            vertice.x -= dx;
            vertice.y -= dy;
        }
        this._posicion.x = punto.x;
        this._posicion.y = punto.y;
    } 
    public rotarSegunOrigen(angulo: number): void{
        for(let vertice of this._vertices!){
            vertice = Matriz.rotarPunto2D(vertice, -angulo);
        }
        this._posicion = Matriz.rotarPunto2D(this._posicion, -angulo);
    }
    public rotarSegunCentro(angulo: number): void{
        let centroX: number = this._posicion.x;
        let centroY: number = this._posicion.y;
        let centro: Punto = {x: centroX, y: centroY};
        let origen: Punto = {x: 0, y: 0};
        this.ubicar(origen);
        this.rotarSegunOrigen(angulo);
        this.ubicar(centro);
    }
    public rotarSegunPunto(punto: Punto, angulo: number): void{
        let dx: number = this._posicion.x - punto.x;
        let dy: number = this._posicion.y - punto.y;
        let centroRotacion: Punto = {x: dx, y: dy};
        this.ubicar(centroRotacion);
        this.rotarSegunOrigen(angulo);
        centroRotacion = {x: this._posicion.x + punto.x, y: this._posicion.y + punto.y};
        this.ubicar(centroRotacion);

    }
}
