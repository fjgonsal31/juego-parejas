// **************VARIABLES**************
// tabla
const imgs = [  "😍",  "😴",  "🤑",  "🥵",  "🥶",  "😱",  "😭",  "🤢",  "😍",  "😴",  "🤑",  "🥵",  "🥶",  "😱",  "😭",  "🤢",];
const tabla = document.getElementById("tabla");
let tdTag = document.getElementsByClassName("td");
let hideClass = document.getElementsByClassName("hide");

// reset cada 2 clics
let count = 0;
let first = "";
let firstPrevElement = "";
let second = "";
let secondPrevElement = "";

// cronómetro
const display = document.getElementById("time");
let timer = null;
let [min, seg] = [0, 0];
const btnStart = document.getElementById("start");
const btnRestart = document.getElementById("restart");

// modal
const modal = document.getElementById("myModal");
const btnAceptar = document.getElementById("aceptar");
const btnCancelar = document.getElementById("cancelar");
const user = document.getElementById("user");
const tablaRecords = document.getElementById("tablaRecords");
const trRecord1 = document.getElementById("userRecord1");
const trRecord2 = document.getElementById("userRecord2");
const trRecord3 = document.getElementById("userRecord3");
const content = document.getElementById("content");
let records = [];

// tooltip
let tooltip = document.getElementById("tooltip");

// **************FUNCIONES**************

// crear filas y celdas
function create() {
  const newImgs = desordenarArray(imgs);

  // crear filas
  for (let i = 0; i < 4; i++) {
    // for (let i = 0; i < 1; i++) {
    const tr = document.createElement("tr");

    tabla.appendChild(tr); // insertar fila a la tabla

    // crear celdas
    for (let x = 0; x < 4; x++) {
      // for (let x = 0; x < 2; x++) {
      const newTd = document.createElement("td");

      newTd.setAttribute("class", "td");
      tr.appendChild(newTd); // insertar celda a la fila
    }
  }

  // insertar datos en cada celda
  for (let i = 0; i < tdTag.length; i++) {
    const divShow = document.createElement("div");
    const divHide = document.createElement("div");

    tdTag[i].replaceChildren(); //borrar hijos de tag td
    tdTag[i].appendChild(divShow);
    tdTag[i].appendChild(divHide);
    divShow.setAttribute("class", "show");
    divHide.setAttribute("class", "hide");
    divShow.style.display = "none";
    divHide.style.display = "block";
    divShow.textContent = newImgs[i];
    divHide.textContent = "❔";
  }
}

// eliminar filas y celdas
function remove() {
  tabla.replaceChildren();
}

// resetear cada 2 clics
function reset(param) {
  count = param;
  first = "";
  second = "";
  firstPrevElement = "";
  secondPrevElement = "";
}

