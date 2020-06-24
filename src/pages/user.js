import React, { useEffect, useState, useContext, useCallback } from "react"
import { navigate } from "gatsby"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import moment from "moment"
import _ from "lodash"

import Layout from "../components/layout"
import UserContext from "../components/UserContext"
import SEO from "../components/seo"
import { auth, logout } from "../utils/firebase"

const STRIPE_PK_KEY =
  "pk_test_51GqJtIK8I3CGeQRSMHhuhVkvRRXpaThOzyzQks0TJsRXUuSQTTyw4azzrzqWq1FRbZ5wiLj5TpUZR8c2cEws1I1v00GhpO44IP"

const stripePromise = loadStripe(STRIPE_PK_KEY)
const API_UNSUBCRIPTION =
  "https://stripe-api-serverless.vercel.app/api/users/unsubscribe"
const API_GET_PLANS = "https://stripe-api-serverless.vercel.app/api/plans"

const UserPage = props => {
  const [emailUser, setEmailUser] = useState(null)
  const { user, planUser, premium } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [plans, setPlans] = useState([])
  const logoutUser = async () => {
    await logout()
      .then(() => {
        window.location.reload()
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
        successUrl: `${process.env.GATSBY_PUBLIC_URL}/user`,
        cancelUrl: `${process.env.GATSBY_PUBLIC_URL}/user`,
        customerEmail: emailUser,
      })
      .catch(error => {
        alert(error)
      })
    if (error) {
      console.warn("Error:", error)
    }
  }
  console.log("render")
  const getPlans = useCallback(() => {
    axios
      .get(API_GET_PLANS)
      .then(res => {
        const plans = res.data.payload
        if (planUser) {
          if (
            moment.unix(planUser.subscriptions.current_period_end).isBefore()
          ) {
            setPlans(plans)
          } else {
            const dataPlanUser = plans.filter(plan => {
              if (plan.id === planUser.subscriptions.items.data[0].plan.id) {
                return plan
              }
            })
            const addDataPlanUser = dataPlanUser.map(plan => ({
              ...plan,
              user_plan: planUser,
            }))
            setPlans(addDataPlanUser)
            setLoading(false)
          }
        } else {
          setPlans(plans)
          setLoading(false)
        }
      })
      .catch(error => {
        alert(error.message)
      })
  }, [planUser])

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
    if (!user) {
      navigate("/login")
    } else {
      setEmailUser(user.email)
      if (plans.length === 0) {
        getPlans()
      }
    }
  }, [planUser])

  return (
    <Layout>
      <SEO title="Mon compte" />
      {loading ? (
        <h5 style={{ textAlign: "center" }}>Loading ...</h5>
      ) : (
        <div>
          <div className="m-w p-i m-w ">
            <h1 className="fs-48   mw728">Mon compte</h1>
          </div>

          <div className="m-w p-i pb-0 bg-w link justify mt-32 mb-32 init">
            <div>
              <div className="grd_f">
                {plans.length !== 0 ? (
                  <div>
                    {plans.map(plan => (
                      <div key={plan.id} className="bgb mb-10">
                        <span className="info_txt">
                          {premium
                            ? "You are currently premium"
                            : "Premium Plan"}
                        </span>

                        <span className="stripe_name">{plan.product.name}</span>
                        <div className="info_mth">
                          For € {plan.amount / 100} /{" "}
                          {plan.interval_count + " " + plan.interval}
                        </div>
                        {plan.user_plan && (
                          <div className="time_end" style={{ color: "#fff" }}>
                            Time End :
                            {moment
                              .unix(
                                plan.user_plan.subscriptions.current_period_end
                              )
                              .format("ll")}
                            {plan.user_plan.subscriptions.trial_end &&
                              " (Trial)"}
                            {moment
                              .unix(
                                plan.user_plan.subscriptions.current_period_end
                              )
                              .isBefore() && (
                              <span style={{ color: "red" }}>OUT DATE</span>
                            )}
                          </div>
                        )}
                        {plan.trial_period_days && (
                          <div className="time_end" style={{ color: "#fff" }}>
                            Days Trial : {plan.trial_period_days}
                          </div>
                        )}
                        {premium ? (
                          !_.get(
                            plan,
                            "user_plan.subscriptions.cancel_at_period_end"
                          ) && (
                            <div className="bay bg-w">
                              <button
                                className="btnun"
                                onClick={() =>
                                  !premium
                                    ? checkoutSubscribe(plan.id)
                                    : onSubcription(plan.user_plan)
                                }
                              >
                                {plan.user_plan &&
                                plan.user_plan.subscriptions
                                  .cancel_at_period_end
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
                                !premium
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
                ) : null}

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
      )}
    </Layout>
  )
}

export default UserPage
