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
        <div className="m-w p-i pb-0 bg-w ">
          <div>
            <h3 className="mb-0 fs-32 pb-4">{data.home.title_desserts}</h3>
            <span className="fs-18 text-gray">
              {data.home.description_desserts}
            </span>
          </div>
          <div className="sr-cards">
            {data.dessert.edges.map(edge => {
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
                      height: "170px",
                      width: "270px",
                      borderRadius: "0",
                    }}
                  >
                    <span className="mask-thumb-h">
                      <span className="mt-10-b">
                        <Link
                          className="i-link fs-16 b-b-g mr-15 font-bold c-t"
                          to={`/desserts/recettes/${edge.node.slug}/`}
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