// clic en clase hide (descubrir emoticono)
function click() {
  Array.from(hideClass).forEach((element) => {
    element.addEventListener("click", function () {
      count++;
      // resetear cada 2 clics
      if (count > 2) {
        reset(1);
        Array.from(hideClass).forEach((element) => {
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

      element.style.display = "none";
      element.previousElementSibling.style.display = "block";

      // actuar si los 2 elementos son iguales y no están vacíos
      if (
        firstPrevElement.textContent === secondPrevElement.textContent &&
        firstPrevElement !== "" &&
        secondPrevElement !== ""
      ) {
        first.classList.add("none");
        second.classList.add("none");
        first.classList.remove("hide");
        second.classList.remove("hide");
        reset(0);
      }

      // actuar si toda la tabla está descubierta
      if (Array.from(hideClass).length < 1) {
        clearInterval(timer);
        modal.style.display = "block"; // abrir modal
        user.focus();
        content.textContent =
          "Tu tiempo es de " + min + " minutos y " + seg + " segundos";
        toggleBtnStart();
      }
    });
  });
}

// añadir records
function addRecords() {
  records.forEach((element, index) => {
    const position = document.createElement("td");
    const user = document.createElement("td");
    const time = document.createElement("td");
    let tr = null;

    switch (index + 1) {
      case 1:
        tr = trRecord1;
        break;
      case 2:
        tr = trRecord2;
        break;
      case 3:
        tr = trRecord3;
        break;
    }

    tr.appendChild(position);
    tr.appendChild(user);
    tr.appendChild(time);
    position.textContent = index + 1 + "º";
    user.textContent = element.user;
    time.textContent = tiempoMinutosSegundos(element.time);
  });
}

// alternar clases
function toggleBtnStart() {
  btnStart.classList.toggle("startDisabled");
  btnStart.classList.toggle("start");
}

// mezclar array
function desordenarArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

//***************** TIME ***********************/
// iniciar el cronómetro
function startTimer() {
  if (timer !== null) return; // Prevenir múltiples inicios
  timer = setInterval(updateDisplay, 1000); // Actualizar cada segundo
}

// reiniciar el cronómetro
function resetTimer() {
  clearInterval(timer); // Detener el cronómetro
  timer = null; // Resetear el intervalo
  [min, seg] = [0, 0]; // Resetear las variables
  display.innerText = "00:00"; // Resetear el display
}

// actualizar el cronómetro
function updateDisplay() {
  seg++;

  if (seg === 60) {
    seg = 0;
    min++;
  }

  // formatear el tiempo
  let m = min < 10 ? `0${min}` : min;
  let s = seg < 10 ? `0${seg}` : seg;

  // actualizar el display
  display.innerText = `${m}:${s}`;
}

// convertir tiempo a segundos
function tiempoSegundos(tiempo) {
  const [minutos, segundos] = tiempo.split(":").map(Number);

  return minutos * 60 + segundos;
}

// convertir segundos a minutos:segundos
function tiempoMinutosSegundos(tiempo) {
  const minutos = Math.floor(tiempo / 60);
  const segundosRestantes = tiempo % 60;
  const minutosFormateados = minutos.toString().padStart(2, "0");
  const segundosFormateados = segundosRestantes.toString().padStart(2, "0");

  return `${minutosFormateados}:${segundosFormateados}`;
}

//***************** LOCAL STORAGE ***********************/
// guardar records
function saveStorage() {
  localStorage.setItem("records", JSON.stringify(records));
}

// cargar records
function loadStorage() {
  const recordsStorage = localStorage.getItem("records");

  if (recordsStorage) {
    records = JSON.parse(recordsStorage);
  }
  addRecords();
}


//////////////////////////// EJECUCUION ////////////////////////////

// modal, clic en "Aceptar"
btnAceptar.addEventListener("click", function () {
  let tiempo = [min, seg].join(":");

  trRecord1.innerHTML = "";
  trRecord2.innerHTML = "";
  trRecord3.innerHTML = "";
  records.push({ user: user.value, time: tiempoSegundos(tiempo) });
  records.sort((a, b) => a.time - b.time);

  if (records.length > 3) {
    records.pop();
  }

  if (records) {
    addRecords();
  }

  if (user.value.trim()) {
    event.preventDefault();
    modal.style.display = "none";
  }

  tabla.style.cursor = "not-allowed";
  btnStart.disabled = false;
  user.value = "";
  resetTimer();
  remove();
  create();
  saveStorage();
  if (modal.style.display === "none") {
    tooltip.style.display = "block";
  }
});

// modal, clic en "Cancelar"
btnCancelar.addEventListener("click", function () {
  modal.style.display = "none";
  tooltip.style.display = "block";
});

// clic en iniciar
btnStart.addEventListener("click", function () {
  click();
  startTimer();
  toggleBtnStart();
  tabla.style.cursor = "pointer";
  btnStart.disabled = true;
  tooltip.style.display = "none";
});

// clic en resetear
btnRestart.addEventListener("click", function () {
  remove();
  create();
  resetTimer();

  if (btnStart.classList.contains("startDisabled")) {
    toggleBtnStart();
  }

  tabla.style.cursor = "not-allowed";
  tooltip.style.display = "block";
  btnStart.disabled = false;
});

create();
loadStorage();
