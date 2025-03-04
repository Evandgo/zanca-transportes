// Configurações
const GOOGLE_SHEET_ID = '1GkFccvlKLSoKVckLYVVx9mzUv921vHo42WY3rZdNlAo';
const GOOGLE_API_KEY = 'AIzaSyDqpqA8cORmb_HlW9QuSFwYW1sJAQnmdy4';
const CHART_SHEET_NAME = 'Gráfico2'; // Nome da aba do gráfico
const CHART_DATA_RANGE = 'A2:E'; // Intervalo do gráfico (incluindo a coluna E)

// URL da API do Google Sheets para o gráfico
const chartUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${CHART_SHEET_NAME}!${CHART_DATA_RANGE}?key=${GOOGLE_API_KEY}`;

// Função para buscar e exibir os dados do primeiro gráfico
async function fetchChartData() {
    try {
        const response = await fetch(chartUrl);
        const data = await response.json();

        if (data.values && data.values.length > 0) {
            const labels = data.values.map(row => row[0]); // Coluna A: Rótulos (dimensão)
            const barData = data.values.map(row => parseFloat(row[1])); // Coluna B: Dados de porcentagem (coluna)
            const lineData1 = data.values.map(row => parseInt(row[2])); // Coluna C: Dados inteiros (linha 1)
            const lineData2 = data.values.map(row => parseInt(row[3])); // Coluna D: Dados inteiros (linha 2)

            // Cria o primeiro gráfico
            const ctx = document.getElementById('myChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar', // Gráfico de colunas
                data: {
                    labels: labels, // Rótulos do eixo X
                    datasets: [
                        {
                            type: 'line', // Tipo de gráfico: linhas
                            label: 'Manutenção Corretiva 1', // Legenda da primeira série de linhas
                            data: lineData1, // Dados da coluna C
                            borderColor: '#bce273', // Cor da linha
                            borderWidth: 2,
                            fill: false, // Não preencher área abaixo da linha
                            yAxisID: 'y2', // Eixo Y para inteiros
                            order: 1 // Define a ordem de renderização (1 = primeiro)
                        },
                        {
                            type: 'line', // Tipo de gráfico: linhas
                            label: 'Manutenção Corretiva 2', // Legenda da segunda série de linhas
                            data: lineData2, // Dados da coluna D
                            borderColor: '#1bcbf4', // Cor da linha
                            borderWidth: 2,
                            fill: false, // Não preencher área abaixo da linha
                            yAxisID: 'y2', // Eixo Y para inteiros
                            order: 2 // Define a ordem de renderização (2 = segundo)
                        },
                        {
                            type: 'bar', // Tipo de gráfico: colunas
                            label: 'Manutenção Preventiva', // Legenda da série de colunas
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
                                color: 'white' // Cor das linhas de grade
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

// Função para buscar e exibir os dados do segundo gráfico
async function fetchSecondChartData() {
    try {
        const response = await fetch(chartUrl);
        const data = await response.json();

        if (data.values && data.values.length > 0) {
            const labels = data.values.map(row => row[0]); // Coluna A: Rótulos (nomes dos colaboradores)
            const durationData = data.values.map(row => parseFloat(row[4])); // Coluna E: Dados de duração de tempo

            // Cria o segundo gráfico
            const ctx = document.getElementById('mySecondChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar', // Gráfico de colunas
                data: {
                    labels: labels, // Rótulos do eixo X (nomes dos colaboradores)
                    datasets: [
                        {
                            label: 'Média Gasto Combustível', // Legenda da série de colunas
                            data: durationData, // Dados da coluna E
                            backgroundColor: '#213155', // Cor das colunas
                            borderColor: '#213155', // Cor das boradas das colunas
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Duração de Tempo',
                                color: 'red'
                            },
                            grid: {
                                color: '#213155' // Cor das linhas de grade
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
            console.log('Nenhum dado encontrado para o segundo gráfico.');
        }
    } catch (error) {
        console.error('Erro ao buscar dados do segundo gráfico:', error);
    }
}

// Executa as funções ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    fetchChartData(); // Busca e exibe os dados do primeiro gráfico
    fetchSecondChartData(); // Busca e exibe os dados do segundo gráfico
});