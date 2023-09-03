import { useState, useEffect } from "react"
import { useMutation, useQuery } from "@apollo/client"

import styles from "../styles/exercise.module.css"

import { 
    EXERCISES,
    SCALES,
    EXERCISE_SCALES,
    SCALE_EXERCISES,
    EXERCISE_SCALE_CALORIES,
    ADD_EXERCISE,
    ADD_USER_EXERCISE,
    CURRENT_USER,
    USER_EXERCISES_TODAY
} from "../constants/queries"


const exercise = ({ view }) => {
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

    // ======================================================= QUERIES =================================================================

    const exercisesRes = useQuery(EXERCISES, {
        onError: (err) => {
            console.log(err.graphQLErrors[0].message)
        },
        skip: view !== "exercise"
    })

    const scalesRes = useQuery(SCALES, {
        onError: (err) => {
            console.log(err.graphQLErrors[0].message)
        },
        variables: {
            group: "exercise"
        },        
        skip: view !== "exercise"
    })

    const exerciseScalesRes = useQuery(EXERCISE_SCALES, {
        onError: (err) => {
            console.log(err.graphQLErrors[0].message)
        },
        variables: {
            exercisename: chosen.exercise ? chosen.exercise.name : null
        },        
        skip: !chosen.exercise,
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true        
    })

    const scaleExercisesRes =  useQuery(SCALE_EXERCISES, {
        onError: (err) => {
            console.log(err.graphQLErrors[0].message)
        },
        variables: {
            scalename: chosen.scale ? chosen.scale.name : null
        },        
        skip: !chosen.scale
    })

    const exerciseScaleCaloriesRes =  useQuery(EXERCISE_SCALE_CALORIES, {
        onError: (err) => {
            console.log(err.graphQLErrors[0].message)
        },
        variables: {
            exerciseId: chosen.exercise ? chosen.exercise.id : null,
            scaleId: chosen.scale ? chosen.scale.id : null,
        },        
        skip: !(chosen.exercise && chosen.scale)
    })
    
    const [ addExercise, newExercise ] = useMutation(ADD_EXERCISE, {
        refetchQueries: [
            {
                query: EXERCISES 
            },
            { 
                query: SCALES,
                variables: {
                    group: "exercise"
                }
            } 
        ]
    })

    const [ addUserExercise, newUserExercise ] = useMutation(ADD_USER_EXERCISE, {
        refetchQueries: [
            {
                query: CURRENT_USER 
            },
            {
                query: USER_EXERCISES_TODAY
            }
        ]
    })    

    // ======================================================= HANDLERS =================================================================

    const handleSelect = (option, exercise, scale) => {
        if(option === "exercise"){
            setChosen({...chosen, exercise})
            setDrop({...drop, exerciseName: "hide"})
            setSearch({...search, exerciseName: ""})
            setNewItem({...newItem, exerciseName: ""})
            setAmount("")            
            return
        }
        setChosen({...chosen, scale});
        setDrop({...drop, scaleName: "hide"});
        setSearch({...search, scaleName: ""});
        setNewItem({...newItem, scaleName: ""})
        setAmount("")                
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
                setChosen({...chosen, exercise: { id: 0, name: e.target.value, path: "/images/icons/New.png" } })
                setAmount("1")
                return
            }
            setChosen({...chosen, exercise: null })
            setAmount("")
            return
        }
        setNewItem({...newItem, scaleName: e.target.value})
        if(chosen.exercise){
            if(e.target.value){
                setChosen({...chosen, scale: {id: 0, name: e.target.value, path: "/images/icons/New.png"} })
                setAmount("1")
                return
            }
            setChosen({...chosen, scale: null })
            setAmount("")
        }
        else{
            setShake({...shake, exercise: e.target.value !== ""})
        }
    }

    const getFilteredItems = (option) => {
        if(option === "exercise"){
            return (
                chosen.scale
                ?
                    scaleExercisesRes.loading || !scaleExercisesRes.data
                    ?
                        []
                    :
                    scaleExercisesRes.data.scaleExercises.map((scaleExercise) => {
                        return scaleExercise.exercise
                    })                        
                :
                    exercisesRes.loading || !exercisesRes.data
                    ? 
                        [] 
                    :
                        exercisesRes.data.allExercises.filter((exercise) => {
                            return exercise.name.toLocaleLowerCase().includes(search.exerciseName.toLocaleLowerCase().trim())
                        })
            )            
        }
        return (
            (chosen.exercise && !newItem.exerciseName)
            ?
                exerciseScalesRes.loading || !exerciseScalesRes.data
                ?
                    []
                :
                    exerciseScalesRes.data.exerciseScales.map((exerciseScale) => {
                        return exerciseScale.scale
                    })
            :
                scalesRes.loading || !scalesRes.data
                ?
                    []
                :
                    scalesRes.data.allScales.filter( (scale) => {
                        return scale.name.toLocaleLowerCase().includes(search.scaleName.toLocaleLowerCase().trim())
                    })
        )        
    }

    const handleCaloriesValue = () => {
        return (
            (newItem.exerciseName || (newItem.scaleName && chosen.exercise))
            ? 
                newItem.cal 
            : 
                chosen.exercise && chosen.scale && amount
                ?
                    exerciseScaleCaloriesRes.loading || !exerciseScaleCaloriesRes.data
                    ?
                        0 
                    :
                        exerciseScaleCaloriesRes.data.exerciseScaleCalories.calories * parseInt(amount)
                :
                    ""
        )
    }

    const checkMustShake = (val) => {
        return !(val.trim() === val && !isNaN(val) && val > 0 && parseFloat(val) === parseInt(val))
    }

    const handleSubmit = () => {
        setShake({
            exercise: !chosen.exercise,
            scale: !chosen.scale,
            amount: checkMustShake(amount),
            calories: newItem.exerciseName && checkMustShake(newItem.cal),
        })
        setTimeout(() => {
            setShake({ exercise: false, scale: false, amount: false, calories: false })
        }, 800) // Synced with wiggle in exercise.module.css
        
        if(chosen.exercise && chosen.scale && !checkMustShake(amount) && !(newItem.exerciseName && checkMustShake(newItem.cal))){
            if(newItem.exerciseName || (newItem.scaleName && chosen.exercise)){
                addExercise({
                    variables: {
                        exercisename: chosen.exercise.name,
                        scalename: chosen.scale.name,
                        calories: parseInt(newItem.cal)
                    }
                })
                // POSSIBLE ERROR HANDLING FOR newExercise FAILURE!
                if(!newExercise.loading){
                    setSubmit(true)
                    setTimeout(() => {
                        setSubmit(false)
                    }, 800) // Synced with wiggle in exercise.module.css
                }
            }
            else{
                addUserExercise({
                    variables: {
                        exercisename: chosen.exercise.name,
                        scalename: chosen.scale.name,
                        amount: parseInt(amount)
                    }
                })
                // POSSIBLE ERROR HANDLING FOR newUserExercise FAILURE!
                if(!newUserExercise.loading){
                    setSubmit(true)
                    setTimeout(() => {
                        setSubmit(false)
                    }, 800) // Synced with wiggle in exercise.module.css
                }            
            }            
            
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

    // ======================================================= RENDER =================================================================

    return(
        <div className={`${styles.main} ${clear ? styles.swing : ""}`}>
            <div className={`${styles.dropdown} ${shake.exercise ? styles.wiggle : ""}`} onClick={ () => handleDropDown("exercise") } >
                { 
                    chosen.exercise
                    ? 
                    <div className={styles.chosenHolder} >
                        <div className={styles.holder}>
                            <img
                                className={styles.image}
                                src={chosen.exercise.path}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null
                                    currentTarget.src = "/animations/Whistle.gif"
                                }}                                 
                            />
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
                        <img className={styles.image} src="/images/icons/Search.png" />
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
                        <img className={styles.image} src="/images/icons/Missing.png" />
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
                                    <img
                                        className={styles.image}
                                        src={exercise.path}
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null
                                            currentTarget.src = "/animations/Whistle.gif"
                                        }}                                        
                                    />
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
                        <img className={styles.image} src="/images/icons/Search.png" />
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
                        <img className={styles.image} src="/images/icons/Missing.png" />
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
                    src="/images/icons/Trash.png"
                />
            </div>
        </div>
    )
}

export default exercise