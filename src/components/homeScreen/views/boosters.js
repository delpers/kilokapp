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
        <div className="m-w p-i pb-0 bg-w ">
          <div className="">
            <h3 className="mb-0 fs-36 pb-4">{data.home.title_boosters}</h3>
            <span className="fs-18 text-gray">
              {data.home.description_boosters}
            </span>
          </div>
          <div className="sr-cards">
            {data.booster.edges.map(edge => {
              return (
                <div className="" key={edge.node.id}>
                  <div
                    className="media"
                    style={{
                      backgroundImage:
                        "url(" + edge.node.picture.secure_url + ")",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      height: "190px",
                      width: "300px",
                      borderRadius: "0px",
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
            })}
          </div>
        </div>
      )}
    />
  )
}
