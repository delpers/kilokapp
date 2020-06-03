import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    starter: contentfulCookingStarters(slug: { eq: $slug }) {
      title
      slug
      childContentfulCookingStartersDescriptionTextNode {
        description
      }
      picture: childContentfulCookingStartersFeaturedImageJsonNode {
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
  background: #f8f9fb;
  header {
    background: white !important;
  }
  .cl {
    color: white !important;
  }
 
`
const eRecipes = props => {
  return (
    <Background>
      <Layout>
        <SEO title={props.data.starter.title} />

        <div className="w-screen " style={{
                        backgroundImage:
                          "url(" +
                          props.data.starter.picture
                            .secure_url +
                          ")",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "0",
                      }}>
          <div className="mask-thumb-cat p-50-0">
          <div className="m-w p-i pb-0 pt-0 cl" >

              <h1>{props.data.starter.title}</h1>
              <p className="mb-0">
                {" "}
                {
                  props.data.starter
                    .childContentfulCookingStartersDescriptionTextNode
                    .description
                }
              </p>


          </div>
        </div>   </div>
        <div>
          <div>
            <div className="rl rl-mobile m-w p-i mt-32 ">
                  {props.data.starter.recipesRecettes != null ? (
                    props.data.starter.recipesRecettes.map((edge, i) => {
                      return (
                  <div className="mb-20 bg-fc border shadow-sm br-4" key={i}>
                    <div
                      className="mediaLR"
                      style={{
                        backgroundImage:
                          "url(" +
                          edge.childContentfulRecipesFeaturedImageJsonNode
                            .secure_url +
                          ")",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                         height: "230px",
                        width: "374px",
                        borderRadius: "4px 4px 0px 0px",
                      }}
                    ></div>

                    <div className="mt-10 p-15 fs-18 bg-w">
                      <Link
                        className="i-link fs-18 b-b-g mr-15 font-bold mb-15 nowrap"
                        to={`/recette/${edge.slug}/`}
                      >
                        {edge.title}
                      </Link>

                      <div>
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
                          {edge.for.map(dataFor => (
                            <span
                              className="fs-14 text-gray pr-15"
                              key={dataFor.instructions}
                            >
                              {dataFor}
                            </span>
                          ))}
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
