//Junta los cuerpos, interacciones, entorno, casos límite y Dibujante.
//Debería estar acá la creación de canvas y contexto??

import { Cuadricula } from "../cuadricula/cuadricula";
import { Contenedor } from "../fisicas/contenedor";
import { Cuerpo } from "../fisicas/cuerpo";
import { Forma } from "../geometria-plana/formas";
import { Entorno } from "../interaccion/entorno";
import { QuadTree } from "../interaccion/quad-tree";
import { Restriccion } from "../interaccion/restriccion";
import { Dibujante } from "../renderizado/dibujante";
import { Punto } from "../tipos/tipos";
import { Tiempo } from "./tiempo";

export class Composicion {

    /**Herramienta Dibujante.*/
    dibujante: Dibujante;
    /**Conjunto de cuerpos sobre los que trabaja la composición.*/
    cuerpos: Cuerpo[] = []
    /**Conjunto de formas sobre las que trabaja la composición.*/
    formas: Forma[] = [];
    cuadricula!: Cuadricula;
    tiempo!: Tiempo;
    contenedores: Contenedor[] = [];
    private _entorno: Entorno | undefined = undefined;
    fps: number = 60;

    usarfpsNativos: boolean = false;
    tick: number = 50;

    /**Si es "true" la animación se ejecuta, si es "false" se pausa.*/
    animar: boolean = true;
    /**El id del proceso que está ejecutando la animación.*/
    private _idFuncionAnimationFrame?: number;
    nivelesQuadTree: number = 8;
    trazarQuadTree: boolean = false;


    private constructor(opciones: { canvas?: HTMLCanvasElement, idCanvas?: string }) {
        if (opciones.canvas) {
            this.dibujante = Dibujante.crearConCanvas(opciones.canvas);
        }
        else {
            this.dibujante = Dibujante.crearConIdCanvas(opciones.idCanvas!);
        }
    }

    /**Retorna el canvas sobre el que se creó la Composición.*/
    get canvas(): HTMLCanvasElement {
        return this.dibujante.canvas;
    }

    /**Retorna la medida horizontal del canvas.*/
    get anchoCanvas(): number {
        return this.dibujante.anchoCanvas;
    }

    /**Retorna la media vertical del canvas. */
    get altoCanvas(): number {
        return this.dibujante.altoCanvas;
    }

    /**Retorna un punto ubicado en el centro del canvas.*/
    get centroCanvas(): Punto {
        return { x: this.dibujante.anchoCanvas / 2, y: this.dibujante.altoCanvas / 2 };
    }

    /**Retorna el color del canvas.*/
    get colorCanvas(): string | undefined {
        return this.dibujante.colorCanvas
    }

    /**Modifica la medida horizontal del canvas.*/
    set anchoCanvas(ancho: number) {
        this.dibujante.anchoCanvas = ancho;
    }

    /**Modifica la medida vertical del canvas. */
    set altoCanvas(alto: number) {
        this.dibujante.altoCanvas = alto;
    }

    /**Modifica el color del canvas.*/
    set colorCanvas(color: string) {
        this.dibujante.colorCanvas = color;
    }

    set entorno(entorno: Entorno) {
        this._entorno = entorno;
    }

    get entorno(): Entorno {
        return this._entorno!;
    }

    /**Retorna un objeto de tipo Composicion a partir del id de un canvas.*/
    static crearConIdDelCanvas(idCanvas: string): Composicion {
        const nuevaCompo: Composicion = new Composicion({ idCanvas: idCanvas })
        return nuevaCompo;
    }

    /**Retorna un objeto de tipo Composicion a partir de un canvas.*/
    static crearConCanvas(canvas: HTMLCanvasElement): Composicion {
        const nuevaCompo: Composicion = new Composicion({ canvas: canvas });
        return nuevaCompo;
    }


    /**Define el ancho y el alto del canvas, en pixeles. */
    tamanoCanvas(ancho: number, alto: number) {
        this.dibujante.anchoCanvas = ancho;
        this.dibujante.altoCanvas = alto;
    }

    /**Agrega cuerpos al conjunto de cuerpos manipulados por la composición. */
    agregarCuerpos(...cuerpos: Cuerpo[]): void {
        this.cuerpos.push(...cuerpos);
    }

