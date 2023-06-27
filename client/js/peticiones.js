export const getFetch = async (URL, spinner) => {
    try {
        spinner.style.display = "flex";
        let res = await fetch(URL);
        if (!res.ok) throw Error(`Error: ${res.status} - ${res.statusText}`);

        let data = await res.json();
        return data;
    } catch (err) {
        console.error(err.message);
    } finally {
        spinner.style.display = "none";
    }
};

export const createAjax = (URL, data, spinner) => {
    const xhr = new XMLHttpRequest();
    spinner.style.display = "flex";
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                alert(data);
            } else {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
            spinner.style.display = "none";
        }
    });
    xhr.open("POST", URL);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(data));
};

export const updateAjax = (URL, data, spinner) => {
    const xhr = new XMLHttpRequest();
    spinner.style.display = "flex";
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            } else {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
            spinner.style.display = "none";
        }
    });
    xhr.open("PUT", URL + "/" + data.id);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(data));
};

export const deleteAjax = (URL, id, spinner) => {
    const xhr = new XMLHttpRequest();
    spinner.style.display = "flex";
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            } else {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
            spinner.style.display = "none";
        }
    });
    xhr.open("DELETE", URL + "/" + id);
    xhr.send();
};
