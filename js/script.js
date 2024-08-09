let imgs = ["😍", "😴", "🤑", "🥵", "🥶", "😱", "😭", "🤢", "😍", "😴", "🤑", "🥵", "🥶", "😱", "😭", "🤢"];
let tabla = document.getElementById("tabla");
let newImgs = desordenarArray(imgs);
let tdTag = document.getElementsByTagName("td");
let tdClass = document.getElementsByClassName("td");
let hideClass = document.getElementsByClassName("hide");

// función para mezclar un array
function desordenarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

// crear filas y celdas
for (let i = 0; i < 4; i++) {
    let tr = document.createElement("tr");
    tabla.appendChild(tr);

    for (let x = 0; x < 4; x++) {
        let newTd = document.createElement("td");
        newTd.setAttribute("class", "td");
        tr.appendChild(newTd);
    }
}

// insertar iconos en cada celda
let count = 0;
let first = "";
let second = "";

for (let i = 0; i < tdTag.length; i++) {
    let divShow = document.createElement("div");
    let divHide = document.createElement("div");

    tdTag[i].appendChild(divShow);
    tdTag[i].appendChild(divHide);
    divShow.setAttribute("class", "show");
    divHide.setAttribute("class", "hide");
    divShow.style.display = "none";
    divHide.style.display = "block";
    divShow.textContent = newImgs[i];

    // click en cada clase td
    hideClass[i].addEventListener("click", function () {
        count++;
        divShow.style.display = "block";
        divHide.style.display = "none";

        switch (count) {
            case 1:
                first = hideClass[i].previousElementSibling;
                break;
            case 2:
                second = hideClass[i].previousElementSibling;
                break;
        }

        if (count > 2) {
            for (let i = 0; i < hideClass.length; i++) {
                hideClass[i].style.display = "block";
                hideClass[i].previousElementSibling.style.display = "none";
            }
            count = 0;
            first = "";
            second = "";
        }

        if (first.textContent == second.textContent && (first != "" && second != "")) {
            hideClass[i].previousElementSibling.classList.add("always");
            hideClass[i].previousElementSibling.classList.remove("show");
            count = 0;
            first = "";
            second = "";
            console.log("dentro");
        }
    });
}
