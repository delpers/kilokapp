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
            className="w-screen-home"
            style={{
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "100%",
              color: "initial",
            }}
          >
            <div className="m-w p-i home-details ">
              <section className="mt-100">
                <h1 className="w-50 w50mf">{data.contentfulHomePage.titleHome}</h1>
                <p className="mb-0 mr-h-15 mw374">
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
