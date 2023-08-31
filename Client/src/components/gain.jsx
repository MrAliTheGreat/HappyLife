import { useState } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BarChartOptions } from "../constants/gain";
import { getDayDate } from "../utils/tools";

import styles from "../styles/gain.module.css"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
);


const getGraphVals = (history) => {
    let vals = [0, 0, 0, 0, 0, 0, 0]
    const numPreviousDays = {
        "Sat": 0,
        "Sun": 1,
        "Mon": 2,
        "Tue": 3,
        "Wed": 4,
        "Thu": 5,
        "Fri": 6
    }
    const pos = numPreviousDays[history.at(-1).date.slice(0, 3)]
    for(let i = pos; i >= 0; i--) {
        vals[i] = history.at(-1 - pos + i) ? history.at(-1 - pos + i).gain : 0
    }
    return vals
}

const gain = ({ user }) => {
    const [graphShow, setGraphShow] = useState("")

    const handleGraph = () => {
        graphShow === "show" ? setGraphShow("hide") :
        graphShow === "hide" ? setGraphShow("show") : setGraphShow("show")
    }

    return(
        <div className={styles.main} onDoubleClick={handleGraph}>
            <div className={`${styles.holder} ${graphShow === "show" ? styles.fadeOut : graphShow === "hide" ? styles.fadeIn : ""}`}>
                <div className={styles.date}>
                    {
                        getDayDate()
                    }
                </div>
                <div className={styles.list}>
                    {
                        user.foods.map(({ calories, food }) => {
                            return(
                                <div key={food.id} className={styles.row}>
                                    <div className={styles.imageHolder}>
                                        <img className={styles.image} src={ food.path } />
                                    </div>                                    
                                    <div className={styles.name}> {food.name} </div>
                                    <div className={styles.cal}> {calories} </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={`${styles.graph} ${graphShow === "show" ? styles.fadeIn : graphShow === "hide" ? styles.fadeOut : styles.start}`}>
                <Bar
                    options={BarChartOptions}
                    data={
                        {
                            labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
                            datasets: [{
                                data: getGraphVals(user.history),
                            }]
                        }                        
                    }
                />
            </div>
        </div>
    )
}

export default gain