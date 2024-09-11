import { describe, test, expect } from "@jest/globals";
import app from "../src/server.js";
import request from "supertest";
import { configuration } from "../src/config.js";
import{esPalindromo} from "../src/palindromo.js";
import {esPrimo} from "../src/numeros.js";
import { } from "../src/server.js";
 

 

describe("Test Suite App", () => {

    test("endpoint /", () => {
        expect(1 + 1).toBe(2);
    });

    test("endpoint key", () => {
        expect(1 + 1).toBe(2);
    });

    test("endpoint /palindromo", () => {
    
        let Palabra: any =  "";
        Palabra = "reconocer";
        expect(esPalindromo(Palabra)).toBe(true);

        Palabra = "Hola";
        expect(esPalindromo(Palabra)).toBe(false);
 
 
        Palabra = undefined;
        expect(() => { esPalindromo(Palabra) }).toThrow("No se ingresó un valor correcto");
 
    
        Palabra = 12345;
        expect(() => { esPalindromo(Palabra) }).toThrow("No se ingresó un valor correcto");
        
        Palabra = ["esto", "es", "un", "array"];
        expect(() => { esPalindromo(Palabra) }).toThrow("No se ingresó un valor correcto");
        
        Palabra = "";
        expect(() => { esPalindromo(Palabra) }).toThrow("No se ingresó un valor correcto");
        
 
    });
 
    test("endpoint /primo", () => {
    
        let numero: any =  2;
        numero = 2;
        expect(esPrimo(numero)).toBe(true);
        numero = 3;
        expect(esPrimo(numero)).toBe(true);
        numero = 5;
        expect(esPrimo(numero)).toBe(true);

        numero = 1;
        expect(esPrimo(numero)).toBe(false);
        numero = 0;
        expect(esPrimo(numero)).toBe(false);     
        numero = -5;
        expect(esPrimo(numero)).toBe(false);

        numero = 1000;
        expect(esPrimo(numero)).toBe(false);
        numero = 7919;
        expect(esPrimo(numero)).toBe(true); 

    });

    test("test de endpoint /", async () => {
        return await request(app)
            .get("/")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, esta api fue configurada por el usuario ${configuration.username}`);
            })
    });

    test("test de endpoint /key", async () => {
        return await request(app)
            .get("/key")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, esta api contiene la siguiente api-key: ${configuration.apiKey}`); 
            });
    });


    test("test de endpoint /palindromo", async () => {
        const frase = "reconocer";
        return await request(app)
            .get("/palindromo/reconocer")
            .expect("Content-Type", /text/)   
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, La frase ingresada es palindromo`);
            });
    });


    test("endpoint /palindromo con frase que no es palíndromo", async () => {
        return await request(app)
          .get("/palindromo/Hola")
          .expect("Content-Type", /text/)
          .expect(200)
          .then((response) => {
            expect(response.text).toBe("Hola, La frase ingresada no es palindromo");
          });
      });


      test("test de endpoint /palindromo con espacios", async () => {
        const frase = "Prueba con espacios";
        return await request(app)
            .get(`/palindromo/${encodeURIComponent(frase)}`)
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, La frase ingresada no es palindromo`);
            });

      

    });

    test("test de endpoint /primo", async () => {
      
        return await request(app)
            .get("/primo/3")
            .expect("Content-Type", /text/) 
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, el numero ingresado es un numero primo`);
            });
    });

    test("endpoint /primo con número que no es primo", async () => {
        return await request(app)
          .get("/primo/4")
          .expect("Content-Type", /text/)
          .expect(200)
          .then((response) => {
            expect(response.text).toBe(`Hola, el numero ingresado no es un numero primo`);
          });
      });

});