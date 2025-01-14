//Junta los cuerpos, interacciones, entorno, casos límite y renderizado.
//Debería estar acá la creación de canvas y contexto??
import { QuadTree } from "../Interaccion/QuadTree.js";
import { Restriccion } from "../Interaccion/Restriccion.js";
import { Renderizado } from "../Renderizado/Renderizado.js";
import { Tiempo } from "./Tiempo.js";
export class Composicion {
    constructor(canvas, idCanvas) {
        /**Conjunto de cuerpos sobre los que trabaja la composición.*/
        this.cuerpos = [];
        /**Conjunto de formas sobre las que trabaja la composición.*/
        this.formas = [];
        this.contenedores = [];
        this._entorno = undefined;
        this.fps = 60;
        this.usarfpsNativos = false;
        this.tick = 50;
        this.animar = true;
        this.nivelesQuadTree = 8;
        this.trazarQuadTree = false;
        if (canvas) {
            this.render = Renderizado.crearConCanvas(canvas);
        }
        else {
            this.render = Renderizado.crearConIdCanvas(idCanvas);
        }
    }
    set entorno(entorno) {
        this._entorno = entorno;
    }
    get entorno() {
        return this._entorno;
    }
    /**Retorna un objeto de tipo Composicion a partir del id de un canvas.*/
    static crearConIDCanvas(idCanvas) {
        const nuevaCompo = new Composicion(undefined, idCanvas);
        return nuevaCompo;
    }
    /**Retorna un objeto de tipo Composicion a partir de un canvas.*/
    static crearConCanvas(canvas) {
        const nuevaCompo = new Composicion(canvas);
        return nuevaCompo;
    }
    /**Define el ancho y el alto del canvas, en pixeles. */
    tamanoCanvas(ancho, alto) {
        this.render.anchoCanvas = ancho;
        this.render.altoCanvas = alto;
    }
    /**Agrega cuerpos al conjunto de cuerpos manipulados por la composición. */
    agregarCuerpos(...cuerpos) {
        this.cuerpos.push(...cuerpos);
    }
    /**Actualiza la posición del conjunto de cuerpos sumando la velocidad instantánea a la posición.*/
    moverCuerpos() {
        this.cuerpos.forEach((cuerpo) => cuerpo.mover());
    }
    /**Calcula la colisión entre los cuerpos de la composición y resuelve sus choques como choques elásticos.*/
    reboteElasticoCuerpos() {
        // Interaccion.reboteEntreCuerpos(this.cuerpos)
        let niveles = this.nivelesQuadTree;
        let capacidad = Math.ceil(this.cuerpos.length / (Math.pow(2, niveles)));
        const Quad = new QuadTree(0, 0, this.render.anchoCanvas, this.render.altoCanvas, capacidad, niveles);
        for (let cuerpo of this.cuerpos) {
            Quad.insertarPunto(cuerpo.posicion, cuerpo);
        }
        Quad.reboteEslasticoCuerpos();
        if (this.trazarQuadTree) {
            Quad.trazar(this.render, { colorTrazo: 'skyblue' });
        }
    }
    /**Calcula la colisión entre los cuerpos de la composición y evita que los cuerpos se solapen.*/
    contactoSimpleCuerpos() {
        // Interaccion.contactoSimple(this.cuerpos)
        let niveles = 9;
        let capacidad = Math.ceil(this.cuerpos.length / (Math.pow(2, niveles)));
        const Quad = new QuadTree(0, 0, this.render.anchoCanvas, this.render.altoCanvas, capacidad, niveles);
        for (let cuerpo of this.cuerpos) {
            Quad.insertarPunto(cuerpo.posicion, cuerpo);
        }
        Quad.contactoSimpleCuerpos();
        if (this.trazarQuadTree) {
            Quad.trazar(this.render, { colorTrazo: 'skybule' });
        }
    }
    /**Método gráfico. Pinta el interior de los cuerpos de la composición en el canvas.*/
    rellenarCuerpos() {
        this.render.rellenarFormas(this.cuerpos);
    }
    /**Método gráfico. Traza los cuerpos de la composición en el canvas.*/
    trazarCuerpos() {
        this.render.trazarFormas(this.cuerpos);
    }
    /**Método gráfico. Pinta y/o rellena los cuerpos de la composición, según lo definido para cada cuerpo.*/
    renderizarCuerpos() {
        this.render.renderizarFormas(this.cuerpos);
    }
    /**Método gráfico. Pinta y/o rellena las formas de la composición, según lo definido para cada forma.*/
    renderizarFormas() {
        this.render.renderizarFormas(this.formas);
    }
    /**Crea un loop para ejecutar dos funciones, una asociada a la duración de cada tick y otra a los fps.
     * El atributo .tick permite cambiar su duración en milisegundos.
     * La propiedad .fps permite ajustar su número.
     */
    animacion(funcionCalcular, funcionRenderizar) {
        let tiempoCalculo = new Tiempo();
        let tiempoFrame = new Tiempo();
        const funcionAnimar = () => {
            if (this.animar && !this.usarfpsNativos) {
                tiempoCalculo.iterarPorSegundo(funcionCalcular, 1000 / this.tick);
                tiempoFrame.iterarPorSegundo(funcionRenderizar, this.fps);
            }
            else if (this.animar && this.usarfpsNativos) {
                tiempoCalculo.iterarPorSegundo(funcionCalcular, 1000 / this.tick);
                funcionRenderizar();
            }
            requestAnimationFrame(funcionAnimar);
        };
        funcionAnimar();
    }
    bordesEntornoInfinitos(entorno) {
        this.cuerpos.forEach((cuerpo) => {
            cuerpo.posicion = entorno.envolverBorde(cuerpo.posicion);
        });
    }
    limitarVelocidad(magnitudVelMaxima) {
        this.cuerpos.forEach((cuerpo) => {
            cuerpo.velocidad = Restriccion.limitarVelocidad(cuerpo, magnitudVelMaxima);
        });
    }
}
