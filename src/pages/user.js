import React, { useEffect, useState, useContext, useCallback } from "react"
import { navigate } from "gatsby"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import moment from "moment"
import _ from "lodash"

import Layout from "../components/layout"
import Audio from "../components/homeScreen/views/audio"
import UserContext from "../components/UserContext"
import SEO from "../components/seo"
import { logout } from "../utils/firebase"
import styled from "@emotion/styled"

const Background = styled.div`
  background: #ffffff;
  header {
    position: relative !important;
    border: 0 !important;
    background: white;
    border-bottom: 1px solid #ededed;
  }
`
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
    <Background>
      <Layout>
        <SEO title="Mon compte" />
        <div>
          <div className="m-w p-i pb-0 link justify mtandmb-24 init">
            <h2>Mon compte</h2>
            <div>
              <div className="grd_f">
                {planUser && planUser.length !== 0 ? (
                  <div className="bg-w grpl">
                    {planUser.map(plan => (
                      <div key={plan.id} className="mb-10 plan">
                        <span className="badw cw">
                          {premium ? "Abonnement en cours" : "Formule"}
                        </span>
                        <div className="fs-28 align-left p-15-0 fw300 pt-15">
                          {plan.product.name}
                        </div>

                        <div className="info_mth">
                          <span className="price">€ {plan.amount / 100}</span>

                          {plan.interval_count + " " + plan.interval}
                        </div>
                        {plan.user_plan && (
                          <div
                            className="time_end fs-16"
                            style={{ color: "#000" }}
                          >
                            <span className="mr-5">Prendra fin le</span>
                            {moment
                              .unix(
                                plan.user_plan.subscriptions.current_period_end
                              )
                              .format("ll")}
                            {plan.user_plan.subscriptions.trial_end &&
                              " (Période d'essai)"}
                            {moment
                              .unix(
                                plan.user_plan.subscriptions.current_period_end
                              )
                              .isBefore() && (
                              <span style={{ color: "red" }}>
                                Date de sortie
                              </span>
                            )}
                          </div>
                        )}
                        {plan.trial_period_days && (
                          <div
                            className="time_end fs-16"
                            style={{ color: "#000" }}
                          >
                            Période d'essai: {plan.trial_period_days} j
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
                                  ? "Continuez"
                                  : "Annuler votre abonnement"}
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
                              Continuez
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : null}

                <div>
                  <h2 className="info_mth">Vos informations</h2>
                  {user ? <div className="info_mti">E-mail {email}</div> : null}

                  <div className="info_mti"></div>
                  {user && (
                    <button onClick={logoutUser} className="btnlogout">
                      Déconnexion
                    </button>
                  )}
                </div>
              </div>
              <Audio />

            </div>

          </div>
        </div>
      </Layout>
    </Background>
  )
}

export default UserPage
