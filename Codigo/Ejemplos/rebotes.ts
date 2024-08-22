import { Punto, Forma, Vector, Renderizado, Cuerpo, Fuerza, Geometria, Entorno, Composicion, Interaccion } from "../Fuente/mui.js";

/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/

const CANVAS: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
CANVAS.width = 850;
CANVAS.height = 680;

//CONSTANTES
const CENTROCANVAS: Punto = {x:CANVAS.width/2, y: CANVAS.height/2};

const RADIOFORMAGENERADORA: number = 100;

const RADIOENTORNO: number = 250;
const LADOSENTORNO: number = 6;

const NUMEROCUERPOS: number = 30;
const RADIOCUERPO: number = 10;

let COLORCUERPO: string = Renderizado.colorHSL(220, 0, 100);
let COLORFONDO: string = Renderizado.colorHSL(220, 100, 0);

////////////////

CANVAS.style.backgroundColor = COLORFONDO;
    
window.addEventListener("load", ()=>{
    
    let cuerpoEntorno: Cuerpo = Cuerpo.poligono(CENTROCANVAS.x, CENTROCANVAS.y, LADOSENTORNO, RADIOENTORNO);
    let entorno: Entorno = new Entorno(CANVAS, cuerpoEntorno);
    let dibu: Renderizado = new Renderizado(CANVAS)
    dibu.colorFondo = COLORFONDO;
    dibu.grosorTrazo = 3;
    /**Forma generadora de posiciones.*/
    let formaGeneradora: Forma = Forma.poligono(CENTROCANVAS.x, CENTROCANVAS.y, NUMEROCUERPOS, RADIOFORMAGENERADORA);
    
    /**Cuerpos.*/
    let cuerpos: Cuerpo[] = [];
    for(let i:number = 0; i < NUMEROCUERPOS; i++){
        let cuerpito: Cuerpo = Cuerpo.circunferencia(formaGeneradora.verticesTransformados[i].x, formaGeneradora.verticesTransformados[i].y, RADIOCUERPO);
        cuerpito.color = COLORCUERPO;
        // cuerpito.velocidad = Vector.crear(Matematica.aleatorio(-1, 1), Matematica.aleatorio(-1, 1));
        cuerpos.push(cuerpito);
    }
    let circulo: Cuerpo = Cuerpo.circunferencia(CENTROCANVAS.x, CENTROCANVAS.y*1.2, 80)
    circulo.fijo = true;
    circulo.rotacion = Geometria.PI_MEDIO;
    circulo.color = "skyblue"
    cuerpos.push(circulo)
    let cuerpoAtractor: Cuerpo = Cuerpo.circunferencia(CENTROCANVAS.x, CENTROCANVAS.y*1.9, 5);
    cuerpoAtractor.color = "white"
    console.log(cuerpoEntorno.verticesTransformados)
    entorno.cuerpo.color = "skyblue"
    requestAnimationFrame(animar);
    function animar(){
        animacion()
        function animacion(): void{
            dibu.limpiarCanvas()
            // for(let cuerpito of cuerpos){
            //     cuerpito.posicion = entorno.envolverBorde(cuerpito.posicion);
            // }
            for(let cuerpito of cuerpos){
                cuerpito.aceleracion = Fuerza.atraer(cuerpito, cuerpoAtractor, 0.05)
                // cuerpito.aceleracion = Fuerza.repelerDeVector(cuerpito, Vector.crear(CENTROCANVAS.x, CENTROCANVAS.y), 0.02);
                cuerpito.velocidad = Vector.escalar(cuerpito.velocidad, 0.99)
                if(cuerpito.velocidad.magnitud < 0.005){
                    cuerpito.velocidad = Vector.cero()
                }
            }
            cuerpoAtractor.rotarSegunPunto(CENTROCANVAS, Geometria.gradoARadian(0.5))

            let velocidades: Vector[] = []
            cuerpos.forEach((cuerpo)=> velocidades.push(Vector.clonar(cuerpo.velocidad)))
            let aceleraciones: Vector[] = []
            cuerpos.forEach((cuerpo)=> aceleraciones.push(Vector.clonar(cuerpo.aceleracion)))
            // circulo.rotar(Geometria.gradoARadian(-0.4))
            cuerpos = entorno.rebotarConBorde(cuerpos)
            cuerpos = Composicion.actualizarMovimientoCuerpos(cuerpos);
            cuerpos = Interaccion.reboteEntreCuerpos(cuerpos);
            cuerpoAtractor.rellenar(dibu)
            circulo.rotarSegunPunto(CENTROCANVAS, -0.01)
            circulo.trazar(dibu)
            // entorno.cuerpo.rotar(Geometria.gradoARadian(-0.4));
            dibu.trazar(entorno.cuerpo)
            dibu.trazarFormas(cuerpos)
            // dibu.trazarNormales(entorno.cuerpo);
            // dibu.escribir((`${tiempoFinal - tiempoInicio}` + " milisegundos"), 20, 20, 12, 2, "left")
        }
        requestAnimationFrame(animar);
    }
    animar()
})


