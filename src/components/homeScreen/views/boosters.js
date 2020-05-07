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
            <h3 className="mb-0 fs-48 pb-4">{data.home.title_boosters}</h3>
            <span className="fs-18 text-gray">
              {data.home.description_boosters}
            </span>
          </div>
          <div className="sr-cards">
            {data.booster.edges.map(edge => {
              return (
                <div className="" key={edge.node.id}>
                  <div className="">
                    <span className="mask-thumb-h rounded">
                      <span className="mt-10-b">
                        <Link
                          className="i-link fs-16 b-b-g mr-15 font-bold c-t"
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
