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
                image: childContentfulCookingDessertsFeaturedImageJsonNode {
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
        <div className="">
          <div className="">
            <h3 className="">{data.home.title_desserts}</h3>
            <span className="">{data.home.description_desserts}</span>
          </div>
          <div className="">
            {data.dessert.edges.length > 0 ? (
              data.dessert.edges.map((edge, i) => {
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
                      <Link
                        className=""
                        to={`/desserts/recettes/${edge.node.slug}/`}
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
