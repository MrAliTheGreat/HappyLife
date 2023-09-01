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
import { BarChartOptions } from "../constants/gain";
import { getDayDate, getGraphVals } from "../utils/tools";
import { USER_FOODS_TODAY } from "../constants/queries";

import styles from "../styles/gain.module.css"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
);

const gain = ({ view, history }) => {
    const [graphShow, setGraphShow] = useState("")

    const userFoodsTodayRes = useQuery(USER_FOODS_TODAY, {
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
                        userFoodsTodayRes.loading || !userFoodsTodayRes.data
                        ?
                            <div className={styles.loading}> Loading... </div>
                        :
                            userFoodsTodayRes.data.userFoodsToday.map((f) => {
                                return(
                                    <div key={f.id} className={styles.row}>
                                        <div className={styles.imageHolder}>
                                            <img className={styles.image} src={ f.foodScale.food.path } />
                                        </div>                                    
                                        <div className={styles.name}> {f.foodScale.food.name} </div>
                                        <div className={styles.cal}> {f.amount * f.foodScale.calories} </div>
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
                                data: getGraphVals(history, "gain"),
                            }]
                        }                        
                    }
                />
            </div>
        </div>
    )
}

export default gain