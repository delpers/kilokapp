import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

export default function Entry() {
  return (
    <StaticQuery
      query={graphql`
        query {
          starter: allContentfulCookingStarters {
            edges {
              node {
                title
                slug
                image: childContentfulCookingStartersFeaturedImageJsonNode {
                  secure_url
                }
              }
            }
          }
          home: contentfulHomePage {
            title_straters
            description_straters
          }
        }
      `}
      render={data => (
        <div className="">
          <div className="">
            <h3 className="">{data.home.title_straters} </h3>
            <span className="">{data.home.description_straters}</span>
          </div>
          <div className="">
            {data.starter.edges.length > 0 ? (
              data.starter.edges.map((edge, i) => {
                return (
                  <div className="" key={i}>
                    <div className="">
                      <img
                        class=""
                        src={edge.node.image.secure_url}
                        alt={edge.node.title}
                      />
                    </div>
                    <div className="">
                      <Link className="" to={`/recettes/${edge.node.slug}/`}>
                        {edge.node.title}
                      </Link>
                    </div>
                  </div>
                )
              })
            ) : (
              <div>La catégorie sera bientôt disponible</div>
            )}
          </div>
        </div>
      )}
    />
  )
}
