import React, { useContext } from "react"
import { StaticQuery, graphql, Link } from "gatsby"

import UserContext from "../../UserContext"
import { divide } from "lodash"

export default function Training() {
  const { premium } = useContext(UserContext)
  return (
    <StaticQuery
      query={graphql`
        query {
          training: allContentfulTraining {
            edges {
              node {
                title
                slug
                nWeeks
                level
                image: childContentfulTrainingImageJsonNode {
                  secure_url
                }
              }
            }
          }
          home: contentfulHomePage {
            title_trainings
            description_trainings
          }
        }
      `}
      render={data => {
        if (premium)
          return (
            <div className=" pe-blue p-i pb-0   prog">
              {premium && (
                <div className=" pt120 m-w p-i ">
                  <h2 className="mw728 mb-0 fs-24 pb-4 title-m title-ble">
                    {data.home.title_trainings}
                  </h2>
                  <p className="pl text-gray mw728 ">
                    {data.home.description_trainings}
                  </p>
                </div>
              )}

              <div className="recipesGr m-w p-i">
                {data.training.edges.length > 0 ? (
                  data.training.edges.map((edge, i) => {
                    return (
                      <div className="mb-20  bg-w shadow-sm br-4" key={i}>


                  <img class="featured" src={edge.node.image.secure_url} alt="Smoothie fraise et cerise" />


                        <div className=" mt-10 p-15 fs-18 pt-0pt-0">
                          <Link
                            className="i-link fs-18 b-b-g mr-15 font-bold mb-15 nowrap"
                            to={`/training/${edge.node.slug}/`}
                          >
                            {edge.node.title}
                          </Link>
                          <div className="bg-w-c pl-0 fs-16 text-gray " >
                            <i className="fas fa-heart ig mr-15"></i>
                            {edge.node.level}
                          </div>
                          <div className="b-solid-top">
                          <div className="pt-15 fs-16">
                            <i className="fas fa-calendar-week mr-15"></i>{" "}
                            {edge.node.nWeeks} semaine(s)
                          </div>
                        </div>
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
