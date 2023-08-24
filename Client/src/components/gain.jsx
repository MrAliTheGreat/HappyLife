import { useState } from "react"

import styles from "../styles/gain.module.css"

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

    const handleGraph = () => {
        graphShow === "show" ? setGraphShow("hide") :
        graphShow === "hide" ? setGraphShow("show") : setGraphShow("show")
    }

    return(
        <div className={styles.main} onClick={handleGraph}>
            <div className={`${styles.holder} ${graphShow === "show" ? styles.fadeOut : graphShow === "hide" ? styles.fadeIn : ""}`}>
                <div className={styles.date}>
                    {
                        new Date().toLocaleDateString(
                            "en-GB",
                            {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            }
                        )
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
            <div className={`${graphShow === "show" ? styles.fadeIn : graphShow === "hide" ? styles.fadeOut : styles.start}`}>
                GAIN
            </div>
        </div>
    )
}

export default gain