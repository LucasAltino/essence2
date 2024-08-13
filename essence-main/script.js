document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o elemento com id "mostrar-info"
    let mostrarInfo = document.getElementById("mostrar-info");

    // Seleciona o elemento com id "todas-info"
    let todasInfo = document.getElementById("todas-info");

    // Adiciona um evento de clique ao elemento mostrarInfo
    mostrarInfo.addEventListener("click", function() {
        // Alterna a exibição da div todasInfo
        if (todasInfo.style.display === 'none') {
            todasInfo.style.display = 'flex'; // Mostra a div
            mostrarInfo.style.transform= 'rotate(180deg)';
        } else {
            todasInfo.style.display = 'none'; // Esconde a div
            mostrarInfo.style.transform= 'rotate(0deg)';
        }
    });
});


document.querySelector('.mudagrafico').addEventListener('click', function() {
    var myChart = document.getElementById('myChart');
    var barChart = document.getElementById('bar-chart');
    if (myChart.style.display === 'none') {
        myChart.style.display = 'block';
        barChart.style.display = 'none';
    } else {
        myChart.style.display = 'none';
        barChart.style.display = 'block';
    }
});

document.querySelector('.mudagrafico2').addEventListener('click', function() {
    var myChart2 = document.getElementById('myChart2');
    var barChart2 = document.getElementById('bar-chart2');
    if (myChart2.style.display === 'none') {
        myChart2.style.display = 'block';
        barChart2.style.display = 'none';
    } else {
        myChart2.style.display = 'none';
        barChart2.style.display = 'block';
    }
});



// Seleciona o SVG pelo ID
const svgIcon = document.getElementById('icon');
const svgIcon2 = document.getElementById('icon3');

// Seleciona a div que será mostrada
const sidebarDiv = document.querySelector('.sidebar');
const burguer = document.querySelector('.icon2');


// Adiciona um evento de clique ao SVG
svgIcon.addEventListener('click', function() {
    // Verifica se a div já está visível
    if (sidebarDiv.style.display === 'none') {
        // Se estiver invisível, torna visível
        sidebarDiv.style.display = 'block';
        burguer.style.display = 'block';
        
    } else {
        // Caso contrário, esconde a div
        sidebarDiv.style.display = 'none';
        burguer.style.display = 'none';

    }
});


// Adiciona um evento de clique ao SVG
svgIcon2.addEventListener('click', function() {
    // Verifica se a div já está visível
    if (sidebarDiv.style.display === 'none') {
        // Se estiver invisível, torna visível
        sidebarDiv.style.display = 'block';
        burguer.style.display = 'block';
        
    } else {
        // Caso contrário, esconde a div
        sidebarDiv.style.display = 'none';
        burguer.style.display = 'none';

    }
});

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCiLa_gjrPdKNmS1pyvgZqn50hn4bR8wQE",
    authDomain: "future-skills-ea233.firebaseapp.com",
    databaseURL: "https://future-skills-e8f95-default-rtdb.firebaseio.com/",
    projectId: "future-skills-ea233",
    storageBucket: "future-skills-ea233.appspot.com",
    messagingSenderId: "690827911826",
    appId: "1:690827911826:web:c34ea8368e4f47f1d1fc4b",
    measurementId: "G-02LF6035CX"
};

// Inicialização do Firebase
firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();
const dateListContainer = document.getElementById('date-list');
const selectedDateElement = document.getElementById('selected-date');
let selectedDate = '';

// Função para obter a lista de datas disponíveis no banco de dados
databaseRef.once('value', (snapshot) => {
    const data = snapshot.val();
    const dates = Object.keys(data);
    
    dates.forEach((date) => {
        const dateContainer = document.createElement('div');
        const dateItem = document.createElement('p');
        const verMaisElement = document.createElement('div');

        dateItem.textContent = date;
        dateItem.classList.add('date-item');
        
        verMaisElement.textContent = 'Ver mais';
        verMaisElement.classList.add('vermais');

        dateContainer.classList.add('listagem');
        
        verMaisElement.addEventListener('click', () => {
            selectedDate = date;
            selectedDateElement.textContent = selectedDate;
            fetchAndDisplayDataForDate(selectedDate);
        });

        dateContainer.appendChild(dateItem);
        dateContainer.appendChild(verMaisElement);
        dateListContainer.appendChild(dateContainer);
    });
});

function fetchAndDisplayDataForDate(date) {
    const messagesRef = firebase.database().ref(date);

    messagesRef.on('child_added', function(snapshot) {
        const message = snapshot.val();
        displayMessage(message);
    });
}

    
// Referência para o nó 'dados' no Realtime Database
// Obter a data atual
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1; // Mês começa do zero, então adicionamos 1
let day = today.getDate();

