import { useState, useEffect } from "react"

import styles from "../styles/food.module.css"

const food = ({ view }) => {
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
    const [chosenFood, setChosenFood] = useState(null)

    useEffect(() => {
        setDrop(""); setChosenFood(null)
    }, [view])

    return(
        <div className={styles.main}>
            <div className={styles.dropdown} onClick={() => drop === "show" ? setDrop("hide") : setDrop("show")}>
                { 
                    chosenFood
                    ? 
                    <div className={styles.chosenHolder} >
                        <div className={styles.imageHolder}>
                            <img className={styles.image} src={chosenFood.path} />
                        </div>
                        <div className={styles.name}> {chosenFood.name} </div>
                    </div>
                    :
                    <div className={styles.placeholder}>
                        What Did You Eat?
                    </div> 
                }
                <div className={`${styles.dropdownMenu} ${drop === "show" ? styles.dropdownMenuOn : drop === "hide" ? styles.dropdownMenuOff : styles.start}`}>
                    { foods.map((food) => {
                        return(
                            <div className={styles.dropdownItem} key={food.id} onClick={() => setChosenFood(food)} >
                                <div className={styles.imageHolder}>
                                    <img className={styles.image} src={food.path} />
                                </div>
                                <div className={styles.name}> {food.name} </div>
                            </div>
                        )
                    }) }
                </div>                
            </div>
        </div>
    )
}

export default food