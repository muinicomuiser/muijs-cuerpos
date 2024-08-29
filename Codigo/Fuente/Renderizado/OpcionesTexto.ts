//  escribir(texto: string, posicionX: number, posicionY: number, tamano: number, 
//     grosor: number = 500, alineacion: CanvasTextAlign = "center", fuente: string = "calibri"): void{
//     } 

export interface OpcionesTexto {
    tamano?: number,
    // grosor?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
    // grosor?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
    // grosor?: 'bold' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
    alineacion?: CanvasTextAlign,
    fuente?: string,
    opacidad?: number,
    color?: string,
}