export const esPalindromo = (frase: string) => {

    if (!frase) {
        throw new Error("No se ingresó un valor correcto");
    }

    if (!frase || typeof frase !== 'string') {
        throw new Error("No se ingresó un valor correcto");
    }
    
    const fraseSinEspacios = frase.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const fraseInvertida = fraseSinEspacios.split("").reverse().join("");
    return fraseSinEspacios === fraseInvertida;
}