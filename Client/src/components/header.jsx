import styles from "../styles/header.module.css"

const header = ({ setView, visited, setVisited }) => {
    return(
        <div className={styles.main}>
            <div className={`${styles.holder} ${styles.left}`} onClick={() => {setView("exercise"); setVisited({...visited, "exercise": true})} } >
                <img className={styles.image} src="/images/Dumbbell.png"/>
            </div>            
            <img className={styles.logo} src="/animations/Run.gif" onClick={() => setView("panel")} />
            <div className={`${styles.holder} ${styles.right}`} onClick={() => {setView("food"); setVisited({...visited, "food": true})} } >
                <img className={styles.image} src="/images/Food.png"/>
            </div>
        </div>
    )
}

export default header