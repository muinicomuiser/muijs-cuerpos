/**
        =============================================
                 * MÓDULO DE COLISIONES *
        =============================================
        Trabaja usando objetos de tipo Forma.

        Usa el Teorema de ejes de separación (SAT) para detectar colisiones.

 */

import { Forma } from "../GeometriaPlana/Formas.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Geometria } from "../Utiles/Geometria.js";

/** MÓDULO DE COLISIONES        
 * Trabaja usando objetos de tipo Forma.
 */
export class Colision{

    /**Detecta colisiones usando el teorema SAT entre formas de tipo circunferencia y/o polígono.      
     * Retorna true si detecta una colisión.        
     * Retorna false si no detecta colisión.        
    */
    static detectar(formaUno: Forma, formaDos: Forma): boolean{
        if(formaUno.id == "poligono" && formaDos.id == "poligono"){
            return Colision.poligonos(formaUno, formaDos);
        }
        else if(formaUno.id == "circunferencia" && formaDos.id == "poligono"){
            return Colision.circunferenciaPoligono(formaUno, formaDos);
        }
        else if(formaUno.id == "poligono" && formaDos.id == "circunferencia"){
            return Colision.circunferenciaPoligono(formaDos, formaUno);
        }
        else{
            return Colision.circunferencias(formaUno, formaDos);
        }
    }


    /**Detecta la intersección entre dos circunferencias.             
     * Retorna true si hay intersección.        
     * Retorna false si no hay intersección.        
     * Compara la distancia entre ambos centros con la suma de sus radios.
     */
    static circunferencias(circunferenciaUno: Forma, circunferenciaDos: Forma): boolean{
        let sumaRadios: number = circunferenciaUno.radio + circunferenciaDos.radio;
        let distanciaCentros: number = Geometria.distanciaEntrePuntos(circunferenciaUno.posicion, circunferenciaDos.posicion);
        if(distanciaCentros > sumaRadios){
            return false
        }
        return true;
    }


    /**Detecta la colisión entre dos polígonos.             
     * Retorna true si hay colisión.        
     * Retorna false si no hay colisión.        
     * Usa el teorema SAT. Proyecta los vértices sobre las normales de las caras de ambos polígonos y busca ejes de separación. 
     */
    static poligonos(poligonoUno: Forma, poligonoDos: Forma): boolean{
        for(let normal of poligonoUno.normales){     

            /**Búsqueda de proyecciones mínimas y máximas de los vértices de los polígonos sobre las normales del polígono uno.*/
            let menorUno: number = Colision.proyeccionMenor(poligonoUno.verticesTransformados, normal);
            let mayorUno: number = Colision.proyeccionMayor(poligonoUno.verticesTransformados, normal);
            let menorDos: number = Colision.proyeccionMenor(poligonoDos.verticesTransformados, normal);
            let mayorDos: number = Colision.proyeccionMayor(poligonoDos.verticesTransformados, normal);

            /**Comparación. Si se encuentra una separación, retorna false.*/
            if(menorUno > mayorDos || mayorUno < menorDos){
                return false;                    
            }
        }
        for(let normal of poligonoDos.normales){      

            /**Búsqueda de proyecciones mínimas y máximas de los vértices de los polígonos sobre las normales del polígono uno.*/
            let menorUno: number = Colision.proyeccionMenor(poligonoUno.verticesTransformados, normal);
            let mayorUno: number = Colision.proyeccionMayor(poligonoUno.verticesTransformados, normal);
            let menorDos: number = Colision.proyeccionMenor(poligonoDos.verticesTransformados, normal);
            let mayorDos: number = Colision.proyeccionMayor(poligonoDos.verticesTransformados, normal);

            /**Comparación. Si se encuentra una separación, retorna false.*/
            if(menorUno > mayorDos || mayorUno < menorDos){
                return false;                    
            }
        }
        return true;
    }
    

    /**Detecta la colisión entre una circunferencia y un polígono.             
     * Retorna true si hay colisión.        
     * Retorna false si no hay colisión.        
     * Usa el teorema SAT. Proyecta los vértices del polígono y dos puntos de la circunferencia sobre las normales de las caras del polígono y busca ejes de separación. 
     */
    static circunferenciaPoligono(circunferencia: Forma, poligono: Forma): boolean{
        for(let normal of poligono.normales){   

            /**Búsqueda de proyecciones mínimas y máximas de los vértices de los polígonos sobre las normales del polígono uno.*/
            let menorPoli: number = Colision.proyeccionMenor(poligono.verticesTransformados, normal);
            let mayorPoli: number = Colision.proyeccionMayor(poligono.verticesTransformados, normal);
            let menorCirc: number = Vector.proyeccion(circunferencia.posicion, normal) - circunferencia.radio;
            let mayorCirc: number = Vector.proyeccion(circunferencia.posicion, normal) + circunferencia.radio;

            /**Comparación. Si se encuentra una separación, retorna false.*/
            if(menorPoli > mayorCirc || mayorPoli < menorCirc){
                return false;                    
            }
        }
        return true;
    }


    /**Retorna el valor menor entre las proyecciones de un conjunto de vértices sobre un eje representado por un vector normal.*/
    private static proyeccionMenor(vertices: Vector[], normal: Vector): number{
            let menor = Vector.proyeccion(vertices[0], normal);
        
            /**Búsqueda de proyecciones mínimas de los vértices del polígono uno.*/
            for(let vertice of vertices){
                if(Vector.proyeccion(vertice, normal) < menor){
                menor = Vector.proyeccion(vertice, normal);
            }
        }
        return menor;
    }


    /**Retorna el valor mayor entre las proyecciones de un conjunto de vértices sobre un eje representado por un vector normal.*/
    private static proyeccionMayor(vertices: Vector[], normal: Vector): number{
            let mayor = Vector.proyeccion(vertices[0], normal);
        
            /**Búsqueda de proyecciones máximas de los vértices del polígono uno.*/
            for(let vertice of vertices){
                if(Vector.proyeccion(vertice, normal) > mayor){
                    mayor = Vector.proyeccion(vertice, normal);
            }
        }
        return mayor;
    }
}