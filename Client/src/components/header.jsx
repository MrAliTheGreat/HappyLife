import styles from "../styles/header.module.css"

const header = () => {
    return(
        <div className={styles.main}>
            <div className={`${styles.holder} ${styles.left}`}>
                <img className={styles.image} src="/images/Dumbbell.png"/>
            </div>            
            <img className={styles.logo} src="/animations/Run.gif"/>
            <div className={`${styles.holder} ${styles.right}`}>
                <img className={styles.image} src="/images/Food.png"/>
            </div>
        </div>
    )
}

export default header