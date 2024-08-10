// *************************************DECLARACIONES***************************************
// variables
let imgs = ["😍", "😴", "🤑", "🥵", "🥶", "😱", "😭", "🤢", "😍", "😴", "🤑", "🥵", "🥶", "😱", "😭", "🤢"];
let tabla = document.getElementById("tabla");
let tdTag = document.getElementsByTagName("td");
let hideClass = document.getElementsByClassName("hide");
let noneClass = document.getElementsByClassName("none");
let count = 0;
let first = "";
let firstPrevElement = "";
let second = "";
let secondPrevElement = "";

// mezclar un array
function desordenarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

// resetear cada 2 clics (sean pareja o no)
function reset(param) {
    count = param;
    first = "";
    second = "";
    firstPrevElement = "";
    secondPrevElement = "";
}

// eliminar todas las filas y sus celdas
function remove() {
    tabla.replaceChildren();
}

// crear todas las filas y sus celdas
function create() {
    let newImgs = desordenarArray(imgs);

    // crear filas
    for (let i = 0; i < 4; i++) {
        let tr = document.createElement("tr");
        // insertar fila a la tabla
        tabla.appendChild(tr);

        // crear celdas
        for (let x = 0; x < 4; x++) {
            let newTd = document.createElement("td");
            // insertar clase
            newTd.setAttribute("class", "td");
            // insertar celda a la fila
            tr.appendChild(newTd);
        }
    }

    // insertar datos en cada celda
    for (let i = 0; i < tdTag.length; i++) {
        let divShow = document.createElement("div");
        let divHide = document.createElement("div");

        //borrar hijos de tag td
        tdTag[i].replaceChildren();
        // añadir divs
        tdTag[i].appendChild(divShow);
        tdTag[i].appendChild(divHide);
        // insertar clases
        divShow.setAttribute("class", "show");
        divHide.setAttribute("class", "hide");
        // mostrar/ocultar elementos
        divShow.style.display = "none";
        divHide.style.display = "block";
        // insertar datos en cada div
        divShow.textContent = newImgs[i];
        divHide.textContent = "❔";
    }
}

// clic en clase hide
function click() {
    Array.from(hideClass).forEach((element) => {
        // clic en cada clase hide
        element.addEventListener("click", function () {
            count++;

            // resetear cada 2 clics
            if (count > 2) {
                reset(1);
                Array.from(hideClass).forEach(element => {
                    element.style.display = "block";
                    element.previousElementSibling.style.display = "none";
                });
            }

            // obtener elementos clicados
            if (count === 1) {
                first = element;
                firstPrevElement = element.previousElementSibling;
            } else if (count === 2) {
                second = element;
                secondPrevElement = element.previousElementSibling;
            }

            // mostrar/ocultar elementos
            element.style.display = "none";
            element.previousElementSibling.style.display = "block";

            // actuar si los 2 elementos son iguales y no están vacíos
            if (firstPrevElement.textContent === secondPrevElement.textContent && (firstPrevElement !== "" && secondPrevElement !== "")) {
                // insertar clases
                first.classList.add("none");
                second.classList.add("none");
                // eliminar clases
                first.classList.remove("hide");
                second.classList.remove("hide");
                reset(0);
            }

            // actuar si toda la tabla está descubierta
            if (Array.from(hideClass).length < 1) {
                remove();
                create();
                click();
            }
        });
    });
}

// *************************************LLAMADAS A FUNCIONES***************************************
create();
click();
