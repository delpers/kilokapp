import React, { useEffect, useState } from "react"
import { auth } from "../utils/firebase"
import axios from "axios"
import moment from "moment"

const defaultValue = {
  user: null,
  premium: false,
  planUser: null,
  loading: true,
}
const API_GET_PLANS_BY_EMAIl = `${process.env.GATSBY_PUBLIC_URL}/api/users`
const API_GET_PLANS = `${process.env.GATSBY_PUBLIC_URL}/api/plans`

const UserContext = React.createContext(defaultValue)

export const UserProvider = props => {
  const [dataCtx, setDataCtx] = useState(defaultValue)
  const checkUserLogin = () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setDataCtx({ ...dataCtx, user, loading: true })
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
                setDataCtx({
                  ...dataCtx,
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
                setDataCtx({
                  ...dataCtx,
                  user,
                  planUser: addDataPlanUser,
                  premium: true,
                  loading: false,
                })
              }
            } else {
              setDataCtx({
                ...dataCtx,
                loading: false,
                user,
                premium: false,
                planUser: plans,
              })
            }
          })
        )
      } else {
        setDataCtx({ ...dataCtx, loading: false })
      }
    })
  }
  const setPlans = data => {
    setDataCtx({ ...dataCtx, planUser: data })
  }
  useEffect(() => {
    checkUserLogin()
  }, [])
  return (
    <UserContext.Provider value={{ ...dataCtx, setPlans }}>
      {props.children}
    </UserContext.Provider>
  )
}
export default UserContext
