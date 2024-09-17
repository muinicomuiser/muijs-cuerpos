import { Celda, Composicion, Cuadricula, ManejadorEventos, Renderizado } from "../Fuente/mui.js";

const CuadriculaJuego: Cuadricula = new Cuadricula(90, 160, 10, 2);
const COMPO: Composicion = Composicion.crearConIDCanvas('canvas');
const Render: Renderizado = COMPO.render;
Render.colorCanvas = 'black';
CuadriculaJuego.colorCeldas = 'white';
COMPO.tamanoCanvas(CuadriculaJuego.anchoCuadricula, CuadriculaJuego.altoCuadricula)

CuadriculaJuego.estadosCero();
// CuadriculaJuego.estadosAleatorios();

COMPO.tick = 1;
COMPO.usarfpsNativos = true
CuadriculaJuego.rellenarCeldas(Render);

// Grabador.grabarCanvas(Render.canvas, 100000, 60, 'descarga');
COMPO.animacion(() => juegoVida(), () => {
    Render.limpiarCanvas();
    CuadriculaJuego.rellenarCeldas(Render);
});

function nuevoFrame() {
    Render.limpiarCanvas();
    juegoVida();
    CuadriculaJuego.rellenarCeldas(Render);
};

//Solo falta cambiar el modo de pintar la celda.
//Que su color no se asigne según opacidad por estado, sino luminosidad por estado
function juegoVida(): void {
    const arregloEstados: [number, number][][] = []
    const celdas: Celda[] = []
    CuadriculaJuego.celdas.forEach((filas) =>
        filas.forEach(celda => {
            arregloEstados.push(CuadriculaJuego.estadosVecinosPorCelda(celda))
            celdas.push(celda)
        })
    )
    for (let i: number = 0; i < celdas.length; i++) {
        if (arregloEstados[i][1][1] > 3 || arregloEstados[i][1][1] < 2) {
            celdas[i].estado = 0;
        }

        else if (celdas[i].estado == 0 && arregloEstados[i][1][1] == 3) {
            celdas[i].estado = 1;
        }
    }
};

//Controles:
//P <- Para pausar y reanudar
//E <- Para matar todas las células
//A <- Estados aleatorios
//Espacio <- Para avanzar un frame
//Flechas arriba/abajo <- Para aumentar o disminuir los fps
//Click <- Para cambiar el estado de una célula

ManejadorEventos.eventoKeyup('p', () => { COMPO.animar = !COMPO.animar });
ManejadorEventos.eventoKeyup('a', () => {
    CuadriculaJuego.estadosAleatorios()
    CuadriculaJuego.rellenarCeldas(Render)

});
ManejadorEventos.eventoKeyup('e', () => {
    CuadriculaJuego.estadosCero()
    CuadriculaJuego.rellenarCeldas(Render)
});
ManejadorEventos.eventoKeyup('espacio', () => {
    nuevoFrame()
});
ManejadorEventos.eventoKeyup('abajo', () => {
    if (COMPO.tick >= 1) {
        if (COMPO.tick > 40) {
            COMPO.tick -= 5;
        }
        else if (COMPO.tick > 12) {
            COMPO.tick -= 2
        }
        else {
            COMPO.tick--
        }
    }
    console.log(COMPO.tick)
});
ManejadorEventos.eventoKeyup('arriba', () => {
    if (COMPO.tick < 60) {
        if (COMPO.tick >= 40) {
            COMPO.tick += 5;
        }
        else if (COMPO.tick >= 12) {
            COMPO.tick += 2
        }
        else {
            COMPO.tick++
        }
    }
    console.log(COMPO.tick)
});
ManejadorEventos.eventoMouseEnCanvas('click', Render.canvas, evento => {
    let mouseX: number = evento.pageX - Render.canvas.offsetLeft;
    let mouseY: number = evento.pageY - Render.canvas.offsetTop;
    let celda: Celda = CuadriculaJuego.celdaEnPosicionMouse(mouseX, mouseY);
    if (celda.estado == 0) {
        celda.estado = 1
    }
    else {
        celda.estado = 0
    }
    Render.estiloForma.opacidad = celda.estado / (CuadriculaJuego.estados - 1)
    celda.rellenar(Render)
});