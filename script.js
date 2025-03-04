// Configurações
const GOOGLE_SHEET_ID = '1GkFccvlKLSoKVckLYVVx9mzUv921vHo42WY3rZdNlAo';
const GOOGLE_API_KEY = 'AIzaSyDqpqA8cORmb_HlW9QuSFwYW1sJAQnmdy4';
const SHEET_NAME = 'Tabela1'; // Nome da aba da tabela
const CHART_SHEET_NAME = 'Gráfico1'; // Nome da aba do gráfico
const DATA_RANGE = 'A1:E'; // Intervalo da tabela
const CHART_DATA_RANGE = 'A2:D'; // Intervalo do gráfico

// URLs da API do Google Sheets
const tableUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_NAME}!${DATA_RANGE}?key=${GOOGLE_API_KEY}`;
const chartUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${CHART_SHEET_NAME}!${CHART_DATA_RANGE}?key=${GOOGLE_API_KEY}`;

// Função para buscar e exibir os dados da tabela
async function fetchTableData() {
    try {
        const response = await fetch(tableUrl);
        const data = await response.json();

        if (data.values && data.values.length > 0) {
            const headers = data.values[0]; // Primeira linha é o cabeçalho
            const rows = data.values.slice(1); // Restante são os dados

            const tableHead = document.querySelector('#data-table thead tr');
            const tableBody = document.querySelector('#data-table tbody');

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

// Função para buscar e exibir os dados do gráfico
async function fetchChartData() {
    try {
        const response = await fetch(chartUrl);
        const data = await response.json();

        if (data.values && data.values.length > 0) {
            const labels = data.values.map(row => row[0]); // Coluna A: Rótulos (dimensão)
            const barData = data.values.map(row => parseFloat(row[1])); // Coluna B: Dados de porcentagem (coluna)
            const lineData1 = data.values.map(row => parseInt(row[2])); // Coluna C: Dados inteiros (linha 1)
            const lineData2 = data.values.map(row => parseInt(row[3])); // Coluna D: Dados inteiros (linha 2)

            // Cria o gráfico
            const ctx = document.getElementById('myChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar', // Gráfico de colunas
                data: {
                    labels: labels, // Rótulos do eixo X
                    datasets: [
                        {
                            type: 'line', // Tipo de gráfico: linhas
                            label: 'Horas extras', // Legenda da primeira série de linhas
                            data: lineData1, // Dados da coluna C
                            borderColor: '#bce273', // Cor da linha
                            borderWidth: 2,
                            fill: false, // Não preencher área abaixo da linha
                            yAxisID: 'y2', // Eixo Y para inteiros
                            order: 1 // Define a ordem de renderização (1 = primeiro)
                        },
                        {
                            type: 'line', // Tipo de gráfico: linhas
                            label: 'Faltas', // Legenda da segunda série de linhas
                            data: lineData2, // Dados da coluna D
                            borderColor: '#1bcbf4', // Cor da linha
                            borderWidth: 2,
                            fill: false, // Não preencher área abaixo da linha
                            yAxisID: 'y2', // Eixo Y para inteiros
                            order: 2 // Define a ordem de renderização (2 = segundo)
                        },
                        {
                            type: 'bar', // Tipo de gráfico: colunas
                            label: '% Horas trabalhadas', // Legenda da série de colunas
                            data: barData, // Dados da coluna B
                            backgroundColor: '#e50d58', // Cor das colunas
                            borderColor: '#e50d58',
                            borderWidth: 1,
                            yAxisID: 'y1', // Eixo Y para porcentagem
                            order: 3 // Define a ordem de renderização (3 = terceiro)
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Porcentagem (%)',
                                color: 'red'
                            },
                            grid: {
                                color: '#213155' // Cor das linhas de grade
                            },
                            ticks: {
                                color: '#213155' // Cor dos rótulos do eixo Y
                            }
                        },
                        y2: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Valores Inteiros',
                                color: 'red'
                            },
                            grid: {
                                color: 'white' // Cor das linhas de grade esse
                            },
                            ticks: {
                                color: '#213155' // Cor dos rótulos do eixo Y
                            }
                        },
                        x: {
                            grid: {
                                color: '#213155' // Cor das linhas de grade
                            },
                            ticks: {
                                color: '#213155' // Cor dos rótulos do eixo X
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'black' // Cor da legenda
                            }
                        }
                    }
                }
            });
        } else {
            console.log('Nenhum dado encontrado para o gráfico.');
        }
    } catch (error) {
        console.error('Erro ao buscar dados do gráfico:', error);
    }
}

// Executa as funções ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    fetchChartData(); // Busca e exibe os dados do gráfico
    fetchTableData(); // Busca e exibe os dados da tabela
});


