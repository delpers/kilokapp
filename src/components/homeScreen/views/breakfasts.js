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
            <div className="m-w p-i pb-0 mt-64 ">
              <div className="mb-100">
                <h3 className="mw728 mb-0 fs-24 pb-4 title-m title-ble">
                  {data.home.title_breakfasts}{" "}
                </h3>
                <span className="pl text-gray mw728">
                  {data.home.description_breakfasts}
                </span>
              </div>

              <div className="card-des">
                {data.breakfast.edges.length > 0 ? (
                  data.breakfast.edges.map((edge, i) => {
                    return (
                      <div className="additions-card__container" key={i}>
                      
                        <div className="addiction-card__text mt-0">
                          <Link
                            className="i-link fs-16 b-b-g font-bold c-t"
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
