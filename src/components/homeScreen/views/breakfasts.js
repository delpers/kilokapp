import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

export default function Breakfasts() {
  return (
    <StaticQuery
      query={graphql`
        query {
          breakfast: allContentfulCookingBreakfasts {
            edges {
              node {
                title
                slug
                picture: childContentfulCookingBreakfastsFeaturedImageJsonNode {
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
      render={data => (
        <div className="m-w p-i pb-0 mt-64 pt-m-32">
          <div>
            <h3 className="mb-0 fs-24 pb-4 title-m">{data.home.title_breakfasts} </h3>
            <span className="fs-18 text-gray dn-m">
              {data.home.description_breakfasts}
            </span>
          </div>
          <div className="sr-cards">
            {
              data.breakfast.edges.length>0 ? (
                data.breakfast.edges.map((edge,i) => {
                  return (
                    <div className="" key={i}>
                      <div
                        className="media"
                        style={{
                          backgroundImage:
                            "url(" + edge.node.picture.secure_url + ")",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          height: "220px",
                          width: "340px",
                          borderRadius: "2px",
                        }}
                      >
                        <span className="mask-thumb-h">
                          <span className="mt-10-b">
                            <Link
                              className="i-link fs-16 b-b-g mr-15 font-bold c-t"
                              to={`/breakfast/recettes/${edge.node.slug}/`}
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
              )
            }
          </div>
        </div>
      )}
    />
  )
}
