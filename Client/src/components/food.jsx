import { useState, useEffect } from "react"
import { useMutation, useQuery } from "@apollo/client"

import styles from "../styles/food.module.css"

import { 
    FOODS, 
    SCALES, 
    FOOD_SCALES, 
    SCALE_FOODS, 
    FOOD_SCALE_CALORIES, 
    ADD_FOOD 
} from "../constants/queries"


const food = ({ view }) => {
    const [drop, setDrop] = useState({
        foodName: "",
        scaleName: "",
    })
    const [chosen, setChosen] = useState({
        food: null,
        scale: null,
    })
    const [search, setSearch] = useState({
        foodName: "",
        scaleName: "",
    })
    const [newItem, setNewItem] = useState({
        foodName: "",
        scaleName: "",
        cal: "",
    })
    const [shake, setShake] = useState({
        food: false,
        scale: false,
        amount: false,
        calories: false,
    })
    const [amount, setAmount] = useState("")
    const [clear, setClear] = useState(false)
    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        setDrop({ foodName: "", scaleName: "" })
        setChosen({ food: null, scale: null })
        setSearch({ foodName: "", scaleName: "" })
        setNewItem({ foodName: "", scaleName: "", cal: "" })
        setShake({ food: false, scale: false, amount: false, calories: false })
        setAmount("")
        setClear(false)
        setSubmit(false)
    }, [view])

    const foodsRes = useQuery(FOODS, {
        onError: (err) => {
            console.log(err.graphQLErrors[0].message)
        },
        skip: view !== "food"
    })

    const scalesRes = useQuery(SCALES, {
        onError: (err) => {
            console.log(err.graphQLErrors[0].message)
        },
        variables: {
            group: "food"
        },        
        skip: view !== "food"
    })

    const foodScalesRes = useQuery(FOOD_SCALES, {
        onError: (err) => {
            console.log(err.graphQLErrors[0].message)
        },
        variables: {
            foodname: chosen.food ? chosen.food.name : null
        },        
        skip: !chosen.food
    })

    const scaleFoodsRes =  useQuery(SCALE_FOODS, {
        onError: (err) => {
            console.log(err.graphQLErrors[0].message)
        },
        variables: {
            scalename: chosen.scale ? chosen.scale.name : null
        },        
        skip: !chosen.scale
    })

    const foodScaleCaloriesRes =  useQuery(FOOD_SCALE_CALORIES, {
        onError: (err) => {
            console.log(err.graphQLErrors[0].message)
        },
        variables: {
            foodId: chosen.food ? chosen.food.id : null,
            scaleId: chosen.scale ? chosen.scale.id : null,
        },        
        skip: !(chosen.food && chosen.scale)
    })    

    const [ addFood, newFood ] = useMutation(ADD_FOOD, {
        refetchQueries: [
            {
                query: FOODS 
            },
            { 
                query: SCALES,
                variables: {
                    group: "food"
                }
            } 
        ]
    })

    const handleSelect = (option, food, scale) => {
        if(option === "food"){
            setChosen({...chosen, food})
            setDrop({...drop, foodName: "hide"})
            setSearch({...search, foodName: ""})
            return
        }
        setChosen({...chosen, scale});
        setDrop({...drop, scaleName: "hide"});
        setSearch({...search, scaleName: ""});        
    }

    const handleDropDown = (option) => {
        if(option === "food"){
            drop.foodName === "show" ? 
            setDrop({...drop, foodName: "hide"}) :
            setDrop({
                foodName: "show",
                scaleName: drop.scaleName ? "hide" : drop.scaleName
            })
            return
        }
        
        if(drop.scaleName === "show"){
            setDrop({...drop, scaleName: "hide"})
            setShake({...shake, food: false})
        }
        else{
            setDrop({
                foodName: drop.foodName ? "hide" : drop.foodName,
                scaleName: "show"
            })
        }
    }

    const getDropDownMenuClass = (option) => {
        if(option === "food"){
            return (
                drop.foodName === "show" ? 
                styles.dropdownMenuOn : 
                drop.foodName === "hide" ? 
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
        if(option === "food"){
            setNewItem({...newItem, foodName: e.target.value})
            if(e.target.value){
                setChosen({...chosen, food: { id: 0, name: e.target.value, path: "/images/icons/New.png" } })
                setAmount("1")
                return
            }
            setChosen({...chosen, food: null })
            setAmount("")
            return
        }
        setNewItem({...newItem, scaleName: e.target.value})
        if(chosen.food){
            if(e.target.value){
                setChosen({...chosen, scale: {id: 0, name: e.target.value, path: "/images/icons/New.png"} })
                setAmount("1")
                return
            }
            setChosen({...chosen, scale: null })
            setAmount("")
        }
        else{
            setShake({...shake, food: e.target.value !== ""})
        }
    }

    const getFilteredItems = (option) => {
        if(option === "food"){
            return (
                chosen.scale
                ?
                    scaleFoodsRes.loading || !scaleFoodsRes.data
                    ?
                        []
                    :
                    scaleFoodsRes.data.scaleFoods.map((scaleFood) => {
                        return scaleFood.food
                    })                        
                :
                    foodsRes.loading || !foodsRes.data
                    ? 
                        [] 
                    :
                        foodsRes.data.allFoods.filter((food) => {
                            return food.name.toLocaleLowerCase().includes(search.foodName.toLocaleLowerCase().trim())
                        })
            )
        }
        return (
            (chosen.food && !newItem.foodName)
            ?
                foodScalesRes.loading || !foodScalesRes.data
                ?
                    []
                :
                    foodScalesRes.data.foodScales.map((foodScale) => {
                        return foodScale.scale
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
            (newItem.foodName || (newItem.scaleName && chosen.food))
            ? 
                newItem.cal 
            : 
                chosen.food && chosen.scale && amount
                ?
                    foodScaleCaloriesRes.loading || !foodScaleCaloriesRes.data
                    ?
                        0 
                    :
                        foodScaleCaloriesRes.data.foodScaleCalories.calories * parseInt(amount)
                :
                    ""
        )
    }

    const checkMustShake = (val) => {
        return !(val.trim() === val && !isNaN(val) && val > 0 && parseFloat(val) === parseInt(val))
    }

    const handleSubmit = () => {
        setShake({
            food: !chosen.food,
            scale: !chosen.scale,
            amount: checkMustShake(amount),
            calories: newItem.foodName && checkMustShake(newItem.cal),
        })
        setTimeout(() => {
            setShake({ food: false, scale: false, amount: false, calories: false })
        }, 800) // Synced with wiggle in food.module.css

        if(newItem.foodName || (newItem.scaleName && chosen.food)){
            // Add to list --> addFood Mutation --> wait for res --> if ok then then setSubmit(true)
            addFood({
                variables: {
                    foodname: chosen.food.name,
                    scalename: chosen.scale.name,
                    calories: parseInt(newItem.cal)
                }
            })
            
            // POSSIBLE ERROR HANDLING FOR newFood FAILURE!
            if(!newFood.loading){
                setSubmit(true)
                setTimeout(() => {
                    setSubmit(false)
                }, 800) // Synced with wiggle in food.module.css
            }
        }
        else{
            // Submit --> AddUserFood Mutation --> the same as above
        }
        
        if(chosen.food && chosen.scale && !checkMustShake(amount) && !(newItem.foodName && checkMustShake(newItem.cal))){
            setChosen({ food: null, scale: null })
            setSearch({ foodName: "", scaleName: "" })
            setNewItem({ foodName: "", scaleName: "", cal: "" })
            setAmount("")
        }        
    }

    const handleClear = () => {
        setClear(true)
        setTimeout(() => {
            setClear(false)
        }, 1000) // Synced with swing in food.module.css

        setChosen({ food: null, scale: null })
        setNewItem({ foodName: "", scaleName: "", cal: "" })
        setAmount("")
    }

    const isSubmitted = () => {
        return submit && !Object.values(shake).some(v => v)
    }



    return(
        <div className={`${styles.main} ${clear ? styles.swing : ""}`}>
            <div className={`${styles.dropdown} ${shake.food ? styles.wiggle : ""}`} onClick={ () => handleDropDown("food") } >
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
                        Food?
                    </div> 
                }                
            </div>
            <div className={`${styles.dropdownMenu} ${getDropDownMenuClass("food")}`}>
                <div className={styles.row} >
                    <div className={styles.holder}>
                        <img className={styles.image} src="/images/icons/Search.png" />
                    </div>
                    <div className={`${styles.holder} ${styles.holderExtend}`}>
                        <input 
                            className={styles.input}
                            placeholder="Search Foods"
                            value={search.foodName}
                            onChange={(e) => setSearch({...search, foodName: e.target.value})}
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
                            placeholder="New Food Name?"
                            value={newItem.foodName}
                            onChange={ (e) => handleNewItem("food", e) }
                        />
                    </div>                    
                </div>                
                {
                    getFilteredItems("food").map((food) => {
                        return(
                            <div className={styles.dropdownItem} key={ food.id } onClick={() => { handleSelect("food", food, null) }} >
                                <div className={styles.holder}>
                                    <img className={styles.image} src={food.path} />
                                </div>
                                <div className={styles.name}> {food.name} </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className={`${styles.dropdown} ${styles.secondDropdown} ${shake.scale ? styles.wiggle : ""}`} onClick={() => handleDropDown("scale")} >
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
                    readOnly={newItem.foodName || (newItem.scaleName && chosen.food) ? "readonly" : null}
                    onChange={(e) => setAmount(e.target.value)} 
                />
            </div>

            <div className={`${styles.valueHolder} ${shake.calories ? styles.wiggle : ""}`}>
                <input 
                    className={styles.value}
                    placeholder="Calories"
                    value={ handleCaloriesValue() }
                    readOnly={newItem.foodName || (newItem.scaleName && chosen.food) ? null : "readonly"}
                    onChange={(e) => setNewItem({...newItem, cal: e.target.value}) } 
                />
            </div>

            <button className={`${styles.button} ${ isSubmitted() ? styles.submit : "" }`} onClick={ handleSubmit }>
                {newItem.foodName || (newItem.scaleName && chosen.food) ? "Add To List" : isSubmitted() ? "OK!" : "Submit"}
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

export default food