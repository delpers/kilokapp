import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    dessert: contentfulCookingDesserts(slug: { eq: $slug }) {
      title
      slug
      childContentfulCookingDessertsDescriptionTextNode {
        description
      }
      picture: childContentfulCookingDessertsFeaturedImageJsonNode {
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
  background: #F7F7F7;
  header {
    background: white !important;
    position: relative !important;

  }
  .cl {
    color: white !important;
  }
 
`

const DishesRecipes = props => {
  return (
    <Background>
      <Layout>
        <SEO title={props.data.dessert.title} />

        <div className="w-screen " style={{
                        backgroundImage:
                          "url(" +
                          props.data.dessert.picture
                            .secure_url +
                          ")",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "0",
                      }}>
          <div className="mask-thumb-cat p-50-0">
          <div className="max-width padding-initial padding-bottom-none padding-top-none " >

              <h1>{props.data.dessert.title}</h1>
              <p className="mb-0">
                {" "}
                {
                  props.data.dessert
                    .childContentfulCookingDessertsDescriptionTextNode
                    .description
                }
              </p>


          </div>
        </div>   </div>
        <div>
          <div className="mb-32">
            <div className="recipesGr max-width padding-initial ">
                  {props.data.dessert.recipesRecettes != null ? (
                    props.data.dessert.recipesRecettes.map((edge, i) => {
                      return (
                  <div className="mb-20  bg-w shadow-sm br-4" key={i}>
                    
<img
                className="featured"
                src={edge.childContentfulRecipesFeaturedImageJsonNode.secure_url}
                alt={edge.title}
              />

                    <div className="mt-10 p-15 fs-18 padding-top-none">
                      <Link
                        className="i-link fs-18 b-b-g margin-right-qz font-bold mb-15 nowrap"
                        to={`/recette/${edge.slug}/`}
                      >
                        {edge.title}
                      </Link>

                      <div>
                        <div className="t-d float-right mb-15">
                          <span className="font-size-14 bg-g">
                            {" "}
                            <i className="fas fa-check-circle"></i> {edge.time} min(s){" "}
                          </span>
                        </div>
                        <div className="bg-w-c pl-0">
                          <span className="font-size-14 text-gray ">
                            {" "}
                            <i className="far fa-user mr-5"></i>{" "}
                            {edge.numberOfPersons}{" "}
                          </span>
                        </div>
                      </div>

                      <div className="b-solid-top">
                        <div className="padding-top-qz ">
                          <i className="fas fa-file-medical-alt c-g margin-right-qz"></i>
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
                )})) : (null)
              }
            </div>
          </div>
        </div>
      </Layout>
    </Background>
  )
}

export default DishesRecipes
