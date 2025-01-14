//Tengo que integrar un modo de recibir eventos de hardware
export class ManejadorEventos {
    /**Agrega un eventListener para eventos de teclado. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
    static eventoTeclado(tipoEvento, codigoTeclado, manejarEvento, parametro) {
        document.addEventListener(tipoEvento, (evento) => {
            // const mismoType: TypeEquality<CodigoTeclado, typeof evento.code> = true;
            if (evento.code == codigoTeclado) {
                manejarEvento(parametro);
            }
        });
    }
    // /**Agrega un eventListener para eventos de mouse. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
    // static eventoMouseEnCanvas<T>(tipoEvento: EventoMouse, canvas: HTMLCanvasElement, manejarEvento: (posicionMouseX: number, posicionMouseY: number) => T) {
    //     canvas.addEventListener<EventoMouse>(tipoEvento, (eventoMouse) => {
    //         let mouseX = eventoMouse.pageX - canvas.offsetLeft;
    //         let mouseY = eventoMouse.pageY - canvas.offsetTop;
    //         manejarEvento(mouseX, mouseY)
    //     })
    // }
    /**Agrega un eventListener para eventos de mouse. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
    static eventoMouseEnCanvas(tipoEvento, canvas, manejarEvento, parametro) {
        canvas.addEventListener(tipoEvento, (evento) => {
            if (parametro) {
                manejarEvento(evento, parametro);
            }
            else {
                manejarEvento(evento, undefined);
            }
        });
    }
}
const CODIGOSTECLADO = {
    space: 'Space',
    enter: 'Enter',
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    a: 'KeyA',
    b: 'KeyB',
    c: 'KeyC',
    d: 'KeyD',
    e: 'KeyE',
    f: 'KeyF',
    g: 'KeyG',
    h: 'KeyH',
    i: 'KeyI',
    j: 'KeyJ',
    k: 'KeyK',
    l: 'KeyL',
    m: 'KeyM',
    n: 'KeyN',
    ñ: 'KeyÑ',
    o: 'KeyO',
    p: 'KeyP',
    q: 'KeyQ',
    r: 'KeyR',
    s: 'KeyS',
    t: 'KeyT',
    u: 'KeyU',
    v: 'KeyV',
    w: 'KeyW',
    x: 'KeyX',
    y: 'KeyY',
    z: 'KeyZ',
};
