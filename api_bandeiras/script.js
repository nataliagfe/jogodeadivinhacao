let correctCountry;
let options = [];
// Criação da variável para receber a pontuação do usuário
let pontuacao = 0;

function getCountryNameInPortuguese(country) {
    // Verifica se há tradução para português
    return country.translations && country.translations.por ?
        country.translations.por.common : country.name.common;
}

// Função para atualizar a pontuação na tela
function updatePontuacao() {
    document.getElementById('pontos').innerText = pontuacao;
}

function getRandomCountries() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            // Seleciona um país aleatório como o correto
            const randomIndex = Math.floor(Math.random() * data.length);
            correctCountry = data[randomIndex];
            options = [correctCountry];

            // Adiciona mais 3 opções aleatórias de países
            while (options.length < 4) {
                const randomOption = data[Math.floor(Math.random() * data.length)];
                if (!options.includes(randomOption)) {
                    options.push(randomOption);
                }
            }

            // Embaralha as opções
            options.sort(() => Math.random() - 0.5);

            displayQuestion();
        })
        .catch(error => console.error('Erro:', error));
}

function displayQuestion() {
    // Exibe a bandeira do país correto
    document.getElementById('flagImage').src = correctCountry.flags.png;
    document.getElementById('flagImage').style.display = 'block';

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ''; // Limpa as opções anteriores

    optionsDiv.style.display = 'flex';
    optionsDiv.style.flexDirection = 'column';
    optionsDiv.style.alignItems = 'center';
    optionsDiv.style.position = 'absolute';
    optionsDiv.style.top = '25%';
    optionsDiv.style.left = '60%';

    // Cria botões para as opções de países
    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = getCountryNameInPortuguese(option);
        button.onclick = () => checkAnswer(option);

        // Estilizando os botões
        button.style.padding = '10px 20px';
        button.style.fontSize = '16px';
        button.style.backgroundColor = '#EAD8B1';
        button.style.color = 'gray';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.marginBottom = '30px';
        button.style.width = '200%';


        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selected) {
    const resultDiv = document.getElementById('result');

    if (selected.name.common === correctCountry.name.common) {
        resultDiv.innerHTML = '<p>Correto!</p>';
        // Somando +1 na pontução do usuário
        pontuacao += 1;

        // Estilizando a mensagem de acerto ou erro
        resultDiv.style.position = 'absolute';
        resultDiv.style.top = '10%';
        resultDiv.style.left = '65%';
        resultDiv.style.fontSize = '150%'
        resultDiv.style.fontFamily = 'Arial';
        resultDiv.style.color = 'white'
    } else {
        resultDiv.innerHTML = `<p>Incorreto! O país correto era: ${getCountryNameInPortuguese(correctCountry)}</p>`;
        // Diminuindo -2 na pontução do usuário
        pontuacao -= 2;

        // Estilizando a mensagem de acerto ou erro
        resultDiv.style.position = 'absolute';
        resultDiv.style.top = '10%';
        resultDiv.style.left = '55%';
        resultDiv.style.fontSize = '150%'
        resultDiv.style.fontFamily = 'Arial';
        resultDiv.style.color = 'white'
    }

    // Atualização do sistema de pontuação
    updatePontuacao();

    // Exibe o botão "Próximo" após uma resposta
    document.getElementById('nextButton').style.display = 'block';

}

document.getElementById('nextButton').onclick = () => {
    document.getElementById('result').innerHTML = ''; // Limpa o resultado anterior
    document.getElementById('nextButton').style.display = 'none'; // Esconde o botão "Próximo"
    getRandomCountries(); // Carrega uma nova bandeira
};

// Inicializa o jogo 
getRandomCountries();
