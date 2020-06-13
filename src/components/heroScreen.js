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
            picture: childContentfulHomePageHeroImageJsonNode {
              secure_url
            }
          }
        }
      `}
      render={data => (
        <div>
          <div
            className="w-screen-home"
            style={{
              backgroundImage:
                "url(" + data.contentfulHomePage.picture.secure_url + ")",
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "100%",
              color: "initial",
              borderRadius: "0",
            }}
          >
            <div className="m-w p-i home-details">
              <section>
                <h1 className="w-50 w50mf cw">{data.contentfulHomePage.titleHome}</h1>
                <p className="mb-0 mr-h-15 mw374 cw">
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
