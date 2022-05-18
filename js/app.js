//variables
const btnEnviar = document.querySelector('#enviar');

//variables para campos

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

eventListener();
function eventListener(){
    // cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // campos del formulario
    email.addEventListener('blur', validaFormulario);
    asunto.addEventListener('blur', validaFormulario);
    mensaje.addEventListener('blur', validaFormulario);
}



//funciones

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed','opacity-50');
}

// Valida el formulario
function validaFormulario(e) {
    
    if (e.target.value.length > 0) {
        console.log("si hay algo");
    } else {
        e.target.classList.add('error', 'border-red-500')
    }
}