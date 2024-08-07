import { Matematica } from "../Fuente/Utiles/Matematica.js";
import { Matriz } from "../Fuente/Utiles/Matrices.js";
import { Punto } from "../Fuente/GeometriaPlana/Punto.js";
import { Forma } from "../Fuente/GeometriaPlana/Formas.js";
import { Vector } from "../Fuente/GeometriaPlana/Vector.js";
import { Dibujante } from "../Fuente/Renderizado/Dibujante.js";
import { Cuerpo } from "../Fuente/Fisicas/Cuerpo.js";
import { Fuerza } from "../Fuente/Fisicas/Fuerza.js";
import { Colision } from "../Fuente/Interaccion/Colision.js";

/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/

const CANVAS: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
const CONTEXT: CanvasRenderingContext2D = CANVAS.getContext("2d")!;
CANVAS.width = 950;
CANVAS.height = 680;
CANVAS.style.backgroundColor = Dibujante.colorHSL(220, 70, 0);
let centroCanvas: Punto = {x:CANVAS.width/2, y: CANVAS.height/2};

window.addEventListener("load", ()=>{
    let dibu: Dibujante = new Dibujante(CONTEXT)

    let numerotriangulos: number = 60;
    /**Forma generadora de posiciones.*/
    let formaGeneradora: Forma = Forma.poligono(centroCanvas.x, centroCanvas.y, numerotriangulos, 250);
    /**Generador de círculos.*/
    let triangulos: Cuerpo[] = [];
    let verticesTriangulos = [Vector.crear(3, 0), Vector.crear(-1, -1), Vector.crear(0, 0), Vector.crear(-1, 1)]
    for(let i: number = 0; i < numerotriangulos; i++){
        let triangulo: Cuerpo = Cuerpo.poligono(formaGeneradora.verticesTransformados[i].x, formaGeneradora.verticesTransformados[i].y, 3, 5);
        let velocidadInicial: Vector = Vector.crear(Matematica.aleatorioEntero(-1, 1), Matematica.aleatorioEntero(-1, 1));
        triangulo.vertices = verticesTriangulos;
        // triangulo.posicion = formaGeneradora.verticesTransformados[i]
        triangulo.velocidad = velocidadInicial;
        triangulo.escala = 3;
        triangulo.rotarSegunVelocidad = true;
        triangulos.push(triangulo);
    }

    /**Límites infinitos.*/
    function envolverBorde(cuerpo: Cuerpo): Vector{
        let x: number = cuerpo.posicion.x;
        let y: number = cuerpo.posicion.y;
        if(x > CANVAS.width){
            x -= CANVAS.width
        }
        if(x < 0){
            x += CANVAS.width
        }
        if(y > CANVAS.height){
            y -= CANVAS.height
        }
        if(y < 0){
            y += CANVAS.height
        }
        return Vector.crear(x, y)
    }

    function animar(){
        dibu.colorFondo = "black"
        dibu.limpiarCanvas(CANVAS)
        /**Interatracción e interrepulsión.*/
        for(let i: number = 0; i < triangulos.length; i++){
            for(let j: number = 0; j < triangulos.length; j++){
                if(i != j){
                    if(Matematica.distanciaEntrePuntos(triangulos[i].posicion, triangulos[j].posicion) > 30){
                        // triangulos[i].aceleracion = Fuerza.atraer(triangulos[i], triangulos[j], 0.01)
                    }
                    else{
                        triangulos[i].aceleracion = Fuerza.repeler(triangulos[i], triangulos[j], 0.03)
                    }
                }
            }
        }

        /**Coordinación de velocidades*/
        for(let i: number = 0; i < triangulos.length; i++){
            for(let j: number = 0; j < triangulos.length; j++){
                if(i != j){
                    if(Matematica.distanciaEntrePuntos(triangulos[i].posicion, triangulos[j].posicion) < 80){
                        triangulos[i].velocidad = Vector.suma(triangulos[i].velocidad, Vector.escalar(triangulos[j].velocidad, 0.01))
                    }
                }
            }
        }

        /**Dibujar círculos.*/
        for(let triangulo of triangulos){
            if(triangulo.velocidad.magnitud > 5){
                triangulo.velocidad = Vector.escalar(triangulo.velocidad, 0.8)
            }
            triangulo.posicion = envolverBorde(triangulo);
            triangulo.color = "white";
            triangulo.mover()
            triangulo.trazar(dibu);
        }
        requestAnimationFrame(animar);
    }
    animar()
})