import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

export default function Desserts() {
  return (
    <StaticQuery
      query={graphql`
        query {
          dessert: allContentfulCookingDesserts {
            edges {
              node {
                title
                slug
                picture: childContentfulCookingDessertsFeaturedImageJsonNode {
                  secure_url
                }
              }
            }
          }
          home: contentfulHomePage {
            title_desserts
            description_desserts
          }
        }
      `}
      render={data => (
        <div className="m-w p-i pb-0 pt-m-32 ">
          <div className="mb-100">
            <h3 className="mw728 mb-0 fs-24 pb-4 title-m title-blem">{data.home.title_desserts}</h3>
            <span className="pl text-gray mw728 ">
              {data.home.description_desserts}
            </span>
          </div>
          <div className="card-des">
            {
              data.dessert.edges.length>0 ? (
                data.dessert.edges.map((edge,i) => {
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
                              to={`/desserts/recettes/${edge.node.slug}/`}
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

