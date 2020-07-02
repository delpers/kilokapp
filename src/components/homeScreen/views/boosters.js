import React, { useContext } from "react"
import { StaticQuery, graphql, Link } from "gatsby"

import UserContext from "../../../components/UserContext"

export default function Boosters() {
  const { premium } = useContext(UserContext)
  return (
    <StaticQuery
      query={graphql`
        query {
          booster: allContentfulBoosters {
            edges {
              node {
                title
                slug
                picture: childContentfulBoostersImageJsonNode {
                  secure_url
                }
              }
            }
          }
          home: contentfulHomePage {
            title_boosters
            description_boosters
          }
        }
      `}
      render={data => {
        if (premium)
          return (
            <div className="m-w p-i pb-0  ">
              <div className="mb-100">
                <h4 className="mw728 mb-0 fs-24 pb-4 title-m title-ble">
                  {data.home.title_boosters}
                </h4>
                <span className="pl text-gray mw728 ">
                  {data.home.description_boosters}
                </span>
              </div>

              <div className="src-b">
                {data.booster.edges.length > 0 ? (
                  data.booster.edges.map((edge, i) => {
                    return (
                      <div className="" key={i}>
                        <div
                          className="media src-mb"
                          style={{
                            backgroundImage:
                              "url(" + edge.node.picture.secure_url + ")",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            height: "160px",
                            width: "250px",
                            borderRadius: "6px",
                          }}
                        >
                          <span className="cards-n mr-15mb">
                            <span className="mt-10-b">
                              <Link
                                className="i-link fs-16 b-b-g mr-15 font-bold c-u"
                                to={`/booster/${edge.node.slug}/`}
                              >
                                {edge.node.title}
                              </Link>
                            </span>
                          </span>
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
