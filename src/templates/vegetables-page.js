import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "@emotion/styled"

export const query = graphql`
  query($slug: String!) {
    vegetable: contentfulFruitsVegetables(slug: { eq: $slug }) {
      title
      slug
      category
      picture: childContentfulFruitsVegetablesImageJsonNode {
        secure_url
      }
      dataRecipes {
        id
        title
        time
        numberOfPersons
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
    background: white !important;
    border-bottom: 1px solid #ededed;
  }
`
const FVegetablesRecipes = props => {
  return (
    <Background>
      <Layout>
        <SEO title={props.data.vegetable.title} />

        <div
          className="w-screen "
          style={{
            backgroundImage:
              "url(" + props.data.vegetable.picture.secure_url + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: "0",
          }}
        >
          <div className="mask-thumb-cat padding-50-0">
            <div className="max-width padding-initial padding-bottom-none padding-top-none ">
              <h1>{props.data.vegetable.title}</h1>
            </div>
          </div>{" "}
        </div>
        <div>
          <div className="mb-32">
            <div className="initial-grid max-width padding-initial ">
              {props.data.vegetable.dataRecipes != null
                ? props.data.vegetable.dataRecipes.map((edge, i) => {
                    return (
                      <div className="mb-20  bg-w shadow-sm br-4" key={i}>
                        <img
                          className="featured"
                          src={
                            edge.childContentfulRecipesFeaturedImageJsonNode
                              .secure_url
                          }
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
                                <i className="fas fa-check-circle"></i>{" "}
                                {edge.time} min(s){" "}
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

                         
                        </div>
                      </div>
                    )
                  })
                : null}
            </div>
          </div>
        </div>
      </Layout>{" "}
    </Background>
  )
}

export default FVegetablesRecipes
