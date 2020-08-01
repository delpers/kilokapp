import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default function heroScreen() {
  return (
    <StaticQuery
      query={graphql`
        query {
          contentfulHomePage {
            titleHome
          }
        }
      `}
      render={data => (




          <div
            className="hero">
            <div className="m-w p-i">
              <section>
                <h1 className="hero-title bold">
                  {data.contentfulHomePage.titleHome} 
                </h1>
    
              </section>
            </div>
          </div>
      )}
    />
  )
}
