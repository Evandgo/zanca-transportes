// Configurações
const GOOGLE_SHEET_ID = '1GkFccvlKLSoKVckLYVVx9mzUv921vHo42WY3rZdNlAo';
const GOOGLE_API_KEY = 'AIzaSyDqpqA8cORmb_HlW9QuSFwYW1sJAQnmdy4';
const SHEET_NAME = 'Performance'; // Nome da aba da tabela
const DATA_RANGE = 'A2:B'; // Intervalo da tabela

// URL da API do Google Sheets
const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_NAME}!${DATA_RANGE}?key=${GOOGLE_API_KEY}`;

// Cores para o padrão
const colors = ['#54f555', '#2bcbe8', '#f82a7d', '#fde458'];

// Função para buscar e exibir os dados
async function fetchPerformanceData() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.values && data.values.length > 0) {
            const performanceContainer = document.getElementById('performance-container');

            // Limpa o conteúdo atual
            performanceContainer.innerHTML = '';

            // Itera sobre os dados
            data.values.forEach((row, index) => {
                const name = row[0]; // Nome (coluna A)
                const progress = parseInt(row[1]); // Progresso (coluna B) como número inteiro

                // Seleciona a cor com base no índice (ciclo de 4 cores)
                const color = colors[index % colors.length];

                // Cria o container de progresso
                const progressContainer = document.createElement('div');
                progressContainer.classList.add('progress-container');

                // Cria o círculo de progresso
                const progressCircle = document.createElement('div');
                progressCircle.classList.add('progress-circle');
                progressCircle.style.setProperty('--progress', `${progress}%`);
                progressCircle.style.setProperty('--color', color); // Define a cor dinamicamente

                // Adiciona o valor do progresso dentro do círculo
                const progressValue = document.createElement('span');
                progressValue.textContent = `${progress}`; // Exibe o valor como número inteiro
                progressCircle.appendChild(progressValue);

                // Adiciona o nome abaixo do círculo
                const nameElement = document.createElement('p');
                nameElement.textContent = name;

                // Adiciona os elementos ao container
                progressContainer.appendChild(progressCircle);
                progressContainer.appendChild(nameElement);

                // Adiciona o container ao DOM
                performanceContainer.appendChild(progressContainer);
            });
        } else {
            console.log('Nenhum dado encontrado na planilha.');
        }
    } catch (error) {
        console.error('Erro ao buscar dados da planilha:', error);
    }
}

// Executa a função ao carregar a página
document.addEventListener('DOMContentLoaded', fetchPerformanceData);