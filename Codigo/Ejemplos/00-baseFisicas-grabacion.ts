import { Composicion, Cuerpo, Entorno, Forma, Fuerza, Renderizado, Restriccion } from "../Fuente/mui.js";

const COMPO: Composicion = new Composicion('canvas')
COMPO.tamanoCanvas(1080, 1080)
const Render: Renderizado = COMPO.render;
Render.colorCanvas = 'black'

//CUERPOS
//Formas generadoras
const RADIOGENERADORA: number = 320;
const RADIOGENERADORADOS: number = 160;
const NUMEROCUERPOS: number = 100;
const FormaGeneradora: Forma = Forma.poligono(Render.centroCanvas.x, Render.centroCanvas.y, NUMEROCUERPOS * 0.5, RADIOGENERADORA)
const FormaGeneradoraDos: Forma = Forma.poligono(Render.centroCanvas.x, Render.centroCanvas.y, NUMEROCUERPOS * 0.5, RADIOGENERADORADOS)

//Cuerpos
const RADIOCUERPO: number = 12;
const RADIOCUERPODOS: number = 6;
const Circunferencias: Cuerpo[] = []

FormaGeneradora.verticesTransformados.forEach((vertice) => {
    let circunferencia: Cuerpo = Cuerpo.circunferencia(vertice.x, vertice.y, RADIOCUERPO)
    circunferencia.opcionesGraficas.colorRelleno = 'pink'
    circunferencia.opcionesGraficas.colorTrazo = 'darkblue'
    Circunferencias.push(circunferencia);
})

FormaGeneradoraDos.verticesTransformados.forEach((vertice) => {
    let circunferencia: Cuerpo = Cuerpo.circunferencia(vertice.x, vertice.y, RADIOCUERPODOS)
    circunferencia.opcionesGraficas.colorRelleno = 'pink'
    circunferencia.opcionesGraficas.colorTrazo = 'darkblue'
    Circunferencias.push(circunferencia);
})


//cuerpo atractor
const MagnitudAtraccion: number = 0.08;
const RADIOATRACTOR: number = 60
const Atractor: Cuerpo = Cuerpo.circunferencia(Render.centroCanvas.x, Render.centroCanvas.y, RADIOATRACTOR)
Atractor.opcionesGraficas.colorRelleno = 'orange';
Atractor.opcionesGraficas.colorTrazo = 'purple';
Atractor.fijo = false;


//Se integran todos los cuerpos a la composición
COMPO.agregarCuerpos(...Circunferencias, Atractor);


//Frontera del canvas
const Frontera: Entorno = Entorno.crearEntornoCanvas(Render.canvas);
console.log(Frontera.cuerpo)
Frontera.cuerpo.opcionesGraficas = { colorTrazo: 'white', grosorTrazo: 2 }


//GRABACIÓN
let videoStream = Render.canvas.captureStream(60);
let mediaRecorder = new MediaRecorder(videoStream);

let chunks: BlobPart[] = [];
mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data);
};

mediaRecorder.onstop = function (e) {
    let blob = new Blob(chunks, { 'type': 'video/avi' });
    chunks = [];
    let videoURL = URL.createObjectURL(blob);
    // let link = document.createElement("a"); // Or maybe get it from the current document
    let link: HTMLAnchorElement = <HTMLAnchorElement>document.getElementById("descarga"); // Or maybe get it from the current document
    link.href = videoURL;
    link.download = "Captura Canvas";
    // link.click()
};

mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data);
};

mediaRecorder.start();
animar();
setTimeout(function () { mediaRecorder.stop(); }, 30000);


//ANIMACIÓN
function animar() {
    Render.limpiarCanvas()

    Circunferencias.forEach((circunferencia) => circunferencia.aceleracion = Fuerza.atraer(circunferencia, Atractor, MagnitudAtraccion))
    Frontera.colisionConBorde(...Circunferencias, Atractor);
    COMPO.actualizarMovimientoCuerpos()

    COMPO.cuerpos.forEach((cuerpo) => cuerpo.velocidad = Restriccion.limitarVelocidad(cuerpo, 10))

    Render.trazar(Frontera.cuerpo);
    COMPO.renderizarCuerpos();
    requestAnimationFrame(animar)
}


