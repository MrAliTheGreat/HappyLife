import { useEffect, useState } from "react"
import { useApolloClient, useQuery } from "@apollo/client"

import Login from "./components/login"
import Home from "./components/home"
import Welcome from "./components/welcome"

import { CURRENT_USER } from "./constants/queries"

function App() {
  const [render, setRender] = useState("")
  const [user, setUser] = useState(null)

  const client = useApolloClient()

  const { data, refetch } = useQuery(CURRENT_USER, {
    onError: (err) => {
      console.log(err.graphQLErrors[0].message)
      setRender("login")
    },
    onCompleted: ({ currentUserInfo }) => {
      if(currentUserInfo){
        setUser(currentUserInfo)
        setRender("welcome")
      }
    },
  })

  useEffect(() => {
    data ? setUser(data.currentUserInfo) : null
  }, [data])

  return (
    <>
      {
        render === "login" ? <Login refetchUser={ refetch } /> :        
        user && render === "welcome" ? <Welcome setRender={ setRender } username={ user.username } /> :
        user && render === "home" ? <Home setRender={setRender} client={ client } user={ user } /> :
        null
      }
    </>
  )
}

export default App
