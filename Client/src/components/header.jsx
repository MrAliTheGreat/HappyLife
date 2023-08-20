import styles from "../styles/header.module.css"

const header = () => {
    return(
        <div className={styles.main}>
            <img className={styles.logo} src="/public/animations/Run.gif"/>
        </div>
    )
}

export default header