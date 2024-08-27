import { Punto, Forma, Vector, Renderizado, Cuerpo, Fuerza, Geometria, Entorno, Composicion, Interaccion } from "../Fuente/mui.js";

/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/

const CANVAS: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");

CANVAS.width = window.innerWidth - 20 > 360 ? window.innerWidth - 20 : 360;
CANVAS.height = window.innerHeight - 20

//CONSTANTES
const CENTROCANVAS: Punto = {x:CANVAS.width/2, y: CANVAS.height/2};
const BORDEMENOR = CANVAS.width < CANVAS.height ? CANVAS.width : CANVAS.height

const LADOSENTORNO: number = 10;
let RADIOENTORNO: number = 250 < (BORDEMENOR) / 3 ? 250 : (BORDEMENOR) / 3;
RADIOENTORNO = 180 > RADIOENTORNO ? 180 : RADIOENTORNO;

const RADIOFORMAGENERADORA: number = RADIOENTORNO/2;

const NUMEROCUERPOS: number = 40;
const RADIOCUERPO: number = 8;

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
        cuerpito.colorTrazo = COLORCUERPO;
        // cuerpito.velocidad = Vector.crear(Matematica.aleatorio(-1, 1), Matematica.aleatorio(-1, 1));
        cuerpos.push(cuerpito);
    }
    let circulo: Cuerpo = Cuerpo.circunferencia(CENTROCANVAS.x, CENTROCANVAS.y*1.2, RADIOENTORNO/3)
    circulo.fijo = true;
    circulo.rotacion = Geometria.PI_MEDIO;
    cuerpos.push(circulo)
    
    let cuerpoAtractor: Cuerpo = Cuerpo.circunferencia(CENTROCANVAS.x, CENTROCANVAS.y + RADIOENTORNO + 20, 5);

    circulo.colorTrazo = "skyblue"
    cuerpoAtractor.colorTrazo = "white"
    entorno.cuerpo.colorTrazo = "skyblue"

    requestAnimationFrame(animar);
    function animar(){
        animacion()
        function animacion(): void{
            dibu.limpiarCanvas()

            for(let cuerpito of cuerpos){
                cuerpito.aceleracion = Fuerza.atraer(cuerpito, cuerpoAtractor, 0.05)
                // cuerpito.aceleracion = Fuerza.repelerDeVector(cuerpito, Vector.crear(CENTROCANVAS.x, CENTROCANVAS.y), 0.02);
                cuerpito.velocidad = Vector.escalar(cuerpito.velocidad, 0.99)
                if(cuerpito.velocidad.magnitud < 0.005){
                    cuerpito.velocidad = Vector.cero()
                }
            }

            cuerpoAtractor.rotarSegunPunto(CENTROCANVAS, Geometria.gradoARadian(0.5))

            // circulo.rotar(Geometria.gradoARadian(-0.4))
            cuerpos = entorno.rebotarConBorde(cuerpos)
            cuerpos = Composicion.actualizarMovimientoCuerpos(cuerpos);
            cuerpos = Interaccion.reboteEntreCuerpos(cuerpos);
            circulo.rotarSegunPunto(CENTROCANVAS, -0.01)
            // entorno.cuerpo.rotar(Geometria.gradoARadian(-0.4));

            cuerpoAtractor.rellenar(dibu)

            circulo.trazar(dibu)

            dibu.trazarFormas(cuerpos)

            dibu.trazar(entorno.cuerpo)
            // dibu.trazarNormales(entorno.cuerpo);
            // dibu.escribir((`${tiempoFinal - tiempoInicio}` + " milisegundos"), 20, 20, 12, 2, "left")
        }
        requestAnimationFrame(animar);
    }
    animar()
})


