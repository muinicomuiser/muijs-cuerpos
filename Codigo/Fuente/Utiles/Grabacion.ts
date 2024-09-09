export class Grabador {
    constructor() { }

    static grabarCanvas(canvas: HTMLCanvasElement, milisegundos: number, fps: number, boton?: string) {
        let chunks: BlobPart[] = []
        let videoStream = canvas.captureStream(fps);
        let mediaRecorder = new MediaRecorder(videoStream);
        mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
        };

        mediaRecorder.start();
        setTimeout(function () { mediaRecorder.stop(); }, milisegundos);

        mediaRecorder.onstop = function (e) {
            let blob = new Blob(chunks, { 'type': 'video/avi' });
            chunks = [];
            let videoURL = URL.createObjectURL(blob);
            let link: HTMLAnchorElement;
            if (boton) {
                link = <HTMLAnchorElement>document.getElementById(boton);
            }
            else {
                link = document.createElement("a");
                link.style.color = 'skyblue'
                link.innerHTML = 'Descargar'
            }
            link.href = videoURL;
            link.download = "Captura Canvas";
        }
    }
}