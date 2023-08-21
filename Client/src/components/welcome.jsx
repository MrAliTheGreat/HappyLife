import styles from "../styles/welcome.module.css"

const welcome = () => {
    // Find this out from user's token
    const username = "Dr"

    return(
        <div className={styles.main}>
            <div className={styles.text}>
                Welcome Back {username}
                <br />
                <br />
                Proud of You!
            </div>
        </div>
    )
}

export default welcome