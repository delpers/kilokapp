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
        <div>
          <div
            className="hero"
            style={{
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100%",
              color: "initial",
            }}
          >
            <div className="max-width padding-initial hero-block">
              <section>
                <h1 className="max-width-half hero-title">
                  {data.contentfulHomePage.titleHome}
                </h1>
                <p className="margin-bottom-none mobile-margin-right-15 hero-max-width-sub font-size-24">
                  {data.contentfulHomePage.descriptionHome}
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    />
  )
}
