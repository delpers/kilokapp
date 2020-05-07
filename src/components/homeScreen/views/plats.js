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
        <div className="m-w p-i pb-0 bg-w ">
          <div>
            <h3 className="mb-0 fs-36 pb-4">{data.home.title_plats}</h3>
            <span className="fs-18 text-gray">
              {data.home.description_plats}
            </span>
          </div>
          <div className="sr-cards">
            {data.plat.edges.map(edge => {
              return (
                <div className="" key={edge.node.id}>
                  <div
                    className=""
                    style={{
                      backgroundImage:
                        "url(" + edge.node.picture.secure_url + ")",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      height: "250px",
                      width: "400px",
                      borderRadius: "0",
                    }}
                  >
                    <span className="mask-thumb-h">
                      <span className="mt-10-b">
                        <Link
                          className="i-link fs-16 b-b-g mr-15 font-bold c-t"
                          to={`/plats/recettes/${edge.node.slug}/`}
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
