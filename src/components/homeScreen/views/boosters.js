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
            <div className="">
              <div className="">
                <h4 className="">{data.home.title_boosters}</h4>
                <span className="">{data.home.description_boosters}</span>
              </div>

              <div className="">
                {data.booster.edges.length > 0 ? (
                  data.booster.edges.map((edge, i) => {
                    return (
                      <div className="" key={i}>
                        <div
                          className=""
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
                          <span className="">
                            <span className="">
                              <Link
                                className=""
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
