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

    const scales = [
        {
            "id": 1,
            "name": "kg",
            "path": "/images/Search.png",
        },
        {
            "id": 2,
            "name": "Serving",
            "path": "/images/Search.png",
        },
        {
            "id": 3,
            "name": "Palm",
            "path": "/images/Search.png",
        },
        {
            "id": 4,
            "name": "Cups",
            "path": "/images/Search.png",
        },        
    ]

    const [drop, setDrop] = useState({
        food: "",
        scale: "",
    })
    const [chosen, setChosen] = useState({
        food: null,
        scale: null,
    })
    const [search, setSearch] = useState({
        food: "",
        scale: "",
    })
    const [amount, setAmount] = useState("")

    useEffect(() => {
        setDrop({ food: "", scale: "" })
        setChosen({ food: null, scale: null })
        setSearch({ food: "", scale: "" })
        setAmount("")
    }, [view])

    return(
        <div className={styles.main}>
            <div className={styles.dropdown} onClick={() => drop.food === "show" ? setDrop({...drop, food: "hide"}) : setDrop({...drop, food: "show"}) } >
                { 
                    chosen.food
                    ? 
                    <div className={styles.chosenHolder} >
                        <div className={styles.holder}>
                            <img className={styles.image} src={chosen.food.path} />
                        </div>
                        <div className={styles.name}> {chosen.food.name} </div>
                    </div>
                    :
                    <div className={styles.placeholder}>
                        What Did You Eat?
                    </div> 
                }                
            </div>
            <div className={`${styles.dropdownMenu} ${drop.food === "show" ? styles.dropdownMenuOn : drop.food === "hide" ? styles.dropdownMenuOff : styles.start}`}>
                <div className={styles.search} >
                    <div className={styles.holder}>
                        <img className={styles.image} src="/images/Search.png" />
                    </div>
                    <div className={`${styles.holder} ${styles.holderExtend}`}>
                        <input className={styles.input} placeholder="Search Foods" value={search.food} onChange={(e) => setSearch({...search, food: e.target.value})} />
                    </div>                    
                </div>                    
                { foods.filter((food) => food.name.toLocaleLowerCase().includes(search.food.toLocaleLowerCase())).map((food) => {
                    return(
                        <div className={styles.dropdownItem} key={food.id} onClick={() => {setChosen({...chosen, food: food}); setDrop({...drop, food: "hide"}); setSearch({...search, food: ""})} } >
                            <div className={styles.holder}>
                                <img className={styles.image} src={food.path} />
                            </div>
                            <div className={styles.name}> {food.name} </div>
                        </div>
                    )
                }) }
            </div>

            <div className={`${styles.dropdown} ${styles.secondDropdown}`} onClick={() => drop.scale === "show" ? setDrop({...drop, scale: "hide"}) : setDrop({...drop, scale: "show"})} >
                { 
                    chosen.scale
                    ? 
                    <div className={styles.chosenHolder} >
                        <div className={styles.holder}>
                            <img className={styles.image} src={chosen.scale.path} />
                        </div>                        
                        <div className={styles.name}> {chosen.scale.name} </div>
                    </div>
                    :
                    <div className={styles.placeholder}>
                        What Was The Scale?
                    </div> 
                }                
            </div>
            <div className={`${styles.dropdownMenu} ${styles.secondDropdownMenu} ${drop.scale === "show" ? styles.dropdownMenuOn : drop.scale === "hide" ? styles.dropdownMenuOff : styles.start}`}>
                <div className={styles.search} >
                    <div className={styles.holder}>
                        <img className={styles.image} src="/images/Search.png" />
                    </div>
                    <div className={`${styles.holder} ${styles.holderExtend}`}>
                        <input className={styles.input} placeholder="Search Scales" value={search.scale} onChange={(e) => setSearch({...search, scale: e.target.value})} />
                    </div>                    
                </div>                    
                { scales.filter((scale) => scale.name.toLocaleLowerCase().includes(search.scale.toLocaleLowerCase())).map((scale) => {
                    return(
                        <div className={styles.dropdownItem} key={scale.id} onClick={() => {setChosen({...chosen, scale: scale}); setDrop({...drop, scale: "hide"}); setSearch({...search, scale: ""})} } >
                            <div className={styles.holder}>
                                <img className={styles.image} src={scale.path} />
                            </div>                            
                            <div className={styles.name}> {scale.name} </div>
                        </div>
                    )
                }) }
            </div>

            <div className={styles.valueHolder}>
                <input className={styles.value} placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <button className={styles.button}> Submit </button>
        </div>
    )
}

export default food