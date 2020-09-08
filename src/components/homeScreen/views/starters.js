import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

export default function Entry() {
  return (
    <StaticQuery
      query={graphql`
        query {
          starter: allContentfulCookingStarters {
            edges {
              node {
                title
                slug
                image: childContentfulCookingStartersFeaturedImageJsonNode {
                  secure_url
                }
              }
            }
          }
          home: contentfulHomePage {
            title_straters
          }
        }
      `}
      render={data => (
        <div className="m-w p-i category">
        <div className="group-title">
            <h3 className="title-category">{data.home.title_straters} </h3>
          </div>
          <div className="grid-category">
            {data.starter.edges.length > 0 ? (
              data.starter.edges.map((edge, i) => {
                return (
                  <div id="breakfast" className="background-white shadow r6" key={i}>
                          <img
                            class="image-category"
                            src={edge.node.image.secure_url}
                            alt={edge.node.title}
                          />
                          <Link
                            className="bold size-card db"
                            to={`/recettes/${edge.node.slug}/`}
                          >
                            {edge.node.title}
                          </Link>
                        </div>
                )
              })
            ) : (
              <div>La catégorie sera bientôt disponible</div>
            )}
          </div>
        </div>
      )}
    />
  )
}
