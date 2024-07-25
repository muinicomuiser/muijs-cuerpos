import { Matematica } from "../src/Matematica.js";
//Matematica.gradoARadian(num)
console.assert(Matematica.gradoARadian(0) == 0);
console.assert(Matematica.gradoARadian(180) == Matematica.PI);
console.assert(Matematica.gradoARadian(360) == Matematica.DOS_PI);
//Matematica.radianAGrado(rad: number)
console.assert(Matematica.radianAGrado(0) == 0);
console.assert(Matematica.radianAGrado(Matematica.PI) == 180);
console.assert(Matematica.radianAGrado(Matematica.DOS_PI) == 360);
//Matematica.parteEntera(numero: number)
console.assert(Matematica.parteEntera(1) == 1);
console.assert(Matematica.parteEntera(0) == 0);
console.assert(Matematica.parteEntera(0.15) == 0);
console.assert(Matematica.parteEntera(10.10) == 10);
console.assert(Matematica.parteEntera(10.9) == 10);
console.assert(Matematica.parteEntera(2.111111111) == 2);
console.assert(Matematica.parteEntera(-2.111111111) == -2);
//Matematica.parteDecimal(numero: number)
console.assert(Matematica.parteDecimal(1) == 0);
console.assert(Matematica.parteDecimal(1.1) == 0.1);
console.assert(Matematica.parteDecimal(0.1) == 0.1);
console.assert(Matematica.parteDecimal(1.0001) == 0.0001);
console.assert(Matematica.parteDecimal(1.1000) == 0.1);
console.assert(Matematica.parteDecimal(-1.1000) == -0.1);
//Matematica.redondear(numero: number, decimales: number)
console.assert(Matematica.redondear(1, 0) == 1);
console.assert(Matematica.redondear(1.1, 0) == 1);
console.assert(Matematica.redondear(1.5, 0) == 2);
console.assert(Matematica.redondear(1.04, 0) == 1);
console.assert(Matematica.redondear(1.05, 1) == 1.1);
console.assert(Matematica.redondear(1.05, 2) == 1.05);
console.assert(Matematica.redondear(1.051, 2) == 1.05);
console.assert(Matematica.redondear(1.055, 2) == 1.06);
console.assert(Matematica.redondear(1.04, 1) == 1.0);
console.assert(Matematica.redondear(-1.04, 1) == -1.0);
//Matematica.truncar(numero: number, decimales: number)
console.assert(Matematica.truncar(1, 0) == 1);
console.assert(Matematica.truncar(1.1, 0) == 1);
console.assert(Matematica.truncar(1.11, 1) == 1.1);
console.assert(Matematica.truncar(10.115, 2) == 10.11);
console.assert(Matematica.truncar(1.19, 1) == 1.1);
console.assert(Matematica.truncar(1.0001111, 4) == 1.0001);
console.assert(Matematica.truncar(1.0001000, 5) == 1.0001);
console.assert(Matematica.truncar(-1.0001000, 5) == -1.0001);
//Matematica.absoluto(numero: number)
console.assert(Matematica.absoluto(0) == 0);
console.assert(Matematica.absoluto(10) == 10);
console.assert(Matematica.absoluto(-10) == 10);
//Matematica.raiz(numero, raiz) ****
// console.log(Matematica.raiz(25, 2))
