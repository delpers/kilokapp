import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

export default function Desserts() {
  return (
    <StaticQuery
      query={graphql`
        query {
          dessert: allContentfulCookingDesserts {
            edges {
              node {
                title
                slug
                image: childContentfulCookingDessertsFeaturedImageJsonNode {
                  secure_url
                }
              }
            }
          }
          home: contentfulHomePage {
            title_desserts
            description_desserts
          }
        }
      `}
      render={data => (
        <div className="m-w p-i category">
        <div className="group-title">
            <h3 className="title-category">{data.home.title_desserts}</h3>
            <span className="">{data.home.description_desserts}</span>
          </div>
          <div className="grid-category">
            {data.dessert.edges.length > 0 ? (
              data.dessert.edges.map((edge, i) => {
                return (
                  <div id="breakfast" className="background-white shadow r6" key={i}>
                          <img
                            class="image-category"
                            src={edge.node.image.secure_url}
                            alt={edge.node.title}
                          />
                          <Link
                            className="bold size-card db"
                            to={`/desserts/recettes/${edge.node.slug}/`}
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
