import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

export default function Calandar() {
  return (
    <StaticQuery
      query={graphql`
        query {
          calandar: allContentfulMonth {
            edges {
              node {
                title
                slug
              }
            }
          }
          home: contentfulHomePage {
            title_month
            description_month
          }
        }
      `}
      render={data => (
        <div className="m-w p-i pb-0  mt-64">
          <div className="">
            <h4 className="mb-0 fs-24 pb-4 title-m">{data.home.title_month}</h4>
            <span className="fs-18 text-gray dn-m">
              {data.home.description_month}
            </span>
          </div>
          <div className="calandar-cards">
            {
              data.calandar.edges.length>0 ? (
                data.calandar.edges.map((edge,i) => {
                  return (
                    <div className="" key={i}>
                        <span className="card-calandar">
                          <span className="">
                            <Link
                              className="i-link fs-16 b-b-g mr-15 font-bold cw "
                              to={`/calandar/${edge.node.slug}/`}
                            >
                              {edge.node.title}
                            </Link>
                          </span>
                        </span>
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
