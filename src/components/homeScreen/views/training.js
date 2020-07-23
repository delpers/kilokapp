import React, { useContext } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import UserContext from "../../UserContext"

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
            <div className="">
              {premium && (
                <div className="">
                  <h2 className="">{data.home.title_trainings}</h2>
                  <p className="">{data.home.description_trainings}</p>
                </div>
              )}

              <div className="">
                {data.training.edges.length > 0 ? (
                  data.training.edges.map((edge, i) => {
                    return (
                      <div className="" key={i}>
                        <img class="" src={edge.node.image.secure_url} alt="" />

                        <div className="">
                          <Link
                            className=""
                            to={`/training/${edge.node.slug}/`}
                          >
                            {edge.node.title}
                          </Link>
                          <div className="">
                            <i className=""></i>
                            {edge.node.level}
                          </div>
                          <div className="">
                            <div className="">
                              <i className=""></i> {edge.node.nWeeks}
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
