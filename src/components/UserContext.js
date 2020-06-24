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
const API_GET_PLANS = "https://stripe-api-serverless.vercel.app/api/plans"

const UserContext = React.createContext(defaultValue)

export const UserProvider = props => {
  const [dataUser, setDataUser] = useState(defaultValue)
  const checkUserLogin = () => {
    setDataUser({ ...dataUser, loading: true })
    auth().onAuthStateChanged(user => {
      if (user) {
        setDataUser({ ...dataUser, user, loading: true })
        const getPlanByUser = axios.post(API_GET_PLANS_BY_EMAIl, {
          email: user.email,
        })
        const getAllPlan = axios.get(API_GET_PLANS)
        axios.all([getPlanByUser, getAllPlan]).then(
          axios.spread((planByUser, allPlan) => {
            const planUser = planByUser.data.payload
            const plans = allPlan.data.payload
            if (planUser) {
              if (
                moment
                  .unix(planUser.subscriptions.current_period_end)
                  .isBefore()
              ) {
                setDataUser({
                  ...dataUser,
                  loading: false,
                  user,
                  premium: false,
                  planUser: plans,
                })
              } else {
                const dataPlanUser = plans.filter(plan => {
                  if (
                    plan.id === planUser.subscriptions.items.data[0].plan.id
                  ) {
                    return plan
                  }
                })
                const addDataPlanUser = dataPlanUser.map(plan => ({
                  ...plan,
                  user_plan: planUser,
                }))
                setDataUser({
                  ...dataUser,
                  user,
                  planUser: addDataPlanUser,
                  premium: true,
                  loading: false,
                })
              }
            } else {
              setDataUser({
                ...dataUser,
                loading: false,
                user,
                premium: false,
                planUser: plans,
              })
            }
          })
        )
      } else {
        setDataUser({ ...dataUser, loading: false })
      }
    })
  }
  const setPlans = data => {
    setDataUser({ ...dataUser, planUser: data })
  }
  useEffect(() => {
    checkUserLogin()
  }, [])
  return (
    <UserContext.Provider value={{ ...dataUser, setPlans }}>
      {props.children}
    </UserContext.Provider>
  )
}
export default UserContext
