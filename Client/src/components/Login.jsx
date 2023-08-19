import styles from "../styles/login.module.css"

const login = () => {
    const animationPaths = [
        "/animations/Cycling.gif",
        "/animations/FrogStroke.gif",
        "/animations/JumpRope.gif",
        "/animations/Lift.gif",
        "/animations/PushUp.gif",
        "/animations/Tennis.gif",
    ]

    return(
        <div className={styles.main}>
            {
                animationPaths.map((path) => <img className={styles.rotating} key={path} src={path}/>)
            }
            <div className={styles.holder}>
                <img className={styles.logo} src="/animations/Run.gif" />
                <input className={styles.input} placeholder="Username" type="text" />           
                <input className={styles.input} placeholder="Password" type="text" />
                <button className={styles.button}> Login </button>
            </div>
        </div>
    )
}

export default login