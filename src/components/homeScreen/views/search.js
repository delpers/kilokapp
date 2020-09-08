import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

export default function Plats() {
  return (
    <StaticQuery
      query={graphql`
        query {
          plat: allContentfulCookingPlats {
            edges {
              node {
                title
                slug
                image: childContentfulCookingPlatsFeaturedImageJsonNode {
                  secure_url
                }
              }
            }
          }
          home: contentfulHomePage {
            title_plats
          }
        }
      `}
      render={data => (
        <div className="m-w p-i category">
        <div className="group-title">
            <h3 className="title-category">{data.home.title_plats} </h3>
          </div>
          <div className="grid-category">
            {data.plat.edges.length > 0 ? (
              data.plat.edges.map((edge, i) => {
                return (
                  <div id="breakfast" className="background-white shadow r6" key={i}>
                  <img
                    class="image-category"
                    src={edge.node.image.secure_url}
                    alt={edge.node.title}
                  />
                  <Link
                    className="bold size-card db"
                    to={`/plats/recettes/${edge.node.slug}/`}
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
