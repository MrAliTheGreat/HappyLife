import { useState } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import styles from "../styles/gain.module.css"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const gain = () => {
    const intake = [
        {
            "id": 1,
            "food": "Hot Dog",
            "cal": "200"
        },
        {
            "id": 2,
            "food": "Pizza",
            "cal": "100"
        },
        {
            "id": 3,
            "food": "قرمه سبزی",
            "cal": "1000"
        },
        {
            "id": 4,
            "food": "Rice",
            "cal": "400"
        },
        {
            "id": 5,
            "food": "قیمه",
            "cal": "500"
        },
        {
            "id": 6,
            "food": "دوغ",
            "cal": "1000"
        },
        {
            "id": 7,
            "food": "Pasta",
            "cal": "5000"
        },
        {
            "id": 8,
            "food": "Banana",
            "cal": "1234"
        },
        {
            "id": 9,
            "food": "ohnfalkjfniabf",
            "cal": "56778"
        },
        {
            "id": 10,
            "food": "Spaghetti",
            "cal": "10234"
        }
    ]

    const [graphShow, setGraphShow] = useState("")

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        backgroundColor: "#9aff79",
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
                    color: "#78e3aa",
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
                    color: "#78e3aa",
                    width: 4
                },
                ticks: {
                    color: "#FFF",
                    font: {
                        family: '"Pixellari", sans-serif',
                        weight: "normal",
                        size: 13,
                    }
                }                
            }
        }
    }

    const barData = {
        labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [{
            data: [5600, 7800, 4010, 12050, 0, 900, 0],
        }]
    }

    const handleGraph = () => {
        graphShow === "show" ? setGraphShow("hide") :
        graphShow === "hide" ? setGraphShow("show") : setGraphShow("show")
    }

    const getDayDate = () => {
        const date = new Date().toLocaleDateString(
            "en-GB",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        ).split(",")
        
        return `${date[0]} \n ${date[1].trim()}`
    }

    return(
        <div className={styles.main} onClick={handleGraph}>
            <div className={`${styles.holder} ${graphShow === "show" ? styles.fadeOut : graphShow === "hide" ? styles.fadeIn : ""}`}>
                <div className={styles.date}>
                    {
                        getDayDate()
                    }
                </div>
                <div className={styles.list}>
                    {
                        intake.map(( {id, food, cal} ) => {
                            return(
                                <div key={id} className={styles.row}>
                                    <div> {food} </div>
                                    <div> {cal} </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={`${styles.graph} ${graphShow === "show" ? styles.fadeIn : graphShow === "hide" ? styles.fadeOut : styles.start}`}>
                <Bar options={barOptions} data={barData}/>
            </div>
        </div>
    )
}

export default gain