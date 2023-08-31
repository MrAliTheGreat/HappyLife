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
import { BarChartOptions } from "../constants/loss";
import { getDayDate, getGraphVals } from "../utils/tools";

import styles from "../styles/loss.module.css"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
);


const loss = ({ user }) => {
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
                        user.exercises.map(( { calories, exercise } ) => {
                            return(
                                <div key={ exercise.id } className={styles.row}>
                                    <div className={styles.imageHolder}>
                                        <img className={styles.image} src={ exercise.path } />
                                    </div>
                                    <div className={styles.name}> { exercise.name } </div>
                                    <div className={styles.cal}> { calories } </div>
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
                                data: getGraphVals(user.history, "loss"),
                            }]
                        }                        
                    }
                />
            </div>
        </div>
    )
}

export default loss