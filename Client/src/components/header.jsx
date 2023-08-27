import styles from "../styles/header.module.css"

// TO DO
// Make clickable after animation is done!

const header = ({ setView }) => {
    return(
        <div className={styles.main}>
            <div className={`${styles.holder} ${styles.left}`} onClick={() => setView("exercise") } >
                <img className={styles.image} src="/images/Dumbbell.png"/>
            </div>            
            <img className={styles.logo} src="/animations/Run.gif" onClick={() => setView("panel")} />
            <div className={`${styles.holder} ${styles.right}`} onClick={() => setView("food") } >
                <img className={styles.image} src="/images/Food.png"/>
            </div>
        </div>
    )
}

export default header