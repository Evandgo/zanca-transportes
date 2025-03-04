// Configurações
const GOOGLE_SHEET_ID = '1GkFccvlKLSoKVckLYVVx9mzUv921vHo42WY3rZdNlAo';
const GOOGLE_API_KEY = 'AIzaSyDqpqA8cORmb_HlW9QuSFwYW1sJAQnmdy4';
const SHEET_NAME = 'Tabela2'; // Nome da aba da tabela
const DATA_RANGE = 'A1:J'; // Intervalo da tabela

// URL da API do Google Sheets
const tableUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_NAME}!${DATA_RANGE}?key=${GOOGLE_API_KEY}`;

// Função para buscar e exibir os dados da tabela
async function fetchTableData() {
    try {
        const response = await fetch(tableUrl);
        const data = await response.json();

        if (data.values && data.values.length > 0) {
            const headers = data.values[0]; // Primeira linha é o cabeçalho
            const rows = data.values.slice(1); // Restante são os dados

            const tableHead = document.querySelector('#data-table2 thead tr');
            const tableBody = document.querySelector('#data-table2 tbody');

            // Limpa o conteúdo atual da tabela
            tableHead.innerHTML = '';
            tableBody.innerHTML = '';

            // Preenche o cabeçalho
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                tableHead.appendChild(th);
            });

            // Preenche as linhas com os dados
            rows.forEach(row => {
                const tr = document.createElement('tr');
                row.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        } else {
            console.log('Nenhum dado encontrado na tabela.');
        }
    } catch (error) {
        console.error('Erro ao buscar dados da tabela:', error);
    }
}

// Adiciona um evento para carregar os dados quando a página for carregada
document.addEventListener('DOMContentLoaded', fetchTableData);