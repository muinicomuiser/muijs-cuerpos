import { Forma, Vector, Renderizado, Cuerpo, Fuerza, Geometria, Entorno, Composicion, Interaccion } from "../Fuente/mui.js";
// import { Punto } from "../Fuente/GeometriaPlana/Punto.js";
// import { Forma } from "../Fuente/GeometriaPlana/Formas.js";
// import { Vector } from "../Fuente/GeometriaPlana/Vector.js";
// import { Renderizado } from "../Fuente/Renderizado/Renderizado.js";
// import { Cuerpo } from "../Fuente/Fisicas/Cuerpo.js";
// import { Fuerza } from "../Fuente/Fisicas/Fuerza.js";
// import { Geometria } from "../Fuente/Utiles/Geometria.js";
// import { Entorno } from "../Fuente/Interaccion/Entorno.js";
// import { Composicion } from "../Fuente/Composicion/Composicion.js";
// import { Interaccion } from "../Fuente/Interaccion/Interaccion.js";
/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/
const CANVAS = document.getElementById("canvas");
CANVAS.width = 850;
CANVAS.height = 680;
//CONSTANTES
const CENTROCANVAS = { x: CANVAS.width / 2, y: CANVAS.height / 2 };
const RADIOFORMAGENERADORA = 100;
const RADIOENTORNO = 250;
const LADOSENTORNO = 6;
const NUMEROCUERPOS = 30;
const RADIOCUERPO = 10;
let COLORCUERPO = Renderizado.colorHSL(220, 0, 100);
let COLORFONDO = Renderizado.colorHSL(220, 100, 0);
////////////////
CANVAS.style.backgroundColor = COLORFONDO;
window.addEventListener("load", () => {
    let cuerpoEntorno = Cuerpo.poligono(CENTROCANVAS.x, CENTROCANVAS.y, LADOSENTORNO, RADIOENTORNO);
    let entorno = new Entorno(CANVAS, cuerpoEntorno);
    let dibu = new Renderizado(CANVAS);
    dibu.colorFondo = COLORFONDO;
    dibu.grosorTrazo = 3;
    /**Forma generadora de posiciones.*/
    let formaGeneradora = Forma.poligono(CENTROCANVAS.x, CENTROCANVAS.y, NUMEROCUERPOS, RADIOFORMAGENERADORA);
    /**Cuerpos.*/
    let cuerpos = [];
    for (let i = 0; i < NUMEROCUERPOS; i++) {
        let cuerpito = Cuerpo.circunferencia(formaGeneradora.verticesTransformados[i].x, formaGeneradora.verticesTransformados[i].y, RADIOCUERPO);
        cuerpito.color = COLORCUERPO;
        // cuerpito.velocidad = Vector.crear(Matematica.aleatorio(-1, 1), Matematica.aleatorio(-1, 1));
        cuerpos.push(cuerpito);
    }
    let circulo = Cuerpo.circunferencia(CENTROCANVAS.x, CENTROCANVAS.y * 1.2, 80);
    circulo.fijo = true;
    circulo.rotacion = Geometria.PI_MEDIO;
    circulo.color = "skyblue";
    cuerpos.push(circulo);
    let cuerpoAtractor = Cuerpo.circunferencia(CENTROCANVAS.x, CENTROCANVAS.y * 1.9, 5);
    cuerpoAtractor.color = "white";
    console.log(cuerpoEntorno.verticesTransformados);
    entorno.cuerpo.color = "skyblue";
    requestAnimationFrame(animar);
    function animar() {
        animacion();
        function animacion() {
            dibu.limpiarCanvas();
            // for(let cuerpito of cuerpos){
            //     cuerpito.posicion = entorno.envolverBorde(cuerpito.posicion);
            // }
            for (let cuerpito of cuerpos) {
                cuerpito.aceleracion = Fuerza.atraer(cuerpito, cuerpoAtractor, 0.05);
                // cuerpito.aceleracion = Fuerza.repelerDeVector(cuerpito, Vector.crear(CENTROCANVAS.x, CENTROCANVAS.y), 0.02);
                cuerpito.velocidad = Vector.escalar(cuerpito.velocidad, 0.99);
                if (cuerpito.velocidad.magnitud < 0.005) {
                    cuerpito.velocidad = Vector.cero();
                }
            }
            cuerpoAtractor.rotarSegunPunto(CENTROCANVAS, Geometria.gradoARadian(0.5));
            let velocidades = [];
            cuerpos.forEach((cuerpo) => velocidades.push(Vector.clonar(cuerpo.velocidad)));
            let aceleraciones = [];
            cuerpos.forEach((cuerpo) => aceleraciones.push(Vector.clonar(cuerpo.aceleracion)));
            // circulo.rotar(Geometria.gradoARadian(-0.4))
            cuerpos = entorno.rebotarConBorde(cuerpos);
            cuerpos = Composicion.actualizarMovimientoCuerpos(cuerpos);
            cuerpos = Interaccion.reboteEntreCuerpos(cuerpos);
            cuerpoAtractor.rellenar(dibu);
            circulo.rotarSegunPunto(CENTROCANVAS, -0.01);
            circulo.trazar(dibu);
            // entorno.cuerpo.rotar(Geometria.gradoARadian(-0.4));
            dibu.trazar(entorno.cuerpo);
            dibu.trazarFormas(cuerpos);
            // dibu.trazarNormales(entorno.cuerpo);
            // dibu.escribir((`${tiempoFinal - tiempoInicio}` + " milisegundos"), 20, 20, 12, 2, "left")
        }
        requestAnimationFrame(animar);
    }
    animar();
});
