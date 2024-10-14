import { Composicion, Cuerpo, Entorno, Forma, Fuerza, Renderizado, Restriccion, Vector } from "../Fuente/mui.js";

const COMPO: Composicion = Composicion.crearConIDCanvas('canvas');
COMPO.tamanoCanvas(1080, 1080)
const Render: Renderizado = COMPO.render;
Render.colorCanvas = 'black'

//CUERPOS
//Formas generadoras
const RADIOGENERADORA: number = 380;
const RADIOGENERADORADOS: number = 250;
const NUMEROCUERPOSCENTRO: number = 50
const NUMEROCUERPOSFUERA: number = 100;
const FormaGeneradora: Forma = Forma.poligono(Render.centroCanvas.x, Render.centroCanvas.y, NUMEROCUERPOSFUERA, RADIOGENERADORA)
const FormaGeneradoraDos: Forma = Forma.poligono(Render.centroCanvas.x, Render.centroCanvas.y, NUMEROCUERPOSCENTRO, RADIOGENERADORADOS)

//Cuerpos
const RADIOCUERPO: number = 10;
const RADIOCUERPODOS: number = 8;
const Circunferencias: Cuerpo[] = []

FormaGeneradora.verticesTransformados.forEach((vertice) => {
    let circunferencia: Cuerpo = Cuerpo.circunferencia(vertice.x, vertice.y, RADIOCUERPO)
    circunferencia.estiloGrafico = { colorRelleno: 'brown', colorTrazo: 'black' }
    circunferencia.masa = 80
    Circunferencias.push(circunferencia);
})

FormaGeneradoraDos.verticesTransformados.forEach((vertice) => {
    let circunferencia: Cuerpo = Cuerpo.circunferencia(vertice.x, vertice.y, RADIOCUERPODOS)
    circunferencia.estiloGrafico = { colorRelleno: 'pink', colorTrazo: 'black' }
    circunferencia.masa = 10
    Circunferencias.push(circunferencia);
})


//cuerpo atractor
const MagnitudAtraccion: number = 0.02;
const RADIOATRACTOR: number = 50
const Atractor: Cuerpo = Cuerpo.circunferencia(Render.centroCanvas.x, Render.centroCanvas.y, RADIOATRACTOR)
Atractor.masa = 50000
Atractor.estiloGrafico = { colorRelleno: 'orange', colorTrazo: 'black', rellenada: true }
Atractor.fijo = false;


//Se integran todos los cuerpos a la composición
COMPO.agregarCuerpos(...Circunferencias, Atractor);


//Frontera del canvas
const Frontera: Entorno = Entorno.crearEntornoCanvas(Render.canvas);
Frontera.cuerpo.estiloGrafico = { colorTrazo: 'white', grosorTrazo: 4 }


//GRABACIÓN
let videoStream = Render.canvas.captureStream(60);
let mediaRecorder = new MediaRecorder(videoStream);

let chunks: BlobPart[] = [];
mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data);
};

mediaRecorder.onstop = function (e) {
    let blob = new Blob(chunks, { 'type': 'video/mpeg' });
    chunks = [];
    let videoURL = URL.createObjectURL(blob);
    // let link = document.createElement("a"); // Or maybe get it from the current document
    let link: HTMLAnchorElement = <HTMLAnchorElement>document.getElementById("descarga"); // Or maybe get it from the current document
    link.href = videoURL;
    link.download = "Captura Canvas";
    link.innerHTML = 'Descargar'
    link.style.color = 'skyblue'
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
    Render.limpiarCanvas(0)

    Circunferencias.forEach((circunferencia) => circunferencia.aceleracion = Fuerza.atraer(circunferencia, Atractor, MagnitudAtraccion))
    Frontera.colisionConBorde(...Circunferencias, Atractor);
    // COMPO.contactoSimpleCuerpos()

    COMPO.cuerpos.forEach((cuerpo) => {
        cuerpo.velocidad = Restriccion.limitarVelocidad(cuerpo, 10)
        cuerpo.velocidad = Vector.escalar(cuerpo.velocidad, 0.999)
    })
    COMPO.moverCuerpos()
    COMPO.reboteElasticoCuerpos()

    Render.trazar(Frontera.cuerpo);
    COMPO.renderizarCuerpos();
    requestAnimationFrame(animar)
}


