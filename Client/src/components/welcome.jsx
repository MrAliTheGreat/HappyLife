import { useEffect } from "react"

import styles from "../styles/welcome.module.css"

const welcome = ({ setRender, username }) => {
    useEffect(() => {
        setTimeout(() => {
            setRender("home")
        }, 3500)
    }, [])

    return(
        <div className={styles.main}>
            <div className={styles.text}>
                Welcome Back
                <br />
                {username}
                <br />
                <br />
                Proud of You!
            </div>
        </div>
    )
}

export default welcome