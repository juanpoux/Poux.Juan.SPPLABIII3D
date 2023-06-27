import { crearTarjeta } from "./creadorTarjetas.js";
import { getFetch } from "./peticiones.js";
const URLHEROES = "http://localhost:3000/superheroes";
const $spinner = document.getElementById("spinner_container");
$spinner.style.display = "none";

const arraySuperheroes = await getFetch(URLHEROES, $spinner);

const $divTarjetas = document.querySelector(".div_tarjetas");
arraySuperheroes.forEach((element) => {
    console.log(element);
    const $nuevaTarjeta = crearTarjeta(element);
    $divTarjetas.appendChild($nuevaTarjeta);
});
