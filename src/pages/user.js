import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const UserPage = () => {
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
              <div className="bgb">
                <span className="info_txt">You are currently premium</span>

                <span className="stripe_name">Kiloka Prenium</span>
                <div className="info_mth">For € 9.99 / Month</div>
                <div className="bay bg-w">
                  <button className="btnun">Unsubscribe</button>
                </div>
              </div>
              <div>
                <div className="info_mth">Your informations</div>
                <div className="info_mti">registred with: kiloka@tuta.io</div>

                <div className="info_mti">
                  <a className="cred" href="">
                    Deleted my account
                  </a>
                </div>

                <div className="dex bg-w">
                  <button className="btndex">Logout</button>
                </div>
              </div>
            </div>
          </div>




          <div className="grd_f mt-32">
            <div>
              {" "}
              <div className="bgfa">
                <span className="info_txt bggr">Premium</span>

                <span className="stripe_price pb-0">€ 9.99</span>
                <span className="month">/ Month</span>
                <div className="info_mth bg-w b-solid-b">
                  Details plan later
                </div>

                <div className="bay bg-w">
                <div className="bay bg-w">
                  <button className="btnun">Unsubscribe</button>
                </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bgfa">
                <span className="info_txt bggr ">3 mois de Kiloka Prenium</span>

                <span className="stripe_price pb-0">€ 9.99</span>
                <span className="month">/ Month</span>
                <div className="info_mth bg-w b-solid-b">
                  Details plan later
                </div>

                <div className="bay bg-w">
                  <button className="btng">Choose</button>
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
