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
            className="w-screen p-120-0"
            style={{
              backgroundImage:
                "url(" + data.contentfulHomePage.picture.secure_url + ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "380px",
              color: "initial",
              borderRadius: "0",
            }}
          >
            <div className="m-w p-i pb-0 pt-0">
              <section>
                <h1 className="w-50">{data.contentfulHomePage.titleHome}</h1>
                <p className="mb-0">
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
