import { useState } from "react"
import { useMutation } from "@apollo/client"

import styles from "../styles/login.module.css"
import { LOGIN } from "../constants/queries"

const login = ({ refetchUser }) => {
    const animationPaths = [
        "/animations/Cycling.gif",
        "/animations/Frog_Stroke.gif",
        "/animations/Jump_Rope.gif",
        "/animations/Lift.gif",
        "/animations/Push_Up.gif",
        "/animations/Tennis.gif",
    ]

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [answer, setAnswer] = useState(false)
    const [enter, setEnter] = useState(true)

    const [login] = useMutation(LOGIN, {
        onError: (err) => {
            console.log(err.graphQLErrors[0].message)
        },
        onCompleted: (data) => {
            setEnter(false)
            setTimeout(() => {
                localStorage.setItem("HappyLifeToken", data.login.value)       
                refetchUser()
            }, 1000)
    
            setUsername(""); setPassword(""); setAnswer(false);
        },
    })

    const handleLogin = () => {
        // What happens if no one is found? ==> JUST PRE-DEFINED USERS FOR NOW!!!
        if(!answer){
            login({
                variables: {
                    username,
                    password
                }
            })
        }
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
                <div className={styles.new}>
                    New User?
                    <div className={`${styles.answer} ${answer ? styles.answerFlipYes : styles.answerFlipNo}`} onClick={() => setAnswer(!answer)}>
                        {answer ? "Yeah" : "Nope"}
                    </div>
                </div>
                <button className={styles.button} onClick={ handleLogin }> {answer ? "Create New Account" : "Sign in"} </button>
            </div>
        </div>
    )
}

export default login