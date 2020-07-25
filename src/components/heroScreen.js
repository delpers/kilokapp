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
            image: childContentfulHomePageHeroImageJsonNode {
              secure_url
            }
          }
        }
      `}
      render={data => (
          <div
            className="hero"
            style={{
              
              backgroundPosition: "center",
              backgroundImage: `url(${data.contentfulHomePage.image.secure_url})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100%",
              color: "initial",
            }}
          >
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
