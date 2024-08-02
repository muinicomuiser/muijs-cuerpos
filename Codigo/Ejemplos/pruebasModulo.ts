import { Matematica } from "../Fuente/Utiles/Matematica.js";
import { Matriz } from "../Fuente/Utiles/Matrices.js";
import { Punto } from "../Fuente/GeometriaPlana/Punto.js";
import { Forma } from "../Fuente/GeometriaPlana/Formas.js";
import { Vector } from "../Fuente/GeometriaPlana/Vector.js";
//Módulo Matemática, Aritmética
function aritmetica(): void{
    console.log(Matematica.redondear(Matematica.PI, 3));
    console.log(Matematica.parteDecimal(Matematica.PI));
    console.log(Matematica.radianAGrado(3.1415));
    console.log(Matematica.gradoARadian(180));
    console.log(Matematica.absoluto(0));
    console.log(Matematica.potencia(20, 3));
    console.log(Matematica.raiz(25, 2));
}
// aritmetica();
// console.log(0.1 + 0.2);
// console.log(Matematica.comparar(Matematica.absoluto(-0.3), 0.1 + 0.2));
// console.log(Number.MAX_SAFE_INTEGER);


//Módulo Matematica, Constantes
function matematicaConstantes(): void{
    console.log("Módulo Matemática, constantes:");
    console.log("PI: ", Matematica.PI);
    console.log("DOS_PI: ", Matematica.DOS_PI);
    console.log("PHI: ", Matematica.PHI);
    console.log("Math.PI: ", Math.PI);
}
// matematicaConstantes();


//Módulo Matrices
let A3X3: number[][] = [[0.2, 2, 3],[4, 5, 6],[7, 8, 9]];
let B3X3: number[][] = [[0.1, 2, 2],[3, 3, 3],[4, 4, 4]];
let C2X3: number[][] = [[1, 2, 3],[4, 5, 6]];
let D3X2: number[][] = [[1, 2],[3, 4], [5, 6]];
function matrices(): void{
    console.log("Módulo Matrices");
    console.log("Matriz nula 3x3: ", Matriz.nula(3, 3));
    console.log("Matriz identidad 3x3: ", Matriz.identidad(3));
    console.log("Matriz escalar 3x3, escalar = 4: ", Matriz.escalar(3, 0.4));
    console.log("Matriz traspuesta 3x3 de [[1, 2, 3],[4, 5, 6,],[7, 8, 9]]: ", Matriz.traspuesta(A3X3));
    console.log("Matriz traspuesta 3x2 de [[1, 2, 3],[4, 5, 6,]]: ", Matriz.traspuesta([[1, 2, 3],[4, 5, 6,]]));
    console.log("Matriz traspuesta 2x3 de [[1, 4], [2, 5], [3, 6]]: ", Matriz.traspuesta([[1, 4], [2, 5], [3, 6]]));
    console.log("Suma de las matrices [[1, 2],[3, 4]] y [[5, 6], [7, 8]]: ", Matriz.suma([[1, 2],[3, 4]], [[5, 6], [7, 8]]));
    console.log(`Suma de las matrices`, A3X3, "y", B3X3,": ", Matriz.suma(A3X3, B3X3));
    console.log(`Resta de las matrices`, A3X3, "y", B3X3,": ", Matriz.resta(A3X3, B3X3));
    console.log("Matriz 3x3 ", A3X3, " multiplicada por 4: ", Matriz.productoEscalar(A3X3, 0.4));
    console.log((((3*10)*(0.4*10))/100).toString(10))
    console.log((3*0.4).toString(10))
    console.log(Matematica.multiplicacion(0.1, 0.2))
    console.log(Matematica.suma(0.01, 0.02))
    console.log((0.1 * 0.2))
    console.log("Dimensiones: ", A3X3, " == ", C2X3, ": ", Matriz.compararDimension(A3X3, C2X3));
    console.log("Dimensiones: ", A3X3, " == ", B3X3, ": ", Matriz.compararDimension(A3X3, B3X3));
    console.log("Poroducto entre ", C2X3, " y ", D3X2, ": ", Matriz.productoMatriz(C2X3, D3X2))
    console.log("Poroducto entre ", D3X2, " y ", C2X3, ": ", Matriz.productoMatriz(D3X2, C2X3))
}
// matrices();
// console.log(Matriz.productoMatriz(Matriz.identidad(2), [[2, 2], [3, 2]]));
// console.log(Matriz.productoMatriz([[0, 1],[1, 0]], [[4],[3]]));
// console.log(Matriz.nula([[1, 0],[0, 1]].length, [[2],[3]][0].length));
// console.log(Matriz.identidad(2));
// console.log(Matriz.nula(2, 1))
// console.log("Matriz traspuesta 3x2 de [[1, 2, 3],[4, 5, 6,]]: ", Matriz.traspuesta([[1, 2, 3],[4, 5, 6,]]));
// console.log("Matriz traspuesta 2x3 de [[1, 4], [2, 5], [3, 6]]: ", Matriz.traspuesta([[1, 4], [2, 5], [3, 6]]));

