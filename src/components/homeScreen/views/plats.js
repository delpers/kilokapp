import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

export default function Plats() {
  return (
    <StaticQuery
      query={graphql`
        query {
          plat: allContentfulCookingPlats {
            edges {
              node {
                title
                slug
                picture: childContentfulCookingPlatsFeaturedImageJsonNode {
                  secure_url
                }
              }
            }
          }
          home: contentfulHomePage {
            title_plats
            description_plats
          }
        }
      `}
      render={data => (
        <div className="m-w p-i pb-0  ">
          <div className="mb-100">
            <h3 className="mw728 mb-0 fs-24 pb-4 title-m title-ble">{data.home.title_plats} </h3>
            <span className="pl text-gray mw728">
              {data.home.description_plats}
            </span>
          </div>
          <div className="card-des">
            {
              data.plat.edges.length>0 ? (
                data.plat.edges.map((edge,i) => {
                  return (
                    <div className="additions-card__container" key={i}>
                      <div
                        className="media"
                        style={{
                          backgroundImage:
                            "url(" + edge.node.picture.secure_url + ")",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          height: "75px",
                          width: "75px",
                        }}
                      />
                      <div className="addiction-card__text">
                      <Link
                              className="i-link fs-16 b-b-g mr-15 font-bold c-t"
                              to={`/plats/recettes/${edge.node.slug}/`}
                            >
                              {edge.node.title}
                            </Link>

                            </div>


                    </div>
                  )
                })
              ) : (
                <div>La catégorie sera bientôt disponible</div>
              )
            }
          </div>
        </div>
      )}
    />
  )
}
