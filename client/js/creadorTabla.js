export const crearTabla = (data, colorCabecera) => {
    if (!Array.isArray(data)) return null;
    const $tabla = document.createElement("table");

    $tabla.id = "tabla_content";
    $tabla.classList.add("table");
    $tabla.classList.add("table-success");
    $tabla.classList.add("table-hover");
    $tabla.classList.add("table-striped");
    $tabla.appendChild(crearCabecera(data[0], colorCabecera));
    $tabla.appendChild(crearCuerpo(data));
    cargarCheckBox(data[0]);
    return $tabla;
};

const crearCabecera = (data, colorFondo) => {
    const $tHead = document.createElement("thead");
    const $tr = document.createElement("tr");

    $tr.style.setProperty("background-color", colorFondo);
    for (const key in data) {
        if (key === "id") continue;

        const $th = document.createElement("th");
        $th.textContent = key;
        $th.classList.add(key);
        $tr.appendChild($th);
    }
    $tHead.appendChild($tr);

    return $tHead;
};

const crearCuerpo = (data) => {
    if (!Array.isArray(data)) return null;

    const $tBody = document.createElement("tbody");

    data.forEach((element, index) => {
        const $tr = document.createElement("tr");
        if (index % 2 == 0) {
            $tr.classList.add("rowPar");
        }

        for (const key in element) {
            if (key === "id") {
                $tr.dataset.id = element[key];
            } else {
                const $td = document.createElement("td");
                $td.textContent = element[key];
                $td.classList.add(key);
                $tr.appendChild($td);
            }
        }
        $tBody.appendChild($tr);
    });

    return $tBody;
};

export const actualizarTabla = (contenedor, data) => {
    while (contenedor.hasChildNodes()) {
        contenedor.removeChild(contenedor.firstChild);
    }
    if (data.length > 0) {
        contenedor.appendChild(crearTabla(data, "#ff003b"));
        calcularPromedio(data);
    }
};

function calcularPromedio(array) {
    const acumulador = array.reduce((acumulador, item) => {
        const fuerzaNumerica = parseFloat(item.fuerza);
        return acumulador + fuerzaNumerica;
    }, 0);

    const promedio = acumulador / array.length;

    const promedioElement = document.getElementById("promedio_content");
    promedioElement.value = promedio;

    return promedio;
}

function cargarCheckBox(data) {
    const container = document.getElementById("container_checkBox");

    const keys = [];
    for (let key in data) {
        if (key === "id") continue;
        if (!keys.includes(key)) {
            keys.push(key);
        }
    }

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    keys.forEach((key) => {
        const $checkbox_div = document.createElement("div");
        $checkbox_div.classList.add("checkbox_div");
        $checkbox_div.classList.add("container");
        
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.value = key;
        checkBox.id = `cb_${key}`;
        checkBox.checked = true;
        checkBox.addEventListener("change", actualizarColumnas);

        const label = document.createElement("label");
        label.textContent = key;
        label.htmlFor = `cb_${key}`;
        label.classList.add("ms-2");
        $checkbox_div.appendChild(checkBox);
        $checkbox_div.appendChild(label);
        container.appendChild($checkbox_div);
    });
}

function actualizarColumnas() {
    const tabla = document.getElementById("tabla_content");
    const container = document.getElementById("container_checkBox");
    const checkBoxes = container.querySelectorAll('input[type="checkbox"]');

    checkBoxes.forEach((check) => {
        const columna = tabla.querySelectorAll(
            `th.${check.value}, td.${check.value}`
        );
        columna.forEach((element) => {
            element.style.display = check.checked ? "table-cell" : "none";
        });
    });
}

export function crearSelectEditorial(data) {
    const container = document.getElementById("container_select");
    const select = document.createElement("select");
    select.id = "select_id";
    cargarSelectEditorial(data, select, container);
    // const datafiltrada = [];
    // data.forEach((item) => {
    //     if (!datafiltrada.includes(item)) {
    //         datafiltrada.push(item);
    //     }
    // });

    // const optionTodos = document.createElement("option");
    // optionTodos.value = "todos";
    // optionTodos.textContent = "Todos";
    // select.appendChild(optionTodos);

    // datafiltrada.forEach((editorial) => {
    //     const option = document.createElement("option");
    //     option.value = editorial;
    //     option.textContent = editorial;
    //     select.appendChild(option);
    // });
    // container.appendChild(select);
}

function cargarSelectEditorial(data, select, container) {
    const datafiltrada = [];
    data.forEach((item) => {
        if (!datafiltrada.includes(item)) {
            datafiltrada.push(item);
        }
    });

    const optionTodos = document.createElement("option");
    optionTodos.value = "todos";
    optionTodos.textContent = "Todos";
    select.appendChild(optionTodos);

    datafiltrada.forEach((editorial) => {
        const option = document.createElement("option");
        option.value = editorial;
        option.textContent = editorial;
        select.appendChild(option);
    });
    container.appendChild(select);
}

export function actualizarSelectEditorial(data) {
    const container = document.getElementById("container_select");
    const select = document.getElementById("select_id");

    // Eliminar las opciones anteriores del select
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    cargarSelectEditorial(data, select, container);
}
