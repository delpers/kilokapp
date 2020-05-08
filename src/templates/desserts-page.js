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
`

const DishesRecipes = props => {
  return (
    <Background>
      <Layout>
        <SEO title={props.data.dessert.title} />

        <div className="w-screen p-120-0">
          <div className="m-w p-i pb-0 pt-0">
            <section>
              <h1>{props.data.dessert.title}</h1>
              <p className="mb-0">
                {" "}
                {
                  props.data.dessert
                    .childContentfulCookingDessertsDescriptionTextNode
                    .description
                }
              </p>
            </section>
          </div>
        </div>

        <div>
          <div>
            <div className="rl rl-mobile m-w p-i ">
              {props.data.dessert.recipesRecettes.map(edge => {
                return (
                  <div id={edge.id} className="mb-20 border bg-w">
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
                        borderRadius: "0",
                      }}
                    ></div>

                    <div className="mt-10 p-15 fs-16 ">
                      <Link
                        className="i-link fs-16 b-b-g mr-15 font-bold mb-15 nowrap"
                        to={`/desserts/recette/${edge.slug}/`}
                      >
                        {edge.title}
                      </Link>

                      <div>
                        <div className="t-d fl-r mb-15">
                          <span className="fs-14 bg-g">
                            {" "}
                            <i className="fas fa-check-circle"></i> {edge.time}{" "}
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
                )
              })}
            </div>
          </div>
        </div>
      </Layout>
    </Background>
  )
}

export default DishesRecipes
