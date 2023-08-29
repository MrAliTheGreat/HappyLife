import { useState, useEffect } from "react"

import styles from "../styles/exercise.module.css"

const exercise = ({ view }) => {
    // This will be exercise received from backend
    const exercises = [
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

    const cals = [
        {
            "id": 1,
            "exerciseName": "Lifting",
            "scaleName": "kg",
            "cal": 200,
        },
        {
            "id": 2,
            "exerciseName": "Cycling",
            "scaleName": "kg",
            "cal": 500,
        },
        {
            "id": 3,
            "exerciseName": "Jump Rope",
            "scaleName": "Palm",
            "cal": 40,
        },
        {
            "id": 4,
            "exerciseName": "Swimming",
            "scaleName": "Cups",
            "cal": 60,
        },
        {
            "id": 5,
            "exerciseName": "Push Ups",
            "scaleName": "Cups",
            "cal": 1000,
        },
        {
            "id": 6,
            "exerciseName": "Tennis",
            "scaleName": "Serving",
            "cal": 300,
        },  
        {
            "id": 7,
            "exerciseName": "Swimming",
            "scaleName": "Palm",
            "cal": 400,
        },              
    ]

    const [drop, setDrop] = useState({
        exerciseName: "",
        scaleName: "",
    })
    const [chosen, setChosen] = useState({
        exercise: null,
        scale: null,
    })
    const [search, setSearch] = useState({
        exerciseName: "",
        scaleName: "",
    })
    const [newItem, setNewItem] = useState({
        exerciseName: "",
        scaleName: "",
        cal: "",
    })
    const [shake, setShake] = useState({
        exercise: false,
        scale: false,
        amount: false,
        calories: false,
    })
    const [amount, setAmount] = useState("")
    const [clear, setClear] = useState(false)
    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        setDrop({ exerciseName: "", scaleName: "" })
        setChosen({ exercise: null, scale: null })
        setSearch({ exerciseName: "", scaleName: "" })
        setNewItem({ exerciseName: "", scaleName: "", cal: "" })
        setShake({ exercise: false, scale: false, amount: false, calories: false })
        setAmount("")
        setClear(false)
        setSubmit(false)
    }, [view])

    const handleSelect = (option, exercise, scale) => {
        if(option === "exercise"){
            setChosen({...chosen, exercise})
            setDrop({...drop, exerciseName: "hide"})
            setSearch({...search, exerciseName: ""})
            return
        }
        setChosen({...chosen, scale});
        setDrop({...drop, scaleName: "hide"});
        setSearch({...search, scaleName: ""});        
    }

    const handleDropDown = (option) => {
        if(option === "exercise"){
            drop.exerciseName === "show" ? 
            setDrop({...drop, exerciseName: "hide"}) :
            setDrop({
                exerciseName: "show",
                scaleName: drop.scaleName ? "hide" : drop.scaleName
            })
            return
        }
        
        if(drop.scaleName === "show"){
            setDrop({...drop, scaleName: "hide"})
            setShake({...shake, exercise: false})
        }
        else{
            setDrop({
                exerciseName: drop.exerciseName ? "hide" : drop.exerciseName,
                scaleName: "show"
            })
        }
    }

    const getDropDownMenuClass = (option) => {
        if(option === "exercise"){
            return (
                drop.exerciseName === "show" ? 
                styles.dropdownMenuOn : 
                drop.exerciseName === "hide" ? 
                styles.dropdownMenuOff : 
                styles.start            
            )
        }
        return (
            drop.scaleName === "show" ?
            styles.dropdownMenuOn :
            drop.scaleName === "hide" ?
            styles.dropdownMenuOff :
            styles.start            
        )
    }

    const handleNewItem = (option, e) => {
        if(option === "exercise"){
            setNewItem({...newItem, exerciseName: e.target.value})
            if(e.target.value){
                setChosen({...chosen, exercise: { id: 0, name: e.target.value, path: "/images/New.png" } })
                setAmount("1")
                return
            }
            setChosen({...chosen, exercise: null })
            setAmount("")
            return
        }
        setNewItem({...newItem, scaleName: e.target.value})
        chosen.exercise ?
        e.target.value ?
        setChosen({...chosen, scale: {id: 0, name: e.target.value, path: "/images/New.png"} }) :
        setChosen({...chosen, scale: null }) :
        setShake({...shake, exercise: e.target.value !== ""})
    }

    // THIS (SELECTION) CAN BE PLACED ON THE BACKEND AND HANDLED WITH GRAPHQL!!!
    const getFilteredItems = (option) => {
        if(option === "exercise"){
            return (
                exercises.filter( (exercise) => {
                    return(
                        exercise.name.toLocaleLowerCase().includes(search.exerciseName.toLocaleLowerCase().trim()) && (
                        chosen.scale ? 
                        cals.filter(({ exerciseName, scaleName }) => {
                            return exerciseName === exercise.name && scaleName === chosen.scale.name
                        }).length > 0 : true )            
                    )
                } )
            )
        }
        return (
            scales.filter( (scale) => {
                return (
                    scale.name.toLocaleLowerCase().includes(search.scaleName.toLocaleLowerCase().trim()) && (
                    chosen.exercise && !newItem.exerciseName ? 
                    cals.filter(({ exerciseName, scaleName }) => {
                        return scaleName === scale.name && exerciseName === chosen.exercise.name 
                    }).length > 0 : true )            
                )
            } )
        )        
    }

    const handleCaloriesValue = () => {
        return (
            (newItem.exerciseName || (newItem.scaleName && chosen.exercise)) ? 
            newItem.cal : 
            chosen.exercise && chosen.scale && amount ?
            cals.filter(
                ({ exerciseName, scaleName }) => chosen.exercise.name === exerciseName && chosen.scale.name === scaleName
            )[0].cal * parseInt(amount): ""
        )
    }

    const checkMustShake = (val) => {
        return !(val.trim() === val && !isNaN(val) && val > 0 && parseFloat(val) === parseInt(val))
    }

    const handleSubmit = () => {
        setSubmit(true)
        setShake({
            exercise: !chosen.exercise,
            scale: !chosen.scale,
            amount: checkMustShake(amount),
            calories: newItem.exerciseName && checkMustShake(newItem.cal),
        })
        setTimeout(() => {
            setSubmit(false)
            setShake({ exercise: false, scale: false, amount: false, calories: false })
        }, 800) // Synced with wiggle in exercise.module.css


        
        if(chosen.exercise && chosen.scale && !checkMustShake(amount) && !(newItem.exerciseName && checkMustShake(newItem.cal))){
            setChosen({ exercise: null, scale: null })
            setSearch({ exerciseName: "", scaleName: "" })
            setNewItem({ exerciseName: "", scaleName: "", cal: "" })
            setAmount("")
        }        
    }

    const handleClear = () => {
        setClear(true)
        setTimeout(() => {
            setClear(false)
        }, 1000) // Synced with swing in exercise.module.css

        setChosen({ exercise: null, scale: null })
        setNewItem({ exerciseName: "", scaleName: "", cal: "" })
        setAmount("")
    }

    const isSubmitted = () => {
        return submit && !Object.values(shake).some(v => v)
    }

    // TO DO
    // id is set by backend

    return(
        <div className={`${styles.main} ${clear ? styles.swing : ""}`}>
            <div className={`${styles.dropdown} ${shake.exercise ? styles.wiggle : ""}`} onClick={ () => handleDropDown("exercise") } >
                { 
                    chosen.exercise
                    ? 
                    <div className={styles.chosenHolder} >
                        <div className={styles.holder}>
                            <img className={styles.image} src={chosen.exercise.path} />
                        </div>
                        <div className={styles.name}> {chosen.exercise.name} </div>
                    </div>
                    :
                    <div className={styles.placeholder}>
                        Exercise?
                    </div> 
                }                
            </div>
            <div className={`${styles.dropdownMenu} ${getDropDownMenuClass("exercise")}`}>
                <div className={styles.row} >
                    <div className={styles.holder}>
                        <img className={styles.image} src="/images/Search.png" />
                    </div>
                    <div className={`${styles.holder} ${styles.holderExtend}`}>
                        <input 
                            className={styles.input}
                            placeholder="Search Exercises"
                            value={search.exerciseName}
                            onChange={(e) => setSearch({...search, exerciseName: e.target.value})}
                        />
                    </div>
                </div>
                <div className={styles.row} >
                    <div className={styles.holder}>
                        <img className={styles.image} src="/images/Missing.png" />
                    </div>
                    <div className={`${styles.holder} ${styles.holderExtend}`}>
                        <input
                            className={styles.input}
                            placeholder="New Exercise Name?"
                            value={newItem.exerciseName}
                            onChange={ (e) => handleNewItem("exercise", e) }
                        />
                    </div>                    
                </div>                
                {
                    getFilteredItems("exercise").map((exercise) => {
                        return(
                            <div 
                                className={styles.dropdownItem}
                                key={exercise.id}
                                onClick={() => { handleSelect("exercise", exercise, null) }}
                            >
                                <div className={styles.holder}>
                                    <img className={styles.image} src={exercise.path} />
                                </div>
                                <div className={styles.name}> {exercise.name} </div>
                            </div>
                        )
                    })
                }
            </div>

            <div 
                className={`${styles.dropdown} ${styles.secondDropdown} ${shake.scale ? styles.wiggle : ""}`}
                onClick={() => handleDropDown("scale")}
            >
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
                        Scale?
                    </div> 
                }                
            </div>
            <div className={`${styles.dropdownMenu} ${styles.secondDropdownMenu} ${getDropDownMenuClass("scale")}`}>
                <div className={styles.row} >
                    <div className={styles.holder}>
                        <img className={styles.image} src="/images/Search.png" />
                    </div>
                    <div className={`${styles.holder} ${styles.holderExtend}`}>
                        <input 
                            className={styles.input}
                            placeholder="Search Scales"
                            value={search.scaleName}
                            onChange={(e) => setSearch({...search, scaleName: e.target.value})}
                        />
                    </div>                    
                </div>
                <div className={styles.row} >
                    <div className={styles.holder}>
                        <img className={styles.image} src="/images/Missing.png" />
                    </div>
                    <div className={`${styles.holder} ${styles.holderExtend}`}>
                        <input
                            className={styles.input}
                            placeholder="New Scale Name?"
                            value={newItem.scaleName}
                            onChange={(e) => { handleNewItem("scale", e) } } />
                    </div>                    
                </div>                
                {
                    getFilteredItems("scale").map((scale) => {
                        return(
                            <div className={styles.dropdownItem} key={scale.id} onClick={() => { handleSelect("scale", null, scale) } } >
                                <div className={styles.holder}>
                                    <img className={styles.image} src={scale.path} />
                                </div>                            
                                <div className={styles.name}> {scale.name} </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className={`${styles.valueHolder} ${shake.amount ? styles.wiggle : ""}`}>
                <input
                    className={styles.value}
                    placeholder="Amount"
                    value={amount}
                    readOnly={newItem.exerciseName || (newItem.scaleName && chosen.exercise) ? "readonly" : null}
                    onChange={(e) => setAmount(e.target.value)} 
                />
            </div>

            <div className={`${styles.valueHolder} ${shake.calories ? styles.wiggle : ""}`}>
                <input 
                    className={styles.value}
                    placeholder="Calories"
                    value={handleCaloriesValue()}
                    readOnly={newItem.exerciseName || (newItem.scaleName && chosen.exercise) ? null : "readonly"}
                    onChange={(e) => setNewItem({...newItem, cal: e.target.value}) } 
                />
            </div>

            <button className={`${styles.button} ${ isSubmitted() ? styles.submit : "" }`} onClick={ handleSubmit }>
                {newItem.exerciseName || (newItem.scaleName && chosen.exercise) ? "Add To List" : isSubmitted() ? "OK!" : "Submit"}
            </button>

            <div className={`${styles.holder} ${styles.trash}`} onClick={ handleClear }>
                <img
                    width="70px" 
                    src="/images/Trash.png"
                />
            </div>
        </div>
    )
}

export default exercise