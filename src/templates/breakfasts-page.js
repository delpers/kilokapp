import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    breakfast: contentfulCookingBreakfasts(slug: { eq: $slug }) {
      title
      slug
      picture: childContentfulCookingBreakfastsFeaturedImageJsonNode {
        secure_url
      }
      recipesRecettes {
        id
        title
        time
        numberOfPersons
        slug
        image: childContentfulRecipesFeaturedImageJsonNode {
          secure_url
        }
      }
    }
  }
`

const eRecipes = props => {
  return (
      <Layout>
        <SEO title={props.data.breakfast.title} />


          
          
<div className="hero none-mobile">
  <div className="m-w p-i">
<h1 class="hero-title bold bottom-none">{props.data.breakfast.title}</h1>
</div>          
</div>
          

         


      
        <div>
          <div>
          <div className="recipes-grid m-w p-i padding-content push-padding-64">
              {props.data.breakfast.recipesRecettes != null
                ? props.data.breakfast.recipesRecettes.map((edge, i) => {
                    return (
                      <div className="background-white margin-bottom k-grid-margin shadow-plus r-10" key={i}>
                           <img
                          className="featured-recipes r-10-card"
                          src={edge.image.secure_url}
                          alt={edge.title}
                        />








<Link
    className="nowrap"
    to={`/recette/${edge.slug}/`}
  >
    <h3 className="nowrap title-recipes">{edge.title}</h3>
  </Link>

                        <div className="recipes-info-grid shadow r-10 padding-recipe-details">
         

                    <div> <i className="fas fa-check-circle color-green"></i>{" "}
                                 {edge.time}'</div>

                    <div className="align-right">  <i className="far fa-user mr-5"></i>{" "}
                                {edge.numberOfPersons}{" "}</div>







                            
                        
                        </div>
                      </div>
                    )
                  })
                : null}
            </div>

            
          </div>
        </div>
      </Layout>
  )
}

export default eRecipes
