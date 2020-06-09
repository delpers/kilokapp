import React from "react"
import Layout from "../components/layout"
import styled from "@emotion/styled"
import SEO from "../components/seo"

const Background = styled.div`
  background: #f8f8f8;
  .btn_h {
    display: none !important;
  }
  .btn_h_r {
    display: block !important;
  }
`

const UserPage = () => (
  <Background>
    <Layout>
      <SEO title="Recherche" />

      <div className="w-screen p-120-0">
        <div className="m-w p-i pb-0 pt-0">
          <section>
            <h1 className="w-50">Account</h1>
            <p className="mb-0">Welcome, Name</p>
            <span>
              you are currently Kiloka Prenium for 9.99 € / Monthly
            </span>{" "}
            <button className="btn_o">Unsubscribe</button>
            <a href="#" className="db">
              delete my account
            </a>
            <a href="#" className="db">
              Logout
            </a>
          </section>
        </div>
      </div>

      <div className="m-w p-i pb-0  ">
        <h2>Choose your plan</h2>
        <div>
          <span>Monthly</span>
          <span className="font-bold"> 9.99 €</span>
          <button className="blue_p">Select</button>
        </div>
      </div>

      <div className="m-w p-i pb-0  ">
        <div className="_kilokapr mt-32 mb-32 ">
          <div className="brp">
            {" "}
            <h2>Why upgrade to Premium?</h2>
            <h3 className="fw300 fs18">
              Take advantage of all the categories.
            </h3>
            <h3 className="fw300 fs18">
              Take advantage of personalized support.
            </h3>
            <h3 className="fw300 fs18">
              Take full advantage of sports programs.
            </h3>
            <h3 className="fw300 fs18">No advertising.</h3>
          </div>

          <div>
            {" "}
            <h2>FAQ</h2>
            <h3 className="fw300 fs18 font-bold">
              Comment annuler mon abonnement ?
            </h3>
            <p className="fs14">
              Vous pouvez annuler votre abonnement à tout moment depuis votre
              compte.
            </p>
            <h3 className="fw300 fs18 font-bold">
              Quand mon abonnement sera-t-il débité ?
            </h3>
            <p className="fs14">
              À partir de la date de souscription, le montant de l'abonnement
              sera débité chaque mois, sauf en cas d'annulation. Vous pouvez
              modifier la date avec nous si nécessaire.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  </Background>
)

export default UserPage
