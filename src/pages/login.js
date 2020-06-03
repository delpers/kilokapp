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

const SearchPage = () => (
  <Background>
    <Layout>
      <SEO title="Recherche" />

      <div className="w-screen p-120-0">
        <div className="m-w p-i pb-0 pt-0">
          <section>
            <h1 className="w-50">Connexion</h1>
            <p className="mb-0">
            Connectez-vous à Kiloka pour accéder à de nombreux avantages.
            </p>
          </section>
        </div>
      </div>

      <div className="m-w p-i pb-0  ">
        <h1>Welcome</h1>
        <p>Sign in for more content !</p>
      </div>
    </Layout>
  </Background>
)

export default SearchPage
