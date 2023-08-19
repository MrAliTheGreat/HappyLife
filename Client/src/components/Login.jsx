import "../styles/login.css"

const login = () => {
    return(
        <div className="root">
            <img className="logo" src="../../public/animations/Run.gif" />
            <input placeholder="Username" type="text" />           
            <input placeholder="Password" type="text" />
        </div>
    )
}

export default login