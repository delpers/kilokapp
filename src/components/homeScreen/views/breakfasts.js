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
            <div className="max-width padding-initial padding-bottom-none margin-top-sq">
              <div className="mb-100">
                <h3 className="mw728 margin-bottom-0fs-24 pb-4 title-m title-ble">
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
                      <div id="bloc" className="additions-card__container nowrap" key={i}>
                                      <div className="df">



<img class="featuredSup" src={edge.node.image.secure_url} alt={edge.node.title} />


</div>
                        <div className="addiction-card__text mt-0 nowrap">
                          <Link
                            className="i-link font-size-16 b-b-g font-bold c-t nowrap"
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
