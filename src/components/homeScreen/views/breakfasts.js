import React, { useContext } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import UserContext from "../../UserContext"

export default function Breakfasts() {
  const { premium } = useContext(UserContext)
  return (
    <StaticQuery
      query={graphql`
        query {
          breakfast: allContentfulCookingBreakfasts {
            edges {
              node {
                title
                slug
                image: childContentfulCookingBreakfastsFeaturedImageJsonNode {
                  secure_url
                }
              }
            }
          }
          home: contentfulHomePage {
            title_breakfasts
            description_breakfasts
          }
        }
      `}
      render={data => {
        if (premium)
          return (
            <div className="m-w p-i category">

              <div className="group-title">
                <h3 className="title-category">{data.home.title_breakfasts} </h3>
                <span className="">{data.home.description_breakfasts}</span>
              </div>

              <div className="grid-category">
                {data.breakfast.edges.length > 0 ? (
                  data.breakfast.edges.map((edge, i) => {
                    return (
                      <div id="breakfast" className="background-white shadow r6" key={i}>
                          <img
                            class="image-category"
                            src={edge.node.image.secure_url}
                            alt={edge.node.title}
                          />
                          <Link
                            className="bold size-card db"
                            to={`/breakfast/recettes/${edge.node.slug}/`}
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
          )
      }}
    />
  )
}
