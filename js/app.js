//variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const inputs = document.querySelectorAll('input');
const textarea = document.querySelector('textarea');
const formulario = document.querySelector('#enviar-mail');

//variables para campos

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListener();
function eventListener(){
    // cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    /* campos del formulario
    blur se dispara cuando salgo del input */
    email.addEventListener('blur', validaFormulario);
    asunto.addEventListener('blur', validaFormulario);
    mensaje.addEventListener('blur', validaFormulario);

    //Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);
}



//funciones

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed','opacity-50');
}

// Valida el formulario
function validaFormulario(e) {
    
    if (e.target.value.length > 0) {
        // elimina los errores....
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        // intercambio de clases
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
        
        if( er.test( e.target.value)) {
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no  válido');
        }
    }
    //si todos las campos se cumplen, se habilita el botón de enviar
    if(er.test( email.value) && asunto.value !=="" && mensaje.value !==""){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed','opacity-50');
    } else {
        btnEnviar.disabled = true;
        btnEnviar.classList.add('cursor-not-allowed','opacity-50');
    }

}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    //mostrar solo un mensaje de error
    //usamos  querySelectorAll para tener acceso a una colección y poder verificar la propiedad length
    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }

}

//enviar email
function enviarEmail(e) {
    e.preventDefault();

    //mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Después de 3 segundos ocultar el spinner y mostrar el mensaje de enviado
    setTimeout(() => {

        spinner.style.display = 'none';

        //mensaje enviado correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('border', 'border-black-500', 'bg-green-500', 'text-center', 'text-black-700', 'p-3', 'mt-5', 'mb-5', 'uppercase', 'font-bold' )

        //insertar dentro del formulario, el párrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();
            resetearFormulario();
        }, 4000);

        

    }, 3000);
}


//funcion para resetear el formulario

function resetearFormulario(){
    
    formulario.reset();
    iniciarApp();
    for(input of inputs){
        input.classList.remove('border-green-500');
    }
    textarea.classList.remove('border-green-500');

}