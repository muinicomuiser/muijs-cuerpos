import { Contenedor } from "../Fuente/Fisicas/Contenedor.js";
import { Punto, Forma, Vector, Renderizado, Cuerpo, Fuerza, Geometria, Entorno, Composicion, Interaccion } from "../Fuente/mui.js";

/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/
const dibu: Renderizado = Renderizado.crearPorIdCanvas('canvas')
const COLORFONDO: string = Renderizado.colorHSL(220, 100, 0);
dibu.anchoCanvas = window.innerWidth - 20 > 360 ? window.innerWidth - 20 : 360;
dibu.altoCanvas = window.innerHeight - 20;
dibu.colorFondo = COLORFONDO;


//CONSTANTES
const BORDEMENOR = dibu.anchoCanvas < dibu.altoCanvas ? dibu.anchoCanvas : dibu.altoCanvas
const CENTROCANVAS: Punto = { x: dibu.anchoCanvas / 2, y: dibu.altoCanvas / 2 };

const LADOSENTORNO: number = 10;
let RADIOENTORNO: number = 200 < (BORDEMENOR) / 4 ? 200 : (BORDEMENOR) / 4;
RADIOENTORNO = 180 > RADIOENTORNO ? 180 : RADIOENTORNO;

const RADIOFORMAGENERADORA: number = RADIOENTORNO / 2;

const NUMEROCUERPOS: number = 15;
const RADIOCUERPO: number = 14;

let COLORCUERPO: string = Renderizado.colorHSL(220, 0, 100);

////////////////

window.addEventListener("load", () => {

    let cuerpoEntorno: Cuerpo = Cuerpo.poligono(CENTROCANVAS.x, CENTROCANVAS.y, LADOSENTORNO, RADIOENTORNO);
    let entorno: Contenedor = new Contenedor(cuerpoEntorno);
    dibu.grosorTrazo = 3;
    /**Forma generadora de posiciones.*/
    let formaGeneradora: Forma = Forma.poligono(CENTROCANVAS.x, CENTROCANVAS.y, NUMEROCUERPOS, RADIOFORMAGENERADORA);

    /**Cuerpos.*/
    let cuerpos: Cuerpo[] = [];
    for (let i: number = 0; i < NUMEROCUERPOS; i++) {
        let cuerpito: Cuerpo = Cuerpo.circunferencia(formaGeneradora.verticesTransformados[i].x, formaGeneradora.verticesTransformados[i].y, RADIOCUERPO);
        cuerpito.colorTrazo = COLORCUERPO;
        // cuerpito.velocidad = Vector.crear(Matematica.aleatorio(-1, 1), Matematica.aleatorio(-1, 1));
        cuerpos.push(cuerpito);
    }
    let circulo: Cuerpo = Cuerpo.circunferencia(CENTROCANVAS.x, CENTROCANVAS.y * (1 / 1.2), RADIOENTORNO / 4)
    let circuloDos: Cuerpo = Cuerpo.circunferencia(CENTROCANVAS.x, CENTROCANVAS.y * 1.2, RADIOENTORNO / 4)
    circulo.fijo = true;
    circulo.rotacion = Geometria.PI_MEDIO;
    circuloDos.fijo = true;
    circuloDos.rotacion = Geometria.PI_MEDIO;
    cuerpos.push(circulo, circuloDos)

    let cuerpoAtractor: Cuerpo = Cuerpo.circunferencia(CENTROCANVAS.x, CENTROCANVAS.y + RADIOENTORNO + 20, 8);

    circulo.colorTrazo = "skyblue"
    circuloDos.colorTrazo = "skyblue"
    cuerpoAtractor.colorTrazo = "white"
    entorno.cuerpo.colorTrazo = "skyblue"

    requestAnimationFrame(animar);
    function animar() {
        animacion()
        function animacion(): void {
            dibu.limpiarCanvas()
            entorno.cuerpo.rotar(0.005)
            for (let cuerpito of cuerpos) {
                cuerpito.aceleracion = Fuerza.atraer(cuerpito, cuerpoAtractor, 0.002)
                // cuerpito.aceleracion = Fuerza.repelerDeVector(cuerpito, Vector.crear(CENTROCANVAS.x, CENTROCANVAS.y), 0.02);
                cuerpito.velocidad = Vector.escalar(cuerpito.velocidad, 0.99)
                if (cuerpito.velocidad.magnitud < 0.00005) {
                    cuerpito.velocidad = Vector.cero()
                }
            }

            cuerpoAtractor.rotarSegunPunto(CENTROCANVAS, Geometria.gradoARadian(-0.5))

            // circulo.rotar(Geometria.gradoARadian(-0.4))
            for (let i: number = 0; i < 3; i++) {
                cuerpos = entorno.rebotarConBorde(cuerpos)
                cuerpos = Interaccion.reboteEntreCuerpos(cuerpos);
                cuerpos = Composicion.actualizarMovimientoCuerpos(...cuerpos);
            }
            circulo.rotarSegunPunto(CENTROCANVAS, -0.01)
            circuloDos.rotarSegunPunto(CENTROCANVAS, -0.01)
            // entorno.cuerpo.rotar(Geometria.gradoARadian(-0.4));

            cuerpoAtractor.rellenar(dibu)

            dibu.trazarFormas(cuerpos)

            dibu.trazar(entorno.cuerpo)
            // dibu.trazarNormales(entorno.cuerpo);
            // dibu.escribir((`${tiempoFinal - tiempoInicio}` + " milisegundos"), 20, 20, 12, 2, "left")
        }
        requestAnimationFrame(animar);
    }
    animar()
})


