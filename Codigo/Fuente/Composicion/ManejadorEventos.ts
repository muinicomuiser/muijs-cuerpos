//Tengo que integrar un modo de recibir eventos de hardware

export class ManejadorEventos {

    /**Agrega un eventListener para eventos de teclado. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
    static eventoTeclado<Type>(tipoEvento: EventoTeclado, codigoTecla: CodigoTecla, manejarEvento: (param: Type) => void, parametro?: Type) {
        document.addEventListener<EventoTeclado>(tipoEvento, (evento) => {
            if (evento.code == codigoTecla) {
                manejarEvento(parametro!)
            }
        })
    }

    /**Agrega un eventListener para eventos de teclado tipo keyup. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
    static eventoKeyup<Type>(codigoTecla: CodigoTecla, manejarEvento: (param: Type) => void, parametro?: Type) {
        ManejadorEventos.eventoTeclado('keyup', codigoTecla, manejarEvento, parametro)
    }

    /**Agrega un eventListener para eventos de teclado tipo keydown. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
    static eventoKeydown<Type>(codigoTecla: CodigoTecla, manejarEvento: (param: Type) => void, parametro?: Type) {
        ManejadorEventos.eventoTeclado('keydown', codigoTecla, manejarEvento, parametro)
    }

    /**Agrega un eventListener para eventos de teclado tipo keypress. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
    static eventoKeypress<Type>(codigoTecla: CodigoTecla, manejarEvento: (param: Type) => void, parametro?: Type) {
        ManejadorEventos.eventoTeclado('keypress', codigoTecla, manejarEvento, parametro)
    }

    //Considerar agregar un parámetro validador (validador?: boolean). Un if boolean
    /**Agrega un eventListener para eventos de mouse. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
    static eventoMouseEnCanvas<K>(tipoEvento: EventoMouse, canvas: HTMLCanvasElement, manejarEvento: (eventoMouse: MouseEvent, param: K) => void, parametro?: K) {
        canvas.addEventListener(tipoEvento, (evento) => {
            if (parametro) {
                manejarEvento(evento, parametro);
            }
            else {
                manejarEvento(evento, undefined!)
            }
        })
    }
}

/**Constante que almacena los códigos de eventos de teclado.*/
const CODIGOSTECLA = {
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

} as const;

/**Tipo para los códigos de eventos de teclado.*/
type CodigoTecla = (typeof CODIGOSTECLA)[keyof typeof CODIGOSTECLA]

/**Tipo para los tipos de evento de teclado.*/
type EventoTeclado = keyof Pick<WindowEventMap, 'keydown' | 'keypress' | 'keyup'>;

/**Tipo para los tipos de evento de mouse.*/
type EventoMouse = keyof Pick<WindowEventMap, 'mousedown' | 'mouseenter' | 'mousemove' | 'mouseleave' | 'mouseup' | 'mouseout' | 'mouseover' | 'click'>