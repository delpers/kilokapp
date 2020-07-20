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
        <div className="max-width padding-initial padding-bottom-none  ">
          <div className="margin-bottom-card">
            <h3 className="mw728 margin-bottom-0fs-24 pb-4 title-m title-ble">
              {data.home.title_straters}{" "}
            </h3>
            <span className="pl text-gray mw728">
              {data.home.description_straters}
            </span>
          </div>
          <div className="card-home">
            {data.starter.edges.length > 0 ? (
              data.starter.edges.map((edge, i) => {
                return (
                  <div className="card-container nowrap" key={i}>
                    <div className="display-flex">
                      <img
                        class="featured-card"
                        src={edge.node.image.secure_url}
                        alt={edge.node.title}
                      />
                    </div>
                    <div className="card-text nowrap">
                      <Link
                        className="i-link font-size-16 b-b-g font-bold c-t nowrap"
                        to={`/recettes/${edge.node.slug}/`}
                      >
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
