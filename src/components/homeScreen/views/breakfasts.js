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
            <div className="">
              <div className="">
                <h3 className="">{data.home.title_breakfasts} </h3>
                <span className="">{data.home.description_breakfasts}</span>
              </div>

              <div className="">
                {data.breakfast.edges.length > 0 ? (
                  data.breakfast.edges.map((edge, i) => {
                    return (
                      <div id="breakfast" className="" key={i}>
                        <div className="">
                          <img
                            class=""
                            src={edge.node.image.secure_url}
                            alt={edge.node.title}
                          />
                        </div>
                        <div className="">
                          <Link
                            className=""
                            to={`/breakfast/recettes/${edge.node.slug}/`}
                          >
                            {edge.node.title}
                          </Link>
                        </div>
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
