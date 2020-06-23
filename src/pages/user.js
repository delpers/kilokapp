import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import moment from "moment"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { auth, logout } from "../utils/firebase"

const STRIPE_PK_KEY =
  "pk_test_51GqJtIK8I3CGeQRSMHhuhVkvRRXpaThOzyzQks0TJsRXUuSQTTyw4azzrzqWq1FRbZ5wiLj5TpUZR8c2cEws1I1v00GhpO44IP"
// const STRIPE_SK_KEY =
//   "sk_test_51GqJtIK8I3CGeQRStmnRAQLhKPq71vQFIAxQ0IPAJnyarje9Nkn5PTVpQy3a1Ck8b7bvLj41mVuhjp03xcHxjHWx001D3HnLy8"
// const STRIPE_RK_KEY =
//   "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"
// const stripe = require("stripe")(STRIPE_SK_KEY)
const STRIPE_3MONTH_KEY_PRICE = "price_1GuIxnK8I3CGeQRSn7Xg3d5T"
const STRIPE_1MONTH_KEY_PRICE = "price_1GqJwzK8I3CGeQRSfhv0zANs"
const SUCCESS_URL = "http://localhost:8000/user"
const CANCEL_URL = "http://localhost:8000/user"
const stripePromise = loadStripe(STRIPE_PK_KEY)
const API_UNSUBCRIPTION =
  "https://stripe-api-serverless.vercel.app/api/users/unsubscribe"
const API_GET_PLANS = "https://stripe-api-serverless.vercel.app/api/plans"
const API_GET_PLANS_BY_EMAIl =
  "https://stripe-api-serverless.vercel.app/api/users"

const UserPage = props => {
  const [emailUser, setEmailUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userHavePlan, setUserHavePlan] = useState(false)
  const [plans, setPlans] = useState([])
  const logoutUser = async () => {
    await logout()
      .then(() => {
        navigate("/")
      })
      .catch(error => {
        alert(error.message)
      })
  }

  const checkoutSubscribe = async id => {
    const stripe = await stripePromise
    const { error } = await stripe
      .redirectToCheckout({
        lineItems: [
          {
            price: id,
            quantity: 1,
          },
        ],
        mode: "subscription",
        successUrl: SUCCESS_URL,
        cancelUrl: CANCEL_URL,
        customerEmail: emailUser,
      })
      .then(res => {
        alert("success")
      })
      .catch(error => {
        alert(error)
      })
    if (error) {
      console.warn("Error:", error)
    }
  }

  const getPlans = () => {
    auth().onAuthStateChanged(user => {
      if (!user) {
        navigate("/login")
      } else {
        setEmailUser(user.email)
        const getPlanByUser = axios.post(API_GET_PLANS_BY_EMAIl, {
          email: auth().currentUser.email,
        })
        const getAllPlan = axios.get(API_GET_PLANS)
        axios
          .all([getPlanByUser, getAllPlan])
          .then(
            axios.spread((planByUser, allPlan) => {
              const planUser = planByUser.data.payload
              const plans = allPlan.data.payload
              if (planUser) {
                console.log(
                  moment
                    .unix(planUser.subscriptions.current_period_end)
                    .isBefore()
                )
                if (
                  moment
                    .unix(planUser.subscriptions.current_period_end)
                    .isBefore()
                ) {
                  setPlans(plans)
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
                  setUserHavePlan(true)
                  setPlans(addDataPlanUser)
                }
              } else {
                setPlans(plans)
              }
              setLoading(false)
            })
          )
          .catch(error => {
            alert(error.message)
          })
      }
    })
  }

  const onSubcription = dataPlanUser => {
    const { subscriptions } = dataPlanUser
    if (!subscriptions.cancel_at_period_end) {
      //Unsubscription Here
      axios.post(API_UNSUBCRIPTION, { sub_id: subscriptions.id })
      const newPlans = {
        ...plans[0],
        user_plan: {
          ...plans[0].user_plan,
          subscriptions: {
            ...plans[0].user_plan.subscriptions,
            cancel_at_period_end: true,
            cancel_at: moment().unix(),
          },
        },
      }
      setPlans([newPlans])
    } else {
      // Still subscription
    }
  }

  useEffect(() => {
    getPlans()
  }, [])

  return (
    <Layout>
      <SEO title="Mon compte" />

      <div>
        <div className="m-w p-i m-w ">
          <h1 className="fs-48   mw728">Mon compte</h1>
        </div>

        <div className="m-w p-i pb-0 bg-w link justify mt-32 mb-32 init">
          <div>
            <div className="grd_f">
              {!loading && plans.length !== 0 ? (
                <div>
                  {plans.map(plan => (
                    <div key={plan.id} className="bgb mb-10">
                      <span className="info_txt">
                        {userHavePlan ? "You are currently premium" : "Premium"}
                      </span>

                      <span className="stripe_name">{plan.product.name}</span>
                      <div className="info_mth">
                        For € {plan.amount / 100} /{" "}
                        {plan.interval_count + " " + plan.interval}
                      </div>
                      {plan.user_plan && (
                        <div className="time_end">
                          Time End :
                          {moment
                            .unix(
                              plan.user_plan.subscriptions.current_period_end
                            )
                            .format("ll")}
                          {plan.user_plan.subscriptions.trial_end && " (Trial)"}
                        </div>
                      )}
                      {userHavePlan ? (
                        !_.get(
                          plan,
                          "user_plan.subscriptions.cancel_at_period_end"
                        ) && (
                          <div className="bay bg-w">
                            <button
                              className="btnun"
                              onClick={() =>
                                !userHavePlan
                                  ? checkoutSubscribe(plan.id)
                                  : onSubcription(plan.user_plan)
                              }
                            >
                              {plan.user_plan.subscriptions.cancel_at_period_end
                                ? "Subscribe"
                                : "Unsubscribe"}
                            </button>
                          </div>
                        )
                      ) : (
                        <div className="bay bg-w">
                          <button
                            className="btnun"
                            onClick={() =>
                              !userHavePlan
                                ? checkoutSubscribe(plan.id)
                                : onSubcription(plan.user_plan)
                            }
                          >
                            Buy
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <h5 style={{ textAlign: "center" }}> Loading ....</h5>
              )}

              <div>
                <div className="info_mth">Your informations</div>
                <div className="info_mti">
                  registred with: {emailUser && emailUser}
                </div>

                <div className="info_mti">
                  <a className="cred" href="">
                    Deleted my account
                  </a>
                </div>

                <div className="dex bg-w">
                  <button onClick={logoutUser} className="btndex">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UserPage
