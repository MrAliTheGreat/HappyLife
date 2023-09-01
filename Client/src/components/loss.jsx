import { useState } from "react"
import { useQuery } from "@apollo/client";
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
import { USER_EXERCISES_TODAY } from "../constants/queries";

import styles from "../styles/loss.module.css"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
);


const loss = ({ view, history }) => {
    const [graphShow, setGraphShow] = useState("")

    const userExercisesTodayRes = useQuery(USER_EXERCISES_TODAY, {
        onError: (err) => {
            console.log(err.graphQLErrors[0].message)
        },
        skip: view !== "panel"
    })    

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
                        userExercisesTodayRes.loading || !userExercisesTodayRes.data
                        ?
                            <div className={styles.loading}> Loading... </div>
                        :                        
                            userExercisesTodayRes.data.userExercisesToday.map((e) => {
                                return(
                                    <div key={ e.id } className={styles.row}>
                                        <div className={styles.imageHolder}>
                                            <img className={styles.image} src={ e.exerciseScale.exercise.path } />
                                        </div>
                                        <div className={styles.name}> { e.exerciseScale.exercise.name } </div>
                                        <div className={styles.cal}> { e.amount * e.exerciseScale.calories } </div>
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
                                data: getGraphVals(history, "loss"),
                            }]
                        }                        
                    }
                />
            </div>
        </div>
    )
}

export default loss