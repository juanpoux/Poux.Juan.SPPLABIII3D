import {
    actualizarTabla,
    crearSelectEditorial,
    actualizarSelectEditorial,
} from "./creadorTabla.js";
import { Superheroe } from "./personaje.js";
import {
    validarCampoVacio,
    agregarErrorAControles,
    validarForm,
    quitarErrorAControles,
} from "./validaciones.js";
import { getFetch, createAjax, updateAjax, deleteAjax } from "./peticiones.js";

const URLHEROES = "http://localhost:3000/superheroes";
const URLARMAS = "http://localhost:3000/armas";

const $spinner = document.getElementById("spinner_container");
$spinner.style.display = "none";

function agregarArmasSelect(armas) {
    const $select = document.getElementById("slArma");

    armas.forEach((element) => {
        const $op = document.createElement("option");
        $op.textContent = element;
        $select.appendChild($op);
    });
}

const armas = await getFetch(URLARMAS, $spinner);
agregarArmasSelect(armas);
const arraySuperheroes = await getFetch(URLHEROES, $spinner);

const $tabla = document.getElementById("container_tabla");
actualizarTabla($tabla, arraySuperheroes);
crearSelectEditorial(arraySuperheroes.map((item) => item.editorial));
const $btnGuardar = document.getElementById("btnGuardar");
const $form = document.forms[0];
const $containerBtns = document.querySelector(".container_botones");

// Agregar
function agregarSuperheroe() {
    if (!validarForm($form)) {
        agregarErrorAControles($form);
    } else {
        createAjax(URLHEROES, nuevoSuperheroe(), $spinner);
        actualizarTabla($tabla, arraySuperheroes);
        actualizarSelectEditorial(
            arraySuperheroes.map((item) => item.editorial)
        );
        $form.reset();
    }
}

const { txtId, txtNombre, txtAlias, rngFuerza, rdoEditorial, slArma } = $form;

function nuevoSuperheroe() {
    return new Superheroe(
        Date.now(),
        txtNombre.value,
        rngFuerza.value,
        txtAlias.value,
        rdoEditorial.value,
        slArma.value
    );
}

function getSuperheroeConID() {
    return new Superheroe(
        txtId.value,
        txtNombre.value,
        rngFuerza.value,
        txtAlias.value,
        rdoEditorial.value,
        slArma.value
    );
}

// MODIFICAR
function modificarSuperheroe(superheroeEdit) {
    const superheroe = arraySuperheroes.find(
        (element) => element.id == superheroeEdit.id
    );
    if (!validarForm($form)) {
        agregarErrorAControles($form);
    } else {
        superheroe.nombre = superheroeEdit.nombre;
        superheroe.alias = superheroeEdit.alias;
        superheroe.editorial = superheroeEdit.editorial;
        superheroe.fuerza = superheroeEdit.fuerza;
        superheroe.arma = superheroeEdit.arma;
        updateAjax(URLHEROES, superheroe, $spinner);
        $btnGuardar.classList.remove("disabled");
        $form.reset();
        $containerBtns.style.display = "none";
    }
}

// ELIMINAR
function eliminarSuperheroe(id, titulo) {
    if (confirm(`Desea eliminar el superheroe ${titulo}?`)) {
        deleteAjax(URLHEROES, id, $spinner);
        $btnGuardar.classList.remove("disabled");
        $form.reset();
    }
}

function handlerClick(e) {
    const emisor = e.target;

    if (emisor.matches("#container_tabla table tbody tr td")) {
        quitarErrorAControles($form);
        const id = emisor.parentElement.dataset.id;
        const superheroe = arraySuperheroes.find((element) => element.id == id);
        cargarTabla(superheroe);
        $btnGuardar.classList.add("disabled");
        $containerBtns.style.display = "flex";
    } else if (emisor.matches("#btnModificar")) {
        modificarSuperheroe(getSuperheroeConID());
    } else if (emisor.matches("#btnCancelar")) {
        $form.reset();
        $containerBtns.style.display = "none";
        $btnGuardar.classList.remove("disabled");
    } else if (emisor.matches("#btnEliminar")) {
        const id = txtId.value;
        if (id) {
            eliminarSuperheroe(txtId.value, txtNombre.value);
        }
    }
}

function cargarTabla(superheroe) {
    console.log(superheroe);
    txtId.value = superheroe.id;
    txtNombre.value = superheroe.nombre;
    txtAlias.value = superheroe.alias;
    rdoEditorial.value = superheroe.editorial;
    rngFuerza.value = superheroe.fuerza;
    slArma.value = superheroe.arma;
}

function filtrarLista(array) {
    const arraySinFiltrar = array;
    const $selectFiltro = document.getElementById("select_id");

    let value = $selectFiltro.value;
    if (value === "todos") {
        return arraySinFiltrar;
    }

    const arrayFiltrado = arraySinFiltrar.filter((item) => {
        return item.editorial === $selectFiltro.value;
    });

    return arrayFiltrado;
}

// EVENTOS ↓↓

// CLICK
window.addEventListener("click", handlerClick, true);

const $selectFiltro = document.getElementById("select_id");
$selectFiltro.addEventListener("change", (e) => {
    actualizarTabla($tabla, filtrarLista(arraySuperheroes));
});

// AGREGAR
$form.addEventListener("submit", (e) => {
    e.preventDefault();

    agregarSuperheroe();
});

// VALIDACIONES
const controles = $form.elements;
for (let i = 0; i < controles.length; i++) {
    const control = controles.item(i);
    if (control.matches("input")) {
        if (control.matches("[type=text]")) {
            control.addEventListener("blur", validarCampoVacio);
        }
        //  else if (control.matches("[type=number]")) {
        //     control.addEventListener("blur", validarNumero);
        // }
    }
}
