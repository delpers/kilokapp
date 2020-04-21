import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    CFV: contentfulFruitsVegetables(slug: { eq: $slug }) {
      title
      slug
      category
      dataRecipes {
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


const FVegetablesRecipes = props => {
  return (
    <Layout>
      <SEO title={props.data.CFV.title} />

      <div className="m-w p-i">
        <div>

            <h1 id={props.data.CFV.slug}>{props.data.CFV.title}</h1>

            <p>{props.data.CFV.category}</p>


        </div>
      </div>

      <div>
        <div>
          <div className="recipesList recipesList-mobile m-w p-i">
            {props.data.CFV.dataRecipes.map(edge => {
              return (
                <div id={edge.id}>
            
<img
                className="featured"
                src={edge.childContentfulCookingRecipeFeaturedImageJsonNode.secure_url}
                alt={edge.title}
              />

                  <div>
                    <Link to={`/recette/${edge.slug}/`}>{edge.title}</Link>

                    <div>
                      <div> {edge.ingredientsNumbers}</div>
                      <div> {edge.time} </div>
                    </div>

                    <div>
                      <div>
                        {edge.for.map(dataFor => (
                          <div key={dataFor}>
                            {dataFor}
                          </div>
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

export default FVegetablesRecipes