    /**Actualiza la posición del conjunto de cuerpos sumando la velocidad instantánea a la posición.*/
    moverCuerpos() {
        this.cuerpos.forEach((cuerpo) => cuerpo.mover())
    }

    /**Calcula la colisión entre los cuerpos de la composición y resuelve sus choques como choques elásticos.*/
    reboteElasticoCuerpos() {
        // Interaccion.reboteEntreCuerpos(this.cuerpos)
        let niveles: number = this.nivelesQuadTree;
        let capacidad: number = Math.ceil(this.cuerpos.length / (2 ** niveles))
        const Quad: QuadTree = new QuadTree(0, 0, this.dibujante.anchoCanvas, this.dibujante.altoCanvas, capacidad, niveles);
        for (let cuerpo of this.cuerpos) {
            Quad.insertarPunto(cuerpo.posicion, cuerpo)
        }
        Quad.reboteEslasticoCuerpos()
        if (this.trazarQuadTree) {
            Quad.trazar(this.dibujante, { colorTrazo: 'skyblue' })
        }
    }

    /**Calcula la colisión entre los cuerpos de la composición y evita que los cuerpos se solapen.*/
    contactoSimpleCuerpos() {
        // Interaccion.contactoSimple(this.cuerpos)
        let niveles: number = 9;
        let capacidad: number = Math.ceil(this.cuerpos.length / (2 ** niveles))
        const Quad: QuadTree = new QuadTree(0, 0, this.dibujante.anchoCanvas, this.dibujante.altoCanvas, capacidad, niveles);
        for (let cuerpo of this.cuerpos) {
            Quad.insertarPunto(cuerpo.posicion, cuerpo)
        }
        Quad.contactoSimpleCuerpos()
        if (this.trazarQuadTree) {
            Quad.trazar(this.dibujante, { colorTrazo: 'skybule' })
        }
    }

    /**Método gráfico. Pinta el interior de los cuerpos de la composición en el canvas.*/
    rellenarCuerpos() {
        this.dibujante.rellenarFormas(this.cuerpos)
    }

    /**Método gráfico. Traza los cuerpos de la composición en el canvas.*/
    trazarCuerpos() {
        this.dibujante.trazarFormas(this.cuerpos)
    }

    /**Método gráfico. Pinta y/o rellena los cuerpos de la composición, según lo definido para cada cuerpo.*/
    dibujarCuerpos() {
        this.dibujante.dibujarFormas(this.cuerpos)
    }

    /**Método gráfico. Pinta y/o rellena las formas de la composición, según lo definido para cada forma.*/
    dibujarFormas() {
        this.dibujante.dibujarFormas(this.formas)
    }

    /**Crea un loop para ejecutar dos funciones, una asociada a la duración de cada tick y otra a los fps.          
     * El atributo .tick permite cambiar su duración en milisegundos.       
     * La propiedad .fps permite ajustar su número.         
     */
    animacion(funcionCalcular: () => void, funciondibujar: () => void): void {
        let tiempoCalculo: Tiempo = new Tiempo()
        let tiempoFrame: Tiempo = new Tiempo()

        const funcionAnimar = () => {
            if (this.animar && !this.usarfpsNativos) {
                tiempoCalculo.iterarPorSegundo(funcionCalcular, 1000 / this.tick)
                tiempoFrame.iterarPorSegundo(funciondibujar, this.fps)
            } else if (this.animar && this.usarfpsNativos) {
                tiempoCalculo.iterarPorSegundo(funcionCalcular, 1000 / this.tick)
                funciondibujar();
            }
            this._idFuncionAnimationFrame = requestAnimationFrame(funcionAnimar)
        }
        funcionAnimar()
    }


    bordesEntornoInfinitos(entorno: Entorno) {
        this.cuerpos.forEach((cuerpo) => {
            cuerpo.posicion = entorno.envolverBorde(cuerpo.posicion)
        })
    }

    limitarVelocidad(magnitudVelMaxima: number) {
        this.cuerpos.forEach((cuerpo) => {
            cuerpo.velocidad = Restriccion.limitarVelocidad(cuerpo, magnitudVelMaxima)
        })
    }

    /**Detiene definitivamente la animación en en curso.*/
    cancelarAnimacion(): void {
        if (this._idFuncionAnimationFrame) {
            cancelAnimationFrame(this._idFuncionAnimationFrame)
        }
    }
}