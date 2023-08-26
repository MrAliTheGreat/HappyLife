import { useState } from "react"

import styles from "../styles/food.module.css"

const food = () => {
    // This will be food received from backend
    const foods = [
        {
            "id": 1,
            "name": "Lifting",
            "path": "/animations/Lift.gif",
        },
        {
            "id": 2,
            "name": "Cycling",
            "path": "/animations/Cycling.gif",
        },
        {
            "id": 3,
            "name": "Jump Rope",
            "path": "/animations/JumpRope.gif",
        },
        {
            "id": 4,
            "name": "Swimming",
            "path": "/animations/FrogStroke.gif",
        },
        {
            "id": 5,
            "name": "Push Ups",
            "path": "/animations/PushUp.gif",
        },
        {
            "id": 6,
            "name": "Tennis",
            "path": "/animations/Tennis.gif",
        },
    ]

    const [drop, setDrop] = useState("")

    // SET drop TO "" ON LEAVE!!!

    return(
        <div className={styles.main}>
            <div className={styles.dropdown} onClick={() => drop === "show" ? setDrop("hide") : setDrop("show")}>
                {/* Empty at first then item name */}
                <div className={`${styles.dropdownMenu} ${drop === "show" ? styles.dropdownMenuOn : drop === "hide" ? styles.dropdownMenuOff : styles.start}`}>
                    { foods.map(({ id, name, path }) => {
                        return(
                            <div className={styles.dropdownItem} key={id} >
                                <div className={styles.imageHolder}>
                                    <img className={styles.image} src={path} />
                                </div>
                                <div className={styles.name}> {name} </div>
                            </div>
                        )
                    }) }
                </div>                
            </div>
        </div>
    )
}

export default food