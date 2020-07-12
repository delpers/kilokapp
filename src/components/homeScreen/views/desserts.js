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
        <div className="max-width padding-initial padding-bottom-none  ">
          <div className="mb-100">
            <h3 className="mw728 margin-bottom-0fs-24 pb-4 title-m title-ble">{data.home.title_desserts}</h3>
            <span className="pl text-gray mw728 ">
              {data.home.description_desserts}
            </span>
          </div>
          <div className="card-des">
            {
              data.dessert.edges.length>0 ? (
                data.dessert.edges.map((edge,i) => {
                  return (
                    <div className="additions-card__container nowrap" key={i}>
                   <div className="df">



<img class="featuredSup" src={edge.node.image.secure_url} alt={edge.node.title} />


</div>
                      <div className="addiction-card__text nowrap">
                     
                      <Link
                              className="i-link font-size-16 b-b-g font-bold c-t nowrap"
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
              )
            }
          </div>
        </div>
      )}
    />
  )
}

