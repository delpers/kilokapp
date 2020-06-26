import React, { useEffect, useState, useContext, useCallback } from "react"
import { navigate } from "gatsby"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import moment from "moment"
import _ from "lodash"

import Layout from "../components/layout"
import UserContext from "../components/UserContext"
import SEO from "../components/seo"
import { logout } from "../utils/firebase"

const STRIPE_PK_KEY = process.env.GATSBY_STRIPE_PUBLIC_KEY

const stripePromise = loadStripe(STRIPE_PK_KEY)
const API_UNSUBCRIPTION = `${process.env.GATSBY_PUBLIC_URL}/api/users/unsubscribe`

const UserPage = props => {
  const { user, planUser, premium, setPlans } = useContext(UserContext)
  const [email, setEmail] = useState("")

  const logoutUser = async () => {
    await logout()
      .then(() => {})
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
        customerEmail: user.email,
      })
      .catch(error => {
        alert(error)
      })
    if (error) {
      console.warn("Error:", error)
    }
  }

  const onSubcription = dataPlanUser => {
    const { subscriptions } = dataPlanUser
    if (!subscriptions.cancel_at_period_end) {
      //Unsubscription Here
      axios.post(API_UNSUBCRIPTION, { sub_id: subscriptions.id })
      const newPlans = {
        ...planUser[0],
        user_plan: {
          ...planUser[0].user_plan,
          subscriptions: {
            ...planUser[0].user_plan.subscriptions,
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
      setEmail(user.email)
    }
  }, [planUser])
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
              {planUser && planUser.length !== 0 ? (
                <div>
                  {planUser.map(plan => (
                    <div key={plan.id} className="bgb mb-10">
                      <span className="info_txt">
                        {premium ? "Votre abonnement" : "Premium Plan"}
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
                          {plan.user_plan.subscriptions.trial_end && " (Trial)"}
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
                              plan.user_plan.subscriptions.cancel_at_period_end
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
                {user ? (
                  <div className="info_mti">registred with: {email}</div>
                ) : null}

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
