import { useState } from "react"

import styles from "../styles/login.module.css"

const login = ({ setRender }) => {
    const animationPaths = [
        "/animations/Cycling.gif",
        "/animations/FrogStroke.gif",
        "/animations/JumpRope.gif",
        "/animations/Lift.gif",
        "/animations/PushUp.gif",
        "/animations/Tennis.gif",
    ]

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [enter, setEnter] = useState(true)


    const handleLogin = () => {
        console.log(`Username: ${username}`)
        console.log(`Password: ${password}`)

        // Checking credentials in the database
        // What happens if no one is found?
        
        setEnter(false)
        setTimeout(() => {
            setRender("welcome")
        }, 1000)

        setUsername(""); setPassword("")
    }

    return(
        <div className={styles.main}>
            {
                animationPaths.map((path) => <img className={ enter ? styles.rotating : styles.rotatingOut} key={path} src={path}/>)
            }
            <div className={ enter ? styles.holder : styles.holderOut}>
                <img className={styles.logo} src="/animations/Run.gif" />
                <input className={styles.input} placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />           
                <input className={styles.input} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className={styles.button} onClick={handleLogin}> Login </button>
            </div>
        </div>
    )
}

export default login