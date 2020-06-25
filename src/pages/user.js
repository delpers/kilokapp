import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import { loadStripe } from "@stripe/stripe-js"

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

const UserPage = props => {
  console.log(props)
  const [emailUser, setEmailUser] = useState(null)
  const logoutUser = async () => {
    await logout()
      .then(() => {
        navigate("/")
        localStorage.removeItem("emailUser")
      })
      .catch(error => {
        alert(error.message)
      })
  }

  const checkoutSubscribe = async month => {
    const stripe = await stripePromise
    const { error } = await stripe
      .redirectToCheckout({
        lineItems: [
          {
            price:
              month === 1 ? STRIPE_1MONTH_KEY_PRICE : STRIPE_3MONTH_KEY_PRICE,
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

  const checkUser = async () => {
    auth().onAuthStateChanged(user => {
      if (!user) {
        navigate("/login")
      } else {
        setEmailUser(user.email)
      }
    })
  }
  useEffect(() => {
    checkUser()
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
              <div>
                <div className="bgb mb-10">
                  <span className="info_txt">You are currently premium</span>

                  <span className="stripe_name">Kiloka Prenium </span>
                  <div className="info_mth">For € 9.99 / Month</div>
                  <div className="bay bg-w">
                    <button
                      className="btnun"
                      onClick={() => checkoutSubscribe(1)}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
                <div className="bgb">
                  <span className="info_txt">You are currently premium</span>

                  <span className="stripe_name">Kiloka Prenium 3 Month</span>
                  <div className="info_mth">For € 9.99 / Month</div>
                  <div className="bay bg-w">
                    <button
                      className="btnun"
                      onClick={() => checkoutSubscribe(3)}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>

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
