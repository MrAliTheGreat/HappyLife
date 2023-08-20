import { useState } from "react"

import Login from "./components/login"
import Home from "./components/home"
import Header from "./components/header"
import Welcome from "./components/welcome"

function App() {
  const [render, setRender] = useState("login")

  return (
    <>
      {
        render === "login" ? <Login setRender={setRender} /> :
        render === "welcome" ? <Welcome /> :
        null
      }
    </>
  )
}

export default App
