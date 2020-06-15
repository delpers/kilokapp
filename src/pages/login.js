import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const LoginPage = () => {
  return (
    <Layout>
      <SEO title="Connexion" />
      <div>
        <div className="m-w p-i m-w ">
          <h1 className="fs-48   mw728">Connexion</h1>
        </div>

        <div className="m-w p-i pb-0 bg-w link justify mt-32 mb-32 init">
          Login form
        </div>
      </div>
    </Layout>
  )
}

export default LoginPage
