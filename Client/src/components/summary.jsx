import { useState } from "react"

import styles from "../styles/summary.module.css"

const summary = ({ total, remaining, gain, loss, streak }) => {
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
    <div className={styles.main} style={{background: getMainGradientStyling(remaining, total)}} onDoubleClick={handleDetail} >
            <div className={`${styles.count} ${detail === "shrink" ? styles.countShrink : detail === "expand" ? styles.countExpand : ""}`} style={{border: getBorderStyling(remaining, total), background: getCircleStyling(remaining, total)}}>
                {remaining} / {total}
            </div>
            <div className={`${styles.details} ${detail === "shrink" ? styles.detailsShow : detail === "expand" ? styles.detailsHide : styles.detailsStart}`}>
                <div>
                    Remaining (Cal): <br/>
                    Total (Cal): <br/>
                    Food (Cal): <br/>
                    Exercise (Cal): <br/>
                    Streak (Days): <br/>
                </div>
                <div>
                    { remaining } <br/>
                    { total } <br/>
                    { gain } <br/>
                    { loss } <br/>
                    { streak } <br/>
                </div>
            </div>
        </div>
    )
}

export default summary