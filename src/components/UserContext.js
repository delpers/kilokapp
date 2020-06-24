import React, { useEffect, useState } from "react"
import { auth } from "../utils/firebase"
import axios from "axios"
import moment from "moment"

const defaultValue = {
  user: null,
  premium: false,
  planUser: null,
  loading: false,
}
const API_GET_PLANS_BY_EMAIl =
  "https://stripe-api-serverless.vercel.app/api/users"

const UserContext = React.createContext(defaultValue)

export const UserProvider = props => {
  const [dataUser, setDataUser] = useState(defaultValue)
  const checkUserLogin = () => {
    setDataUser({ ...dataUser, loading: true })
    auth().onAuthStateChanged(user => {
      if (user) {
        setDataUser({ ...dataUser, user, loading: true })
        axios.post(API_GET_PLANS_BY_EMAIl, { email: user.email }).then(res => {
          const planUser = res.data.payload
          if (planUser) {
            if (
              moment.unix(planUser.subscriptions.current_period_end).isBefore()
            ) {
              setDataUser({ ...dataUser, loading: false, user, premium: false })
            } else {
              setDataUser({
                ...dataUser,
                user,
                planUser,
                premium: true,
                loading: false,
              })
            }
          } else {
            setDataUser({ ...dataUser, loading: false, user, premium: false })
          }
        })
      } else {
        setDataUser({ ...dataUser, loading: false })
      }
    })
  }

  useEffect(() => {
    checkUserLogin()
  }, [])
  return (
    <UserContext.Provider value={{ ...dataUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
export default UserContext
