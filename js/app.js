
let perritos = [];

let posEditar = 0;

window.addEventListener('load', cargaDatosOnLoad);

const btnAgregar = document.getElementById('btnAgregar');
btnAgregar.addEventListener('click', agregarPerrito);

const btnModificar = document.getElementById('btnModificar');
btnModificar.addEventListener('click', editarPerrito);


const fichas = document.querySelector('.Contenedor-Fichas');

// LISTENERS
initApp();

document.addEventListener('load', initApp)

function initApp(){
    fichas.addEventListener('click', eliminarPerrito)
}



// const btnInfo = document.querySelector('button');
// btnInfo.addEventListener('click', cargaDatosOnLoad);

// FETCH API
function cargaDatosOnLoad(e){
    e.preventDefault();

    
    


    fetch('perritos.json')
        .then( response => {
            return response.json();
            //console.log(response.json());
        })
        // 2 caminos
        .then( data => {
            // console.log(data);
            // perritos = data;
            // console.log(perritos);

            cargarFichasPerritos(data);            

        })
        .catch( error => {
            console.log(error)
        })
       
}

function agregarPerrito(){

console.log(perritos[perritos.length-1].id + 1);

    const id = perritos[perritos.length-1].id + 1;
    const imagen = "perrito03";
    const nombre = document.getElementById('txtNombre').value;
    const telefono = document.getElementById('txtTelefono').value;
    const correo = document.getElementById('txtCorreo').value;
    const pais = document.getElementById('txtPais').value;
    const informacion = document.getElementById('txtInformacion').value;

    const perrito = {id, imagen, nombre, telefono, correo, pais, informacion};
    // console.log(perrito);
    perritos.push(perrito);

    cargarFichasPerritos(perritos);

    limpiarFormulario();
}

function cargarFichasPerritos(datos){

    let cont = 1;
    let template = '';
    perritos=datos;
    datos.forEach( data => {
        // console.log(data.title)
        const { id, imagen, nombre, telefono, correo, pais, informacion } = data 

        if (cont===1){
            template += `<div class="Ficha">`
        }

        template += `
        <article class="Ficha-Perrito">
            <div class="Ficha-Perrito-Cabecera">
                <a id="aEditar" class="Header-Link" href="#" data-ide="${id}">Editar</a>
                <div><img class="avatar" src="images/${imagen}.jpg" alt=""></div>
                <a id="aEliminar" class="Header-Link" href="#" data-idd="${id}">Eliminar</a>
            </div>
            <div class="Ficha-Perrito-Cuerpo">
                <p>${nombre}</p>
                <p>${telefono} | ${correo}</p>
                <p>${pais}</p>
                <p class="Ficha-Perrito-Cuerpo-Informacion">${informacion}</p>
            </div>
        </article>`

        if (cont===4){
            template += `</div>`
            cont = 0;
        }

        cont += 1;

    });

    Fichas.innerHTML = template;
}



function eliminarPerrito(e){
    e.preventDefault();
    
    const operacion =  e.target.getAttribute('id');

    console.log(operacion);


    if(operacion === 'aEditar'){
    
        id = e.target.getAttribute('data-ide');
        console.log(id);
        const posicion = perritos.findIndex(perrito => perrito.id == id);
        posEditar = posicion;


        console.log(posicion);

        document.getElementById('txtNombre').value = perritos[posicion].nombre;
        document.getElementById('txtTelefono').value = perritos[posicion].telefono;
        document.getElementById('txtCorreo').value = perritos[posicion].correo;
        document.getElementById('txtPais').value = perritos[posicion].pais;
        document.getElementById('txtInformacion').value = perritos[posicion].informacion;


        document.getElementById("btnAgregar").style.display = "none";
        document.getElementById("btnModificar").style.display = "inline";

        document.getElementById("myModal").style.display = "block";
    
    }else {
        if(operacion === 'aEliminar'){
    
            id = e.target.getAttribute('data-idd');
        
            const nuevoPerritos = perritos.filter( perrito => perrito.id != id);
        
            cargarFichasPerritos(nuevoPerritos);
        }
    }
        

}

function editarPerrito(e){
    e.preventDefault();

    perritos[posEditar].nombre = document.getElementById('txtNombre').value;
    perritos[posEditar].telefono = document.getElementById('txtTelefono').value;
    perritos[posEditar].correo = document.getElementById('txtCorreo').value;
    perritos[posEditar].pais = document.getElementById('txtPais').value;
    perritos[posEditar].informacion = document.getElementById('txtInformacion').value;

    console.log(perritos);

    cargarFichasPerritos(perritos);

    limpiarFormulario();
}

function limpiarFormulario(){
    document.getElementById('txtNombre').value = "";
    document.getElementById('txtTelefono').value = "";
    document.getElementById('txtCorreo').value = "";
    document.getElementById('txtPais').value = "";
    document.getElementById('txtInformacion').value = "";
}