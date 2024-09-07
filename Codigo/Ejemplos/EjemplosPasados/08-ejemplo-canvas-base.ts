// //Guardado del canvas html en una constante
// const CANVAS: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");

// //Herramienta para dibujar sobre el canvas
// const CONTEXT: CanvasRenderingContext2D = CANVAS.getContext("2d")!

// //Opciones del canvas
// CANVAS.width = 500;
// CANVAS.height = 500;
// CANVAS.style.backgroundColor = 'white'

// //Nuevo tipo de figura para dibujar
// type Circulito = {
//     radio: number,
//     x: number,
//     y: number,
//     color: string
// }

// //Función de dibujo para el tipo Circulito
// function dibujarCirculito(circulito: Circulito): void {

//     //Inicio del recorrido del trazo
//     CONTEXT.beginPath();
//     CONTEXT.arc(circulito.x, circulito.y, circulito.radio, Math.PI * 0, Math.PI * 2);

//     //Opacidad
//     CONTEXT.globalAlpha = 0.5;

//     //Opciones de relleno
//     CONTEXT.fillStyle = circulito.color;
//     CONTEXT.fill();

//     //Opciones de trazado
//     CONTEXT.lineWidth = 10;
//     CONTEXT.strokeStyle = 'hsl(255, 50%, 50%)';
//     CONTEXT.stroke();
// }

// //Circulitos para dibujar
// const circulitoUno: Circulito = { x: 150, y: 150, radio: 110, color: 'orange' }
// const circulitoDos: Circulito = { x: 350, y: 350, radio: 120, color: 'skyblue' }

// //Ejecución del dibujo
// dibujarCirculito(circulitoUno);
// dibujarCirculito(circulitoDos);