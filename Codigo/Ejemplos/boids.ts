import { Matematica } from "../Fuente/Utiles/Matematica.js";
import { Punto } from "../Fuente/GeometriaPlana/Punto.js";
import { Forma } from "../Fuente/GeometriaPlana/Formas.js";
import { Vector } from "../Fuente/GeometriaPlana/Vector.js";
import { Dibujante } from "../Fuente/Renderizado/Dibujante.js";
import { Cuerpo } from "../Fuente/Fisicas/Cuerpo.js";
import { Fuerza } from "../Fuente/Fisicas/Fuerza.js";
import { Colision } from "../Fuente/Interaccion/Colision.js";
import { Geometria } from "../Fuente/Utiles/Geometria.js";

/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/

const CANVAS: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
const CONTEXT: CanvasRenderingContext2D = CANVAS.getContext("2d")!;
CANVAS.width = 950;
CANVAS.height = 680;
CANVAS.style.backgroundColor = Dibujante.colorHSL(220, 70, 0);
let centroCanvas: Punto = {x:CANVAS.width/2, y: CANVAS.height/2};

window.addEventListener("load", ()=>{
    //CONSTANTES
    let numerotriangulos: number = 220;
    let escala: number = 4;
    let velMaxima: number = 1.2;
    
    let distanciaRepeler: number = 10;
    let fuerzaRepeler: number = 1.2;
    
    let distanciaCoordinar: number = 120;
    let factorCoordinacion: number = 1.2;
    ////////////////
    
    let dibu: Dibujante = new Dibujante(CONTEXT)
    dibu.colorFondo = "black"
    /**Forma generadora de posiciones.*/
    let formaGeneradora: Forma = Forma.poligono(centroCanvas.x, centroCanvas.y, numerotriangulos, 280);
    /**Generador de círculos.*/
    let triangulos: Cuerpo[] = [];
    let verticesTriangulos = [Vector.crear(3, 0), Vector.crear(-1, -1), Vector.crear(0, 0), Vector.crear(-1, 1)]
    for(let i: number = 0; i < numerotriangulos; i++){
        let triangulo: Cuerpo = Cuerpo.poligono(formaGeneradora.verticesTransformados[i].x, formaGeneradora.verticesTransformados[i].y, 3, 5);
        let velocidadInicial: Vector = Vector.crear(Matematica.aleatorio(-0.3, 0.3), Matematica.aleatorio(-0.3, 0.3));
        triangulo.vertices = verticesTriangulos;
        triangulo.posicion = formaGeneradora.verticesTransformados[i]
        triangulo.velocidad = velocidadInicial;
        triangulo.escala = escala;
        triangulo.rotarSegunVelocidad = true;
        triangulo.color = Dibujante.colorHSL(220, 0, 100);
        triangulos.push(triangulo);
    }

    /**Límites infinitos.*/
    function envolverBorde(vector: Vector): Vector{
        let x: number = vector.x;
        let y: number = vector.y;
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

    
    /**Prueba de tiempo.*/
    function tiempoProceso(): void{
        let tiempoInicio: number = Date.now();

        for(let i: number = 0; i < triangulos.length-1; i++){
            for(let j: number = i+1; j < triangulos.length; j++){
                let distancia: number = Geometria.distanciaEntrePuntos(triangulos[i].posicion, triangulos[j].posicion);
                if(distancia < distanciaCoordinar){
                    if(distancia < distanciaRepeler){
                        triangulos[i].aceleracion = Fuerza.repeler(triangulos[i], triangulos[j], fuerzaRepeler*(1/distancia))
                        triangulos[j].aceleracion = Vector.invertir(triangulos[i].aceleracion)
                    }
                    let velI: Vector = triangulos[i].velocidad;
                    triangulos[i].velocidad = Vector.suma(triangulos[i].velocidad, Vector.escalar(triangulos[j].velocidad, factorCoordinacion*(1/distancia)))
                    triangulos[j].velocidad = Vector.suma(triangulos[j].velocidad, Vector.escalar(velI, factorCoordinacion*(1/distancia)))
                }
                let magnitudI: number = triangulos[i].velocidad.magnitud
                let magnitudJ: number = triangulos[j].velocidad.magnitud
                if(magnitudI > velMaxima){
                    triangulos[i].velocidad = Vector.escalar(triangulos[i].velocidad, (velMaxima/magnitudI))
                }
                if(magnitudJ > velMaxima){
                    triangulos[j].velocidad = Vector.escalar(triangulos[j].velocidad, (velMaxima/magnitudJ))
                }
            }
        }
        /**Dibujar círculos.*/
        for(let triangulo of triangulos){
            triangulo.posicion = envolverBorde(triangulo.posicion);
            for(let vertice of triangulo.verticesTransformados){
                vertice = envolverBorde(vertice)
            }            
            triangulo.mover()
            triangulo.trazar(dibu);
        }
        let tiempoFinal: number = Date.now();
        console.log((`${tiempoFinal - tiempoInicio}` + " milisegundos"));
    }
    tiempoProceso();


    function animar(){
        dibu.limpiarCanvas(CANVAS)

        
        for(let i: number = 0; i < triangulos.length-1; i++){
            for(let j: number = i+1; j < triangulos.length; j++){
                let distancia: number = Geometria.distanciaEntrePuntos(triangulos[i].posicion, triangulos[j].posicion);
                if(distancia < distanciaCoordinar){
                    if(distancia < distanciaRepeler){
                        triangulos[i].aceleracion = Fuerza.repeler(triangulos[i], triangulos[j], fuerzaRepeler*(1/distancia))
                        triangulos[j].aceleracion = Vector.invertir(triangulos[i].aceleracion)
                    }
                    let velI: Vector = triangulos[i].velocidad;
                    triangulos[i].velocidad = Vector.suma(triangulos[i].velocidad, Vector.escalar(triangulos[j].velocidad, factorCoordinacion*(1/distancia)))
                    triangulos[j].velocidad = Vector.suma(triangulos[j].velocidad, Vector.escalar(velI, factorCoordinacion*(1/distancia)))
                }
                let magnitudI: number = triangulos[i].velocidad.magnitud
                let magnitudJ: number = triangulos[j].velocidad.magnitud
                if(magnitudI > velMaxima){
                    triangulos[i].velocidad = Vector.escalar(triangulos[i].velocidad, (velMaxima/magnitudI))
                }
                if(magnitudJ > velMaxima){
                    triangulos[j].velocidad = Vector.escalar(triangulos[j].velocidad, (velMaxima/magnitudJ))
                }
            }
        }
        /**Dibujar círculos.*/
        for(let triangulo of triangulos){
            // for(let vertice of triangulo.verticesTransformados){
            //     vertice = envolverBorde(vertice)
            // }
            triangulo.posicion = envolverBorde(triangulo.posicion);
            triangulo.mover()
            triangulo.trazar(dibu);
        }
        requestAnimationFrame(animar);
    }
    animar()
})

function contador(): void{
    let tiempoInicio: number = Date.now();
    let tiempoFinal: number = Date.now();
    console.log((`${tiempoFinal - tiempoInicio}` + " milisegundos"));
}