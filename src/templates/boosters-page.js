import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    booster: contentfulBoosters(slug: { eq: $slug }) {
      title
      slug
      backgroundColor
      picture: childContentfulBoostersImageJsonNode {
        secure_url
      }
      bList {
        title
        slug
        stockage
        calories
        image: childContentfulFruitsVegetablesImageJsonNode {
          secure_url
        }
      }
    }
    home: contentfulHomePage {
      description_boosters
    }
  }
`

const Background = styled.div`
  background: #f8f9fb;
  header {
    position: absolute !important;
    border: 0 !important;
  }
`

const BoostersRecipes = props => {
  return (
    <Background>
      <Layout>
        <SEO title={props.data.booster.title} />

        <div
          className="w-screen p-120-0 perfect-bg"
          style={{
            backgroundImage:
              "url(" + props.data.booster.picture.secure_url + ")",
            backgroundSize: "70%",
            backgroundColor: props.data.booster.backgroundColor,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            color: "initial",
          }}
        >
          <div className="m-wb pb-0 pt-0">
            <section className="sub-header">
              <h1 className="mb-0">{props.data.booster.title}</h1>

            </section>
          </div>
        </div>

        <div>
          <div>
            <div className="rl rl-mobile m-w p-i  ">
              {props.data.booster.bList != null ? (
                props.data.booster.bList.map((edge, i) => {
                  return (
                    (
                      <div className="   mb-32" key={i}>
                        <div className="bg-w p-15 border ">
                        <div
          className="w-screen p-80-0 perfect-bg pbg-m"
          style={{
            backgroundImage:
              "url(" + edge.image.secure_url + ")",
              backgroundSize: "50%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              margin: "0 10%",
          }}
        > </div> 
                          <Link
                            className="i-link fs-16 b-b-g mr-15 font-bold mb-0 nowrap p-15 pb-0"
                            to={`/recettes/base/${edge.slug}/`}
                          >
                            {edge.title}
                          </Link>
                          <div className=" p-15 fs-14 pb-0">
                            <span className="">
                              <i className="fas fa-burn mr-5"></i>{" "}
                              {edge.calories} <strong>C</strong> · 100 gr.
                            </span>
                          </div>
                          <div className=" p-15 fs-14">
                            <span className="color-black">
                              <i className="fas fa-check-circle mr-5"></i>{" "}
                              {edge.stockage}
                            </span>
                          </div>

                       
                        </div>
                      </div>
                    ) || null
                  )
                })
              ) : (
                <div>
                  <p>Ce sera bientôt le cas.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </Background>
  )
}

export default BoostersRecipes
