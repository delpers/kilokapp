import React, { useContext } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import UserContext from "../../UserContext"

function Title(props) {
  return <h1 className="title-category bold">Éléments nutritifs</h1>
}

export default function Product() {
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
        }
      `}
      render={data => {
        if (premium)
          return (
            <div className="m-w p-i category">
              <div className="group-title">
<Title />              </div>

              <div className="grid-nutriments">
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
                            height: "130px",
                            width: "205px",
                            borderRadius: "10px",
                          }}
                        >
                          <span className="">
                            <span className="title-booster">
                              <Link
                                className="title-booster"
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