//VECTORES
function vectores(): void{
    let vectorTres: Vector = Vector.segunPuntos({x:2, y:2}, {x: 4, y: 4});
    console.log(vectorTres)
    console.log(Matematica.radianAGrado(vectorTres.angulo))
    // console.log("VectorUno")
    // console.log(vectorUno);
    // vectorUno.y = 10;
    // console.log(vectorUno);
    // console.log("VectorDos")
    // console.log(vectorDos);
// vectorDos.angulo = 0.7;
// console.log(vectorDos);
// console.log(vectorUno.escalar(5));

}
// vectores();
// console.log(Matriz.rotarPunto2D(Vector.crear(0, 0), 2))
// let vectorUno: Vector = Vector.crear(1, 1);
// let poligonoUno = Forma.poligono(300, 300, 10, 80);
// console.log(poligonoUno)
// console.log(poligonoUno.centro);
// poligonoUno.rotarSegunCentro(Matematica.gradoARadian(2));

function generarAleatorio(){
    let aleatorio: number = 0;
    for(let i: number = 0; i < 10000; i++){
        let unidades: number = 1234567890;
        let numero: number = Matematica.divisionSegura(Date.now() % 100, 100);
        numero = Matematica.multiplicacion(numero, Matematica.PI);
        let selector: number = (Date.now() % 10) + 1;
        unidades = unidades / (10**(selector+1));
        aleatorio += numero * unidades;
    } 
    aleatorio = Matematica.parteDecimal(aleatorio);
    console.log(aleatorio)   
    console.log(Date.now())
}

    
/**Me gusta cómo quedó esta prueba */
function pruebaAleatorioEnteroRango(){
    let repeticiones: number = 500;
    let resultados: number[] = [];
    let min: number = -1;
    let max: number = 2;
    let a: number = 0;
    let b: number = 0;
    let c: number = 0;
    let d: number = 0;
    console.log(new Date())
    for(let i: number = 0; i < repeticiones; i++){
        let aleatorio: number = Matematica.aleatorioEntero(min, max);
        if(aleatorio == min){
            a++
        }
        if(aleatorio == min+1){
            b++
        }
        if(aleatorio == max-1){
            c++
        }
        if(aleatorio == max){
            d++
        }
        resultados.push(aleatorio)
        if(aleatorio == min-1 || aleatorio == max+1){
            console.log(aleatorio)
        }
    }
    console.log(new Date())
    console.log(`${min}:`, a, `${min+1}:`, b, `${max-1}:`, c,  `${max}:`, d)
    console.log(resultados)
}
// pruebaAleatorioEnteroRango()


function pruebaAleatorioRango(){
    let repeticiones: number = 500;
    let resultados: number[] = [];
    let min: number = 10;
    let max: number = 20;
    let a: number = 0;
    let b: number = 0;
    console.log(new Date())
    for(let i: number = 0; i < repeticiones; i++){
        let aleatorio: number = Matematica.aleatorio(min, max);
        if(aleatorio < min){
            a++
        }

        if(aleatorio > max){
            b++
        }
        resultados.push(aleatorio)
    }
    console.log(new Date())
    console.log("Mínimo: ", min, "Máximo: ", max)
    console.log(`Menos que ${min}:`, a)
    console.log(`Más que ${max}:`, b)
    console.log(resultados)
}
pruebaAleatorioRango()