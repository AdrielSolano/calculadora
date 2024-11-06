const pantalla = document.querySelector('.pantalla');
let operacionPendiente = '';
let numeroanterior = '';
let operadoractual = null;
let reiniciarpantalla = false;

function agregar(valor) {
    if (reiniciarpantalla) {
        pantalla.value = '';
        reiniciarpantalla = false;
    }
    if (['+', '-', '*', '/', '√'].includes(valor)) {
        if (operadoractual !== null) {
            calcular();
        }
        numeroanterior = pantalla.value;
        operadoractual = valor;
        reiniciarpantalla = true;
    } else {
        pantalla.value += valor;
    }
}

function limpiar() {
    pantalla.value = '';
    operacionPendiente = '';
    numeroanterior = '';
    operadoractual = null;
}

function retroceso() {
    pantalla.value = pantalla.value.slice(0, -1);
}

function calcular() {
    if (operadoractual === null || reiniciarpantalla) return;

    const numero1 = parseFloat(numeroanterior);
    let resultado;

    if (operadoractual === '√') {
        resultado = Math.sqrt(numero1);
    } else {
        const numero2 = parseFloat(pantalla.value);

        if (isNaN(numero1) || isNaN(numero2)) {
            pantalla.value = 'Error';
            setTimeout(limpiar, 1500);
            return;
        }

        switch (operadoractual) {
            case '+':
                resultado = numero1 + numero2;
                break;
            case '-':
                resultado = numero1 - numero2;
                break;
            case '*':
                resultado = numero1 * numero2;
                break;
            case '/':
                if (numero2 === 0) { 
                    pantalla.value = 'Error'; 
                    setTimeout(limpiar, 1500); 
                    return;
                }
                resultado = numero1 / numero2;
                break;
        }
    }

    // Redondear a 8 decimales
    resultado = Math.round(resultado * 100000000) / 100000000;

    pantalla.value = resultado;
    operadoractual = null;
    numeroanterior = '';
    reiniciarpantalla = true;
}

// Manejo de eventos del teclado
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    const key = event.key;

    // Número y operadores
    if (/[0-9\+\-\*\/\.]/.test(key)) {
        agregar(key);
    }

    // Tecla Enter
    else if (key === 'Enter') {
        calcular();
    }

    // Tecla Escape para limpiar
    else if (key === 'Escape') {
        limpiar();
    }

    // Tecla Backspace para borrar el último carácter
    else if (key === 'Backspace') {
        retroceso();
    }
});
