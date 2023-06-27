export function crearTarjeta(superheroe) {
    const newCard = document.createElement("figure");

    for (const key in superheroe) {
        const div = document.createElement("div");
        if (key != "id") {
            const span = document.createElement("span");
            span.textContent = key + ": " + superheroe[key];
            div.appendChild(span);
        }
        div.classList.add("div_contenidoTarjeta");
        newCard.appendChild(div);
        newCard.classList.add("card");
    }

    return newCard;
}
