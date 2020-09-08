import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    plat: contentfulCookingPlats(slug: { eq: $slug }) {
      title
      slug
      picture: childContentfulCookingPlatsFeaturedImageJsonNode {
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
const Background = styled.div`
  background: #ffffff;
  header {
    background: white !important;
    position: relative !important;
  }
  .cl {
    color: white !important;
  }
`
const pRecipes = props => {
  return (
    <Background>
      <Layout>
        <SEO title={props.data.plat.title} />
    
          
        <div className="right-hero">
<h1 class="hero-title-recipes bottom-none">{props.data.plat.title}</h1>
</div>          
          




        <div>
          <div className="mb-32">
            <div className="initial-grid max-width padding-initial ">
              {props.data.plat.recipesRecettes != null
                ? props.data.plat.recipesRecettes.map((edge, i) => {
                    return (
                      <div className="mb-20  bg-w shadow-sm br-4" key={i}>
                        <img
                          className="featured"
                          src={edge.image.secure_url}
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
                                {edge.time}{" "}
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
      </Layout>
    </Background>
  )
}

export default pRecipes
