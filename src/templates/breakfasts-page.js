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
        medicalNumber
        numberOfPersons
        for
        ingredientsNumbers
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



        <div class="hero"><div className="m-w p-i">
          
          
          <h1 class="hero-title bold bottom-none">{props.data.breakfast.title}</h1>
          
          </div>
          
          
          </div>

         


      
        <div>
          <div className="mb-32">
          <div className="recipes-grid m-w p-i padding-content r2">
              {props.data.breakfast.recipesRecettes != null
                ? props.data.breakfast.recipesRecettes.map((edge, i) => {
                    return (
                      <div className="border background-white margin-bottom k-grid-margin shadow r6" key={i}>
                           <img
                          className="featured-recipes r2"
                          src={edge.image.secure_url}
                          alt={edge.title}
                        />


                        <div className="padding display-grid">

                    


                          <Link
                            className="nowrap"
                            to={`/recette/${edge.slug}/`}
                          >
                            <h3 className="nowrap">{edge.title}</h3>
                          </Link>

                          <div className="block-ruby">
                            <div>
                              <span className="color-green">
                                {" "}
                                <i className="fas fa-check-circle"></i>{" "}
                                {edge.time} min(s){" "}
                              </span>
                            </div>
                            <div className="float-right">
                              <span className="">
                                {" "}
                                <i className="far fa-user mr-5"></i>{" "}
                                {edge.numberOfPersons}{" "}
                              </span>
                            </div>
                          </div>




<div className="border-bottom"></div>
<span>{edge.for}</span>




                          <div className="b-solid-top">
                            <div className="color-blue">
                              <i className="fas fa-file-medical-alt"></i> <span className="color-initial">{edge.medicalNumber}</span>
                              {edge.for != null
                                ? edge.for.map((mv, i) => {
                                    return (
                                      <span
                                        className="font-size-14 text-gray pr-15"
                                        key={i}
                                      >
                                        {mv.for}
                                      </span>
                                    )
                                  })
                                : null}
                            </div>
                          </div>
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
