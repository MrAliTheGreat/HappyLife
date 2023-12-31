export const BarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: "#3bff65",
    borderColor: "#000000",
    borderWidth: 3,
    borderRadius: 10,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: "Current Week",
            color: "#ffdd52",
            font: {
                family: '"Pixellari", sans-serif',
                weight: "normal",
                size: 25,
            }
        },
        tooltip: {
            titleFont: {
                family: '"Pixellari", sans-serif',
                weight: "normal",
                size: 15
            },
            bodyFont: {
                family: '"Pixellari", sans-serif',
                weight: "normal",
                size: 18                    
            }
        }            
    },
    scales: {
        x: {
            grid: {
                display: false
            },
            border: {
                color: "#b9ffbc",
                width: 4
            },                
            ticks: {
                color: "#FFF",
                font: {
                    family: '"Pixellari", sans-serif',
                    weight: "normal",
                    size: 15,
                }
            }
        },
        y: {
            grid: {
                display: false
            },
            border: {
                color: "#b9ffbc",
                width: 4
            },
            ticks: {
                color: "#FFF",
                font: {
                    family: '"Pixellari", sans-serif',
                    weight: "normal",
                    size: 13,
                }
            },
            max: 5000,               
        }
    }
}