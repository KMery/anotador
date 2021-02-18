//Inicializan variables
// Array de todas las notas
let notas = [];
//Capturamos el lugar donde colocaremos todas nuestras notas guardadas
let notas_guardadas = document.getElementById("notas_guardadas");
//Trae storage
let notas_storage = localStorage.getItem("notas");

// Función para agregar nota nueva
const agregarNota = () => {
    //Capturo caja de texto
    let nota =  document.getElementById("nota_nueva");
    //Agrego la nueva nota a la lista de todas las notas en caso de no estar vacía
    if (nota.value === "") {
        alert("No puedes ingresar una nota vacía");
    } else {
        notas.push(nota.value);
        console.log('Array notas', notas);
        //Creamos parrafo con el contenido de la caja de texto y lo agregamos a la sección correspondiente
        crearParrafo(nota.value);
        //Guardo las nota nuevas en storage    
        guardarLocalStorage(notas);
        //Limpio caja de texto
        nota.value = "";
    };
};

//Funcion que crea nuevos párrafos dado un texto a incluir
const crearParrafo = (texto) => {
    //Generamos un nuevo párrafo
    let nuevo_parrafo = document.createElement("p");
    //Creamos icono para borrar parrafo
    let x_borrar = document.createElement("img");
    //Agrego div para incorporar p y img
    let div_parrafo = document.createElement("div");
    div_parrafo.className = "nota"
    //Agregar icono al elemento imagen
    x_borrar.src = "./utilidades/iconos/x_icono.svg";
    x_borrar.alt = "x";
    //Agregamos evento
    x_borrar.addEventListener('click', borrarNota);
    //Le adicionamos el contenido de la caja de texto al nuevo párrafo
    nuevo_parrafo.innerText = texto;
    //Incorporando img y p al div
    div_parrafo.appendChild(nuevo_parrafo);
    div_parrafo.appendChild(x_borrar);
    // Incorporando div al div de notas_guardadas
    notas_guardadas.appendChild(div_parrafo);
};

//Borrado de nota/s
//Función para borrar todas las notas de manera visual y del localStorage
const borrarTodasNotas = () => {
    notas_guardadas.querySelectorAll("*").forEach(nota => nota.remove());
    localStorage.removeItem("notas");
    notas = [];
    console.log('Las notas guardadas han sido borradas');
};

//Borrar solo una nota
const borrarNota = () => {
    //Obtengo icono y parrafo a borrar
    let icono_borrar = event.target;
    let parrafo_borrar = event.srcElement.previousElementSibling;
    //Borrar nota del array notas
    let indice_nota = notas.indexOf(parrafo_borrar.innerText);
    notas.splice(indice_nota, 1);
    //Remuevo icono y parrafo de la vista
    icono_borrar.remove();
    parrafo_borrar.remove();
    //Guardar el nuevo array notas en storage o si notas está vacio borrarlo
    if (notas.length > 0) {
        localStorage.setItem("notas", JSON.stringify(notas));
    } else {
        localStorage.removeItem("notas");
    };
    console.log('Nuevo array notas', notas);  
}; 

//Trabajamos con local storage
//Funcion que pasado un array de notas las guarda en localStorage
const guardarLocalStorage = (notas_a_guardar) => {
    //Verifica si existe en localStorage
    if (notas_storage == null) {
        //Crea localStorage para notas
        localStorage.setItem("notas", JSON.stringify(notas_a_guardar));    
    } else {
        //Pisa el localStorage con el array de notas completo con todas las notas existentes
        localStorage.setItem("notas", JSON.stringify(notas));
    };
};

//Al inicializar
//Si existe storage con datos crea los parrafos
if (notas_storage != null) {
    notas_storage = JSON.parse(notas_storage);
    console.log('notas_storage', notas_storage);
    //en notas guardo lo que sea que tenga en storage
    notas = notas_storage;
    //Muestro en página las notas existentes
    notas.forEach(parrafo => {
        crearParrafo(parrafo);
    });
};