import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    CLE: contentfulBooster(slug: { eq: $slug }) {
      title
      slug
      childContentfulBoosterImageJsonNode {
        secure_url
      }
      bList {
        title
        slug
        childContentfulFruitsVegetablesImageJsonNode {
          secure_url
        }
      }
    }
  }
`

const bRecipes = props => {
  return (
    <Layout>
      <SEO title={props.data.CLE.title} />

      <div className="m-w p-i">
        <div>
          <h3>Boosters</h3>
          <h3 id={props.data.CLE.slug}>{props.data.CLE.title}</h3>
        </div>
      </div>

      <div>
        <div>
          <div className="recipesList recipesList-mobile m-w p-i">
            {props.data.CLE.bList.map(edge => {
              return (
                <div className="rounded shadow-sm">
           
<img
                className="featured"
                src={edge.childContentfulFruitsVegetablesImageJsonNode.secure_url}
                alt={edge.title}
              />
                  <div>
                    <Link to={`/recettes/base/${edge.slug}/`}>
                      {edge.title}
                    </Link>

                    <div></div>
                    <div></div>
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

export default bRecipes
