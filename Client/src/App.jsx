import Login from "./components/Login"
import Home from "./components/home"
import Header from "./components/header"

function App() {
  const renderOptions = "header"

  return (
    <>
      {
        renderOptions === "login" ? <Login /> :
        renderOptions === "home" ? <Home /> :
        renderOptions === "header" ? <Header /> :
        null
      }
    </>
  )
}

export default App
