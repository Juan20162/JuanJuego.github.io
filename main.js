// Inicializacion de variabels
let cardsuncovered = 0;
let cards1 = null;
let cards2 = null;
let firstresult = null;
let secondresult = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

//Apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');
//Generacion de numeros aleatorios
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => { return Math.random() - 0.5 });
console.log(numbers);

//Funciones
function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }
    }, 1000);
}

// Bloquedo de tarjetas
function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numbers[i];
        tarjetaBloqueada.disabled = true;
    }
}
// Funcion principal
function destapar(id) {

    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }


    cardsuncovered++;
    console.log(cardsuncovered);

    if (cardsuncovered == 1) {
        //mostrar primer numero
        cards1 = document.getElementById(id);
        firstresult = numbers[id]
        cards1.innerHTML = firstresult;

        //Deshabilitar primer boton
        cards1.disabled = true;
    } else if (cardsuncovered == 2) {
        //mostrar segundo numero
        cards2 = document.getElementById(id);
        secondresult = numbers[id];
        cards2.innerHTML = secondresult;

        //Deshabilitar segundo boton
        cards2.disabled = true;

        //incrementar movimientos;
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (firstresult == secondresult) {
            //Encerar contador tarjetas destapadas
            cardsuncovered = 0;

            //Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos == 8) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
                mostrarTiempo.innerHTML = `Fantastico solo te demoraste: ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
            }
        } else {
            //mostrar momentaneamente valores y volver a taparlos
            setTimeout(() => {
                cards1.innerHTML = '';
                cards2.innerHTML = '';
                cards1.disabled = false;
                cards2.disabled = false;
                cardsuncovered = 0;
            }, 800);

        }


    }
}