// Construir a string da referência
let path = `${year}-${month}-${day}`;
let messagesRef = firebase.database().ref(path);

// Captura de novas mensagens
messagesRef.on('child_added', function (snapshot) {
    let message = snapshot.val();
    displayMessage(message);
});

// Função para exibir mensagem na interface
let horarios = []; // Array para armazenar os horários
let temperaturas = [];

// Função para calcular a média
function calcularMedia(valores) {
    let soma = valores.reduce((a, b) => a + b, 0);
    return (soma / valores.length) || 0;
}

// Função para calcular a variância
function calcularVariancia(valores) {
    let media = calcularMedia(valores);
    let variancia = valores.reduce((soma, valor) => soma + Math.pow(valor - media, 2), 0) / valores.length;
    return variancia || 0;
}

let fluxos = [];

// Função para calcular a média
function calcularMediaF(valores) {
    let soma = valores.reduce((a, b) => a + b, 0);
    return (soma / valores.length) || 0;
}

// Função para calcular a variância
function calcularVarianciaF(valores) {
    let media = calcularMedia(valores);
    let variancia = valores.reduce((soma, valor) => soma + Math.pow(valor - media, 2), 0) / valores.length;
    return variancia || 0;
}

function displayMessage(message) {
    // Extrai apenas o horário da data
    let horarioCompleto = new Date(message.data);
    let horario = horarioCompleto.toLocaleTimeString('pt-BR', {
        minute: '2-digit',
        second: '2-digit'
    });

    // Adiciona o horário ao array de horários
    horarios.push(horarioCompleto);

    // Calcula o tempo de funcionamento se houver mais de um horário na lista
    let funcionamento = '';
    if (horarios.length > 1) {
        let primeiroHorario = horarios[0];
        let ultimoHorario = horarios[horarios.length - 1];
        let diferencaMs = ultimoHorario - primeiroHorario;

        let diferencaMinutos = Math.floor(diferencaMs / 60000); // Converte de milissegundos para minutos
        let diferencaSegundos = Math.floor((diferencaMs % 60000) / 1000); // Converte o restante de milissegundos para segundos

        funcionamento = `${diferencaMinutos}h ${diferencaSegundos}m`;
    }

    let mensagemLista = document.getElementById('mensagem-lista');
    let mensagemLista2 = document.getElementById('mensagem-lista2');

    let infoDiv = document.querySelector('.info');
    let infoDiv2 = document.querySelector('.info2');
    let infoDiv3 = document.querySelector('.info3');

    let dadosDiv = document.querySelector('.dados');
    let dadosDiv2 = document.querySelector('.dados2');
    let dadosDiv3 = document.querySelector('.dados3');
    let dadosDiv4 = document.querySelector('.dados4');
    let dadosDiv5 = document.querySelector('.dados5');
    let dadosDiv6 = document.querySelector('.dados6');

    let notificacaoDiv = document.querySelector('.notificatudo');
    let notificacaoDiv2 = document.querySelector('.notificatudo2');
    let bolaNotifica = document.querySelector('.bolanotifica');
    let bolaNotifica2 = document.querySelector('.bolanotifica2');


    // Adiciona a temperatura ao array de temperaturas
    temperaturas.push(message.termometro);

    // Calcula a média e a variância das temperaturas
    let termometroMedia = calcularMedia(temperaturas);
    let termometroVariacao = calcularVariancia(temperaturas);

    // Adiciona a temperatura ao array de temperaturas
    fluxos.push(message.fluxo);

    // Calcula a média e a variância das temperaturas
    let fluxoMedia = calcularMediaF(fluxos);
    let fluxoVariacao = calcularVarianciaF(fluxos);

    // Atualiza a div de informações
    infoDiv.innerHTML = `<p style="font-size: 3.5vw;font-weight: 600; width: 15vw;">${message.termometro}° C</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path fill="#ffffff" d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1.1.3.2.6.2.6.8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8.1-.3.2-.5.2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V272c0-8.8 7.2-16 16-16s16 7.2 16 16v50.7c18.6 6.6 32 24.4 32 45.3z"/>
        </svg>`;

    // Atualiza a div de informações
    infoDiv2.innerHTML = `<p style="font-size: 2.8vw;font-weight: 600; width: 15vw;">${message.fluxo} m³/h</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#ffffff" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
        </svg>`;

    infoDiv3.innerHTML = `<p style="font-size: 3vw;font-weight: 600; width: 16vw;">${funcionamento}</p>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"/></svg>
    `;

    dadosDiv.innerHTML = `<p>${termometroMedia.toFixed(2)}° C</p>`;

    dadosDiv2.innerHTML = `<p>${Math.sqrt(termometroVariacao).toFixed(2)}° C</p>`;

    dadosDiv4.innerHTML = `<p>${fluxoMedia.toFixed(2)} m³/h</p>`;

    dadosDiv5.innerHTML = `<p>${Math.sqrt(fluxoVariacao).toFixed(2)} m³/h</p>`;

    if (message.termometro > 35){
        dadosDiv3.innerHTML = `<p>Temperatura anormal</p>`
    }else{
        dadosDiv3.innerHTML = `<p>Eficiente</p>`
    }

    if (message.fluxo > 5 | message.fluxo < 2){
        dadosDiv6.innerHTML = `<p>Ineficiente</p>`
    }else{
        dadosDiv6.innerHTML = `<p>Eficiente</p>`
    }



    // Verifica a temperatura e adiciona a classe 'alerta' se necessário
    if (message.termometro > 35) {
        notificacaoDiv.innerHTML = `
            <div class="alerta">
                <div class="bolav">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="height: 2.8vw !important;width: 3.1vw !important;">
                        <path fill="#ffff" d="M128 112c0-26.5 21.5-48 48-48s48 21.5 48 48V276.5c0 17.3 7.1 31.9 15.3 42.5C249.8 332.6 256 349.5 256 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9c8.2-10.6 15.3-25.2 15.3-42.5V112zM176 0C114.1 0 64 50.1 64 112V276.4c0 .1-.1 .3-.2 .6-.2 .6-.8 1.6-1.7 2.8C43.2 304.2 32 334.8 32 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1-.9-1.2-1.5-2.2-1.7-2.8-.1-.3-.2-.5-.2-.6V112C288 50.1 237.9 0 176 0zm0 416c26.5 0 48-21.5 48-48 0-20.9-13.4-38.7-32-45.3V112c0-8.8-7.2-16-16-16s-16 7.2-16 16V322.7c-18.6 6.6-32 24.4-32 45.3 0 26.5 21.5 48 48 48zM480 160h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8h32V448c0 17.7 14.3 32 32 32s32-14.3 32-32V160z"/>
                    </svg>
                </div>
                <div class="textos">
                    <h4 style="color: black;font-size: 1.5vw;">Atenção</h4>
                    <p style="color: black;font-size: 1vw;">Temperatura do equipamento próxima ao seu limite tolerado</p>
                </div>
            </div>
        `;
        bolaNotifica.style.display = 'block';
        notificacaoDiv.style.display = 'flex';
    } else {
        notificacaoDiv.style.display = 'none';
        bolaNotifica.style.display = 'none';
    }

    // Verifica o fluxo e adiciona a classe 'alerta' se necessário
    if (message.fluxo > 5) {
        notificacaoDiv2.innerHTML = `
            <div class="alerta">
                <div class="bolav">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 2.8vw !important;width: 3.1vw !important;">
                        <path fill='#ffff' d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM256 416c35.3 0 64-28.7 64-64c0-17.4-6.9-33.1-18.1-44.6L366 161.7c5.3-12.1-.2-26.3-12.3-31.6s-26.3 .2-31.6 12.3L257.9 288c-.6 0-1.3 0-1.9 0c-35.3 0-64 28.7-64 64s28.7 64 64 64zM176 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM96 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm352-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
                    </svg>
                </div>
                <div class="textos">
                    <h4 style="color: black;font-size: 1.5vw;">Atenção</h4>
                    <p style="color: black;font-size: 1vw;">Fluxo do equipamento acima de seu limite tolerado</p>
                </div>
            </div>
        `;
        notificacaoDiv2.style.display = 'flex';
        bolaNotifica2.style.display = 'block';

    } else {
        notificacaoDiv2.style.display = 'none';
        bolaNotifica2.style.display = 'none';

    }

    // Adiciona a nova mensagem à lista de mensagens
    let mensagemHTML = `
        <div class="mensagem-item">
            <p>${horario}</p> <!-- Mostra apenas o horário -->
            <p>${message.termometro}° C</p>
            <p>${message.fluxo}</p>
            <p>${funcionamento}</p>
        </div>
    `;
    mensagemLista.insertAdjacentHTML('afterbegin', mensagemHTML);


}

// Captura dos últimos 10 valores de temperatura
messagesRef.orderByKey().limitToLast(10).on('value', function (snapshot) {
    let valoresTemperatura = [];
    let valoresTemperatura2 = [];

    snapshot.forEach(function(childSnapshot) {
        let data = childSnapshot.val();
        valoresTemperatura.push(data.termometro); // Adiciona temperatura à lista
        valoresTemperatura2.push(data.termometro); // Adiciona temperatura à lista
    });
    atualizarGraficoTemperatura(valoresTemperatura); // Inverter para exibir do mais recente para o mais antigo
    atualizarGraficoTemperatura2(valoresTemperatura2); // Inverter para exibir do mais recente para o mais antigo
    atualizarUltimaTemperatura(valoresTemperatura[valoresTemperatura.length - 1]); // Atualiza a última temperatura na interface
    atualizarUltimaTemperatura2(valoresTemperatura2[valoresTemperatura2.length - 1]); // Atualiza a última temperatura na interface

});


// Função para atualizar o gráfico de temperatura
function atualizarGraficoTemperatura(valoresTemperatura) {
    const xValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Índices para os últimos 10 valores


    new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{ 
                data: valoresTemperatura,
                
                borderColor: "#515BA0",
                fill: false
            }]
        },
        options: {
            animation: {
                duration: 0 // Configura a duração da animação para 0 (desativando-a)
            },
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: {
                        max: 160,
                    }
                }]
            }
        }
    });
}

// Função para atualizar a última temperatura na interface
function atualizarUltimaTemperatura(ultimaTemperatura) {
    let temperaturaAtualElement = document.getElementById('temperaturaAtual');
    temperaturaAtualElement.textContent = `${ultimaTemperatura} °C`;
}
function atualizarUltimaTemperatura2(ultimaTemperatura2) {
    let temperaturaAtualElement = document.getElementById('temperaturaAtual');
    temperaturaAtualElement.textContent = `${ultimaTemperatura2} °C`;
}


// Captura dos últimos 10 valores de temperatura
messagesRef.orderByKey().limitToLast(10).on('value', function (snapshot) {
    let valoresFluxo = [];
    let valoresFluxo2 = [];

    snapshot.forEach(function(childSnapshot) {
        let data = childSnapshot.val();
        valoresFluxo.push(data.fluxo); // Adiciona temperatura à lista
        valoresFluxo2.push(data.fluxo); // Adiciona temperatura à lista

    });
    atualizarGraficoFluxo(valoresFluxo); // Inverter para exibir do mais recente para o mais antigo
    atualizarGraficoFluxo2(valoresFluxo2); // Inverter para exibir do mais recente para o mais antigo
    atualizarUltimaFluxo(valoresFluxo[valoresFluxo.length - 1]); // Atualiza a última temperatura na interface
    atualizarGraficoFluxo2(valoresFluxo2); // Inverter para exibir do mais recente para o mais antigo
    atualizarUltimaFluxo2(valoresFluxo2[valoresFluxo2.length - 1]); // Atualiza a última temperatura na interface
});

// Função para atualizar o gráfico de temperatura
function atualizarGraficoFluxo(valoresFluxo) {
    const xValues2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Índices para os últimos 10 valores

    new Chart("myChart2", {
        type: "line",
        data: {
            labels: xValues2,
            datasets: [{ 
                data: valoresFluxo,
                borderColor: "#1CB687",
                fill: false
            }]
        },
        options: {
            animation: {
                duration: 0 // Configura a duração da animação para 0 (desativando-a)
            },
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: {
                        max: 10,
                    }
                }]
            }
        }
    });
}

// Função para atualizar a última temperatura na interface
function atualizarUltimaFluxo(ultimaFluxo) {
    let fluxoAtualElement = document.getElementById('fluxoAtual');
    fluxoAtualElement.textContent = `${ultimaFluxo} m³/h`;
}

function atualizarUltimaFluxo2(ultimaFluxo2) {
    let fluxoAtualElement = document.getElementById('fluxoAtual');
    fluxoAtualElement.textContent = `${ultimaFluxo2} m³/h`;
}

// ========================================================================================
// Função para atualizar o gráfico de temperatura
function atualizarGraficoTemperatura2(valoresTemperatura2) {
    const xValues3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Índices para os últimos 10 valores

    new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
        labels: xValues3,
        datasets: [{ 
            data: valoresTemperatura2,
            borderColor: "#515BA0",
            backgroundColor: "#515BA0",
            fill: false
        }]
    },
    options: {
        animation: {
                duration: 0 // Configura a duração da animação para 0 (desativando-a)
            },
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: {
                        max: 160,
                    }
                }]
            }
    }
});
}


function atualizarGraficoFluxo2(valoresFluxo2) {
    const xValues4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Índices para os últimos 10 valores

    new Chart(document.getElementById("bar-chart2"), {
    type: 'bar',
    data: {
        labels: xValues4,
        datasets: [{ 
            data: valoresFluxo2,
            borderColor: "#515BA0",
            backgroundColor: "#1CB687",
            fill: false
        }]
    },
    options: {
        animation: {
                duration: 0 // Configura a duração da animação para 0 (desativando-a)
            },
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: {
                        max: 10,
                    }
                }]
            }
    }
});
}
