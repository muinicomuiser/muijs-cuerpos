import { Geometria, Punto, Forma, Vector, Renderizado, Cuerpo, Fuerza, Restriccion, Entorno, Matematica, ManejadorEventos, Composicion, Dibujante, Interaccion } from "../Fuente/mui.js";

//Archivo estandar para iniciar pruebas del módulo

//CONSTANTES
const COLORFONDO: string = Renderizado.colorHSL(220, 50, 0);
const DIBU: Renderizado = Renderizado.crearPorIdCanvas('canvas')
DIBU.anchoCanvas = 800;
DIBU.altoCanvas = 600;
DIBU.colorFondo = COLORFONDO;




window.addEventListener("load", () => {
    //Colores
    const COLORPROTAGONISTA: string = Renderizado.colorHSL(200, 100, 50);
    const COLORSECUNDARIOS: string = Renderizado.colorHSL(280, 100, 50);

    //Cuerpos
    let cuerpoProtagonista: Cuerpo = Cuerpo.rectangulo(DIBU.centroCanvas.x, DIBU.centroCanvas.y, 30, 30, { colorRelleno: COLORPROTAGONISTA, rellenada: true, trazada: false })
    let puntaProtagonista: Cuerpo = Cuerpo.poligono(50, 50, 3, 30)

    function crearSecundarios(numeroCuerpos: number, radioEsparcimiento: number): Cuerpo[] {
        let formaGeneradora: Forma = Forma.poligono(DIBU.centroCanvas.x, DIBU.centroCanvas.y, numeroCuerpos, radioEsparcimiento)
        let cuerpos: Cuerpo[] = []
        for (let i: number = 0; i < formaGeneradora.lados; i++) {
            cuerpos.push(Cuerpo.circunferencia(formaGeneradora.verticesTransformados[i].x, formaGeneradora.verticesTransformados[i].y, 18, { colorRelleno: COLORSECUNDARIOS, trazada: true, rellenada: false }))
        }
        return cuerpos;
    }
    let cuerposSecundarios: Cuerpo[] = crearSecundarios(20, 200);
    let cuerposSecundariosDos: Cuerpo[] = crearSecundarios(40, 300);
    let cuerposSecundariosTres: Cuerpo[] = crearSecundarios(40, 400);
    cuerposSecundarios.push(...cuerposSecundariosDos, ...cuerposSecundariosTres)
    cuerpoProtagonista.controles.rapidez = 10
    let entorno: Entorno = Entorno.crearEntornoCanvas(DIBU.canvas)
    entorno.cuerpo.colorTrazo = 'white'
    entorno.cuerpo.trazada = true
    entorno.cuerpo.rellenada = false

    //Control
    ManejadorEventos.eventoKeydown('ArrowUp', () => cuerpoProtagonista.controles.arriba = true)
    ManejadorEventos.eventoKeydown('ArrowDown', () => cuerpoProtagonista.controles.abajo = true)
    ManejadorEventos.eventoKeydown('ArrowLeft', () => cuerpoProtagonista.controles.rotarIzquierda = true)
    ManejadorEventos.eventoKeydown('ArrowRight', () => cuerpoProtagonista.controles.rotarDerecha = true)
    ManejadorEventos.eventoKeyup('ArrowUp', () => cuerpoProtagonista.controles.arriba = false)
    ManejadorEventos.eventoKeyup('ArrowDown', () => cuerpoProtagonista.controles.abajo = false)
    ManejadorEventos.eventoKeyup('ArrowLeft', () => cuerpoProtagonista.controles.rotarIzquierda = false)
    ManejadorEventos.eventoKeyup('ArrowRight', () => cuerpoProtagonista.controles.rotarDerecha = false)

    function animar() {
        DIBU.limpiarCanvas()
        Composicion.actualizarMovimientoCuerpos(...cuerposSecundarios);
        cuerpoProtagonista.controlar()
        Interaccion.reboteEntreCuerpos([cuerpoProtagonista, ...cuerposSecundarios])
        Interaccion.reboteEntreCuerpos([puntaProtagonista, ...cuerposSecundarios])
        entorno.rebotarConBorde([cuerpoProtagonista, ...cuerposSecundarios, puntaProtagonista])
        puntaProtagonista.rotacion = cuerpoProtagonista.rotacion + Geometria.PI_MEDIO / 3
        puntaProtagonista.posicion = Vector.suma(cuerpoProtagonista.posicion, Vector.escalar(Vector.normalizar(cuerpoProtagonista.normales[0]), cuerpoProtagonista.apotema))
        DIBU.renderizarFormas([cuerpoProtagonista, ...cuerposSecundarios, entorno.cuerpo, puntaProtagonista])
        requestAnimationFrame(animar);
    }
    requestAnimationFrame(animar)
})
