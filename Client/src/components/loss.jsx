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
import { getDayDate } from "../utils/tools";

import styles from "../styles/loss.module.css"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
);


const loss = ({ user }) => {
    const loss = [
        {
            "id": 1,
            "name": "Lifting",
            "path": "/animations/Lift.gif",
            "cal": "700"
        },
        {
            "id": 2,
            "name": "Cycling",
            "path": "/animations/Cycling.gif",
            "cal": "1000"
        },
        {
            "id": 3,
            "name": "Jump Rope",
            "path": "/animations/JumpRope.gif",
            "cal": "6000"
        },
        {
            "id": 4,
            "name": "Swimming",
            "path": "/animations/FrogStroke.gif",
            "cal": "400"
        },
        {
            "id": 5,
            "name": "Push Ups",
            "path": "/animations/PushUp.gif",
            "cal": "500"
        },
        {
            "id": 6,
            "name": "Tennis",
            "path": "/animations/Tennis.gif",
            "cal": "5000"
        },
    ]

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
                        loss.map(( {id, name, path, cal} ) => {
                            return(
                                <div key={id} className={styles.row}>
                                    <div className={styles.imageHolder}>
                                        <img className={styles.image} src={path} />
                                    </div>
                                    <div className={styles.name}> {name} </div>
                                    <div className={styles.cal}> {cal} </div>
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
                                data: [700, 100, 900, 0, 2000, 800, 300],
                            }]
                        }                        
                    }
                />
            </div>
        </div>
    )
}

export default loss