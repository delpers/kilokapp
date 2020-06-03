import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

export default function Boosters() {
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
      render={data => (
        <div className="m-w p-i pb-0 pt-m-32 ">
          <div className="">
            <h4 className="mb-0 fs-24 pb-4 title-m">{data.home.title_boosters}</h4>
            <span className="fs-18 text-gray dn-m">
              {data.home.description_boosters}
            </span>
          </div>
          <div className="sr-cards">
            {
              data.booster.edges.length>0 ? (
                data.booster.edges.map((edge,i) => {
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
                        <span className="cards-n">
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
              )
            
            }
          </div>
        </div>
      )}
    />
  )
}
