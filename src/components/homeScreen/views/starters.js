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
   
          <div className="grid-category">
            {data.starter.edges.length > 0 ? (
              data.starter.edges.map((edge, i) => {
                return (
                  <div id="breakfast" className="background-white shadow r6 border" key={i}>
                          <img
                            class="image-category"
                            src="https://images.pexels.com/photos/3747433/pexels-photo-3747433.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            alt={edge.node.title}
                          />
                          <Link
                            className="bold size-card db"
                            to={`/recettes/${edge.node.slug}/`}
                          >
                           Clothing frame
                          </Link>
                          <p className="description">decorative frame, clothing of different colors.</p>
                          <span className="price">140 €</span>

                          <span className="">View product <i class="fas fa-external-link-alt"></i></span>

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
