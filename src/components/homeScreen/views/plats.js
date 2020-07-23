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
                image: childContentfulCookingPlatsFeaturedImageJsonNode {
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
        <div className="">
          <div className="">
            <h3 className="">{data.home.title_plats} </h3>
            <span className="">{data.home.description_plats}</span>
          </div>
          <div className="">
            {data.plat.edges.length > 0 ? (
              data.plat.edges.map((edge, i) => {
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
                        to={`/plats/recettes/${edge.node.slug}/`}
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
