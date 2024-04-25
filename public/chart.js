// chart.js

document.addEventListener("DOMContentLoaded", function() {
    // Access chartData from the script tag
    const chartDataScript = document.getElementById('chartData');
    const chartDataString = chartDataScript.textContent.trim();

    let chartData;
    try {
        chartData = JSON.parse(chartDataString);
    } catch (error) {
        console.error('Error parsing chartData:', error);
        return;
    }

    // Create Chart.js line chart
    const ctx = document.getElementById('paymentChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Payment Amount' // Label for the y-axis
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 100 // The interval between ticks on the y-axis
                    }
                }]
            }
        }
    });
});
