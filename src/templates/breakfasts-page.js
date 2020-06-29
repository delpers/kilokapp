import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    breakfast: contentfulCookingBreakfasts(slug: { eq: $slug }) {
      title
      slug
      childContentfulCookingBreakfastsDescriptionTextNode {
        description
      }
      picture: childContentfulCookingBreakfastsFeaturedImageJsonNode {
        secure_url
      }
      recipesRecettes {
        id
        title
        time
        numberOfPersons
        for
        ingredientsNumbers
        slug
        childContentfulRecipesFeaturedImageJsonNode {
          secure_url
        }
      }
    }
  }
`


const Background = styled.div`
  background: #ffffff;
  header {
    position: relative !important;
    background: white;
    border-bottom: 1px solid #ededed;
  }
`

const eRecipes = props => {
  return (
    <Background>
      <Layout>
        <SEO title={props.data.breakfast.title} />

       
          <div className="mask-thumb-cat p-50-0">
          <div className="m-w p-i pb-0 pt-0 cl " >


              <h1>{props.data.breakfast.title}</h1>
              <p className="mb-0">
                {" "}
                {
                  props.data.breakfast
                    .childContentfulCookingBreakfastsDescriptionTextNode
                    .description
                }
              </p>


          </div>
        </div>  
        <div>
          <div className="mb-32">
            <div className="blogPost pi0-mob blogPost-mobile m-w p-i pi0-mob ">
                  {props.data.breakfast.recipesRecettes != null ? (
                    props.data.breakfast.recipesRecettes.map((edge, i) => {
                      return (
                  <div id={edge.id} className="mb-20 mb-20_mb0 bg-w  border shadow-sm br-4 " key={i}>
               


<img
                className="featured"
                src={edge.childContentfulRecipesFeaturedImageJsonNode.secure_url}
                alt={edge.title}
              />


                    <div className="mt-10 p-15 fs-18 pt-0 ">
                      <Link
                        className="i-link fs-18 b-b-g mr-15 font-bold mb-15 nowrap"
                        to={`/recette/${edge.slug}/`}
                      >
                        {edge.title}
                      </Link>

                      <div >
                        <div className="t-d fl-r mb-15">
                          <span className="fs-14 bg-g">
                            {" "}
                            <i className="fas fa-check-circle"></i> {edge.time} min(s){" "}
                          </span>
                        </div>
                        <div className="bg-w-c pl-0">
                          <span className="fs-14 text-gray ">
                            {" "}
                            <i className="far fa-user mr-5"></i>{" "}
                            {edge.numberOfPersons}{" "}
                          </span>
                        </div>
                      </div>

                      <div className="b-solid-top">
                        <div className="pt-15 ">
                          <i className="fas fa-file-medical-alt c-g mr-15"></i>

                          {edge.for != null
                  ? edge.for.map((mv, i) => {
                      return (


                            <span
                              className="fs-14 text-gray pr-15"
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
                 )})) : (null)
                }
            </div>
          </div>
        </div>
      </Layout>
    </Background>
  )
}

export default eRecipes
