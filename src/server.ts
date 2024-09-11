import express from "express";
import { configuration } from "./config.js";
import { esPalindromo } from "./palindromo.js";
import { esPrimo } from "./numeros.js";

const app = express();
app.disable('x-powered-by');

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hola, esta api fue configurada por el usuario ${configuration.username}`);
});

app.get("/key", (req, res) => {
  res.send(`Hola, esta api contiene la siguiente api-key: ${configuration.apiKey}`);
});

app.get("/palindromo/:frase", (req, res) => {
  const { frase } = req.params
  

 
 

const esPalindromos = esPalindromo(frase);
  res.send(`Hola, La frase ingresada ${esPalindromos ? "es" : "no es"} palindromo`);
});

app.get("/primo/:numero", (req, res) => {
  const { numero } = req.params
 
 
const esPrimos = esPrimo(+numero);

  res.send(`Hola, el numero ingresado ${esPrimos ? "es" : "no es"} un numero primo`);
});

export default app;