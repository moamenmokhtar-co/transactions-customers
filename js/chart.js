export let chartInstance = null;

export function chart(cName, dateItem, amountItem) {
    if (chartInstance) {
        chartInstance.destroy();
    }
    const ctx = document.getElementById('myChart');
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {

            labels: dateItem,
            datasets: [{

                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                label: `total transaction amount per day for ${cName}`,
                data: amountItem,
                borderWidth: 2
            }]
        },
        options: {
            
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 14 // حجم الخط للتواريخ على المحور الأفقي
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 14 // حجم الخط للتواريخ على المحور الأفقي
                        }
                    },
                    beginAtZero: true
                }
            }
        }
    });
}