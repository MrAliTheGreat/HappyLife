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

    const cals = [
        {
            "id": 1,
            "foodName": "Lifting",
            "scaleName": "kg",
            "cal": 200,
        },
        {
            "id": 2,
            "foodName": "Cycling",
            "scaleName": "kg",
            "cal": 500,
        },
        {
            "id": 3,
            "foodName": "Jump Rope",
            "scaleName": "Palm",
            "cal": 40,
        },
        {
            "id": 4,
            "foodName": "Swimming",
            "scaleName": "Cups",
            "cal": 60,
        },
        {
            "id": 5,
            "foodName": "Push Ups",
            "scaleName": "Cups",
            "cal": 1000,
        },
        {
            "id": 6,
            "foodName": "Tennis",
            "scaleName": "Serving",
            "cal": 300,
        },  
        {
            "id": 7,
            "foodName": "Swimming",
            "scaleName": "Palm",
            "cal": 400,
        },              
    ]

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
    const [amount, setAmount] = useState("")

    useEffect(() => {
        setDrop({ foodName: "", scaleName: "" })
        setChosen({ food: null, scale: null })
        setSearch({ foodName: "", scaleName: "" })
        setNewItem({ foodName: "", scaleName: "", cal: "" })
        setAmount("")
    }, [view])

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
            setDrop({...drop, foodName: "show"})
            return
        }
        drop.scaleName === "show" ?
        setDrop({...drop, scaleName: "hide"}) :
        setDrop({...drop, scaleName: "show"})
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
            e.target.value ?
            setChosen({...chosen, food: { id: 0, name: e.target.value, path: "/images/New.png" } }) :
            setChosen({...chosen, food: null })
            return
        }
        setNewItem({...newItem, scaleName: e.target.value})
        chosen.food ?
        e.target.value ?
        setChosen({...chosen, scale: {id: 0, name: e.target.value, path: "/images/New.png"} }) :
        setChosen({...chosen, scale: null }) :
        null
    }

    // THIS (SELECTION) CAN BE PLACED ON THE BACKEND AND HANDLED WITH GRAPHQL!!!
    const getFilteredItems = (option) => {
        if(option === "food"){
            return (
                foods.filter( (food) => {
                    return(
                        food.name.toLocaleLowerCase().includes(search.foodName.toLocaleLowerCase()) && (
                        chosen.scale ? 
                        cals.filter(({ foodName, scaleName }) => {
                            return foodName === food.name && scaleName === chosen.scale.name
                        }).length > 0 : true )            
                    )
                } )
            )
        }
        return (
            scales.filter( (scale) => {
                return (
                    scale.name.toLocaleLowerCase().includes(search.scaleName.toLocaleLowerCase()) && (
                    chosen.food ? 
                    cals.filter(({ foodName, scaleName }) => {
                        return scaleName === scale.name && foodName === chosen.food.name 
                    }).length > 0 : true )            
                )
            } )
        )        
    }

    const handleCaloriesValue = () => {
        return (
            (newItem.foodName || (newItem.scaleName && chosen.food)) ? 
            newItem.cal : 
            chosen.food && chosen.scale && amount ?
            cals.filter(({ foodName, scaleName }) => chosen.food.name === foodName && chosen.scale.name === scaleName)[0].cal * parseInt(amount) : ""
        )
    }

    const handleSubmit = () => {

    }

    // TO DO
    // id is set by backend
    // add mechanisim for clearing chosen ==> Is it necessary though?

    return(
        <div className={styles.main}>
            <div className={styles.dropdown} onClick={ () => handleDropDown("food") } >
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
            <div className={`${styles.dropdownMenu} ${getDropDownMenuClass("food")}`}>
                <div className={styles.row} >
                    <div className={styles.holder}>
                        <img className={styles.image} src="/images/Search.png" />
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
                        <img className={styles.image} src="/images/Missing.png" />
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
                            <div className={styles.dropdownItem} key={food.id} onClick={() => { handleSelect("food", food, null) }} >
                                <div className={styles.holder}>
                                    <img className={styles.image} src={food.path} />
                                </div>
                                <div className={styles.name}> {food.name} </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className={`${styles.dropdown} ${styles.secondDropdown}`} onClick={() => handleDropDown("scale")} >
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

            <div className={styles.valueHolder}>
                <input
                    className={styles.value}
                    placeholder="Amount"
                    value={newItem.foodName || (newItem.scaleName && chosen.food) ? 1 : amount}
                    readOnly={newItem.foodName || (newItem.scaleName && chosen.food) ? "readonly" : null}
                    onChange={(e) => setAmount(e.target.value)} 
                />
            </div>

            <div className={styles.valueHolder}>
                <input 
                    className={styles.value}
                    placeholder="Calories"
                    value={handleCaloriesValue()}
                    readOnly={newItem.foodName || (newItem.scaleName && chosen.food) ? null : "readonly"}
                    onChange={(e) => setNewItem({...newItem, cal: e.target.value}) } 
                />
            </div>            

            <button className={styles.button} onClick={ handleSubmit }>
                {newItem.foodName || (newItem.scaleName && chosen.food) ? "Add To List" : "Submit"}
            </button>
        </div>
    )
}

export default food