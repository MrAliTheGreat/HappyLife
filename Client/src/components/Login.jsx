import "../styles/login.css"

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
        <div className="main">
            {
                animationPaths.map((path) => <img className="rotating" key={path} src={path}/>)
            }
            <img className="logo" src="/animations/Run.gif" />
            <input placeholder="Username" type="text" />           
            <input placeholder="Password" type="text" />
            <button> Login </button>
        </div>
    )
}

export default login