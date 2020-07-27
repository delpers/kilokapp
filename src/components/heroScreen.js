import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default function heroScreen() {
  return (
    <StaticQuery
      query={graphql`
        query {
          contentfulHomePage {
            titleHome
            descriptionHome
          }
        }
      `}
      render={data => (
          <div
            className="hero">
            <div className="m-w p-i">
              <section>
                <h1 className="hero-title">
                  {data.contentfulHomePage.titleHome} 
                </h1>
                <p className="hero-max-width-sub">
                  {data.contentfulHomePage.descriptionHome}
                </p>
              </section>
            </div>
          </div>
      )}
    />
  )
}
