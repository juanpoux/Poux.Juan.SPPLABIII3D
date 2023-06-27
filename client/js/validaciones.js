export const validarCampoVacio = (e) => {
    const input = e.target;
    const value = input.value.trim();

    value ? clearError(input) : setError(input, "Campo requerido");
};

const clearError = (input, mensaje) => {
    const $small = input.nextElementSibling;
    $small.textContent = "";
    input.classList.remove("inputError");
    $small.classList.remove("text-danger");
};

const setError = (input, mensaje) => {
    const $small = input.nextElementSibling;
    $small.textContent = mensaje || `${input.name} requerido`;
    input.classList.add("inputError");
    $small.classList.add("text-danger");
    input.classList.remove("inputOk");
};

export function agregarErrorAControles(form) {
    const controles = form.elements;
    for (const control of controles) {
        if (control.matches("[type=text]") || control.matches("[type=number]"))
            control.value
                ? clearError(control)
                : setError(control, "Campo requerido");
    }
}

export function quitarErrorAControles(form) {
    const controles = form.elements;
    for (const control of controles) {
        if (control.matches("[type=text]") || control.matches("[type=number]"))
            clearError(control);
    }
}

export function validarForm(form) {
    const controles = form.elements;
    for (const control of controles) {
        if (
            (control.matches("[type=text]") || control.matches("[type=number]")) &&
            (control.classList.contains("inputError") || control.value.length < 1) 
            // && control.matches("[type=number]").validarNumero()
        ) {
            return false;
        }
    }
    return true;
}

export const validarNumero = (e) => {
    const input = e.target;
    const numero = parseInt(input.value.trim());
    if (numero > -1) clearError(input);
    else setError(input, "Ingrese un numero, mayor o igual a 0");
};
