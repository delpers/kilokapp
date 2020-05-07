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
        <div className="m-w p-i pb-0 bg-w mt-32 ">
          <div>
            <h3 className="mb-0 fs-36 pb-4">{data.home.title_breakfasts}</h3>
            <span className="fs-18 text-gray">
              {data.home.description_breakfasts}
            </span>
          </div>
          <div className="sr-cards">
            {data.breakfast.edges.map(edge => {
              return (
                <div className="mr-32 mr-32 shadow-sm" key={edge.node.id}>
                  <div
                    className="media shadow-sm"
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
                          to={`/breakfast/recettes/${edge.node.slug}/`}
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
