import { useState } from "react"
import styles from "../styles/summary.module.css"

const summary = () => {
    const remainingCal = 4000
    const totalCal = 6000

    const [detail, setDetail] = useState("")

    const getBorderStyling = (remainingCal, totalCal) => {
        const ratioCal = remainingCal / totalCal
        if(ratioCal < 0.6 && ratioCal >= 0.3){
            return "5px solid #FFB358"
        }
        if(ratioCal < 0.3){
            return "5px solid #FF5252"
        }
        return "5px solid #73FFB1"
    }

    const getCircleStyling = (remainingCal, totalCal) => {
        const ratioCal = remainingCal / totalCal
        if(ratioCal < 0.6 && ratioCal >= 0.3){
            return `conic-gradient(transparent ${(1 - ratioCal) * 360}deg, #FF8E23 0deg)`
        }
        if(ratioCal < 0.3){
            return `conic-gradient(transparent ${(1 - ratioCal) * 360}deg, #FF2F2F 0deg)`
        }
        return `conic-gradient(transparent ${(1 - ratioCal) * 360}deg, #00ff70 0deg)`
    }

    const getMainGradientStyling = (remainingCal, totalCal) => {
        const ratioCal = remainingCal / totalCal
        if(ratioCal < 0.6 && ratioCal >= 0.3){
            return "linear-gradient(-45deg, #ffc67c, 40%, #da6116)"
        }
        if(ratioCal < 0.3){
            return "linear-gradient(-45deg, #ff1515, 50%, #b6175f)"
        }
        return "linear-gradient(-45deg, #13e189, 40%, #008684)"
    }

    const handleDetail = () => {
        detail === "shrink" ? setDetail("expand") :
        detail === "expand" ? setDetail("shrink") : setDetail("shrink")
    }

    return(
    <div className={styles.main} style={{background: getMainGradientStyling(remainingCal, totalCal)}} onClick={handleDetail} >
            <div className={`${styles.count} ${detail === "shrink" ? styles.countShrink : detail === "expand" ? styles.countExpand : ""}`} style={{border: getBorderStyling(remainingCal, totalCal), background: getCircleStyling(remainingCal, totalCal)}}>
                {remainingCal} / {totalCal}
            </div>
            <div className={`${styles.details} ${detail === "shrink" ? styles.detailsShow : detail === "expand" ? styles.detailsHide : styles.detailsStart}`}>
                <div>
                    Remaining Calories (Cal): <br/>
                    Total Calories (Cal): <br/>
                    Intake Calories (Cal): <br/>
                    Exercise Calories (Cal): <br/>
                    Streak (Days): <br/>
                </div>
                <div>
                    {remainingCal} <br/>
                    {totalCal} <br/>
                    5100 <br/>
                    1000 <br/>
                    390 <br/>
                </div>
            </div>
        </div>
    )
}

export default summary