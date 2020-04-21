import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    CLE: contentfulCookingE(slug: { eq: $slug }) {
      title
      slug
      childContentfulCookingEDescriptionTextNode {
        description
      }
      recipesRecettes {
        id
        title
        time
        for
        ingredientsNumbers
        slug
        childContentfulCookingRecipeFeaturedImageJsonNode {
          secure_url
        }
      }
    }
  }
`

const eRecipes = props => {
  return (
    <Layout>
      <SEO title={props.data.CLE.title} />

      <div className="m-w p-i">
          <div id={props.data.CLE.slug}>
            <h3>{props.data.CLE.title}</h3>
            <div>
              {
                props.data.CLE.childContentfulCookingEDescriptionTextNode
                  .description
              }
            </div>
          </div>
      </div>

      <div>
        <div>
          <div className="recipesList recipesList-mobile m-w p-i">
            {props.data.CLE.recipesRecettes.map(edge => {
              return (
                <div id={edge.id} className="shadow-sm rounded mb-32">
               

<img
                className="featured"
                src={edge.childContentfulCookingRecipeFeaturedImageJsonNode.secure_url}
                alt={edge.title}
              />

                  <div>
                    <Link to={`/recette/${edge.slug}/`}>{edge.title}</Link>

                    <div>
                      <div> {edge.ingredientsNumbers}</div>

                      <div>
                        <i class="far fa-clock cClock"></i> {edge.time}
                      </div>
                    </div>
                    <div>
                      <div>
                        {edge.for.map(dataFor => (
                          <span key={dataFor.instructions}>
                            {dataFor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default eRecipes