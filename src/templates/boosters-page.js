import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from '@emotion/styled'

const Hero = styled.div`
  header {
    position: absolute;
    z-index: 1000;
width: 100%;
background: transparent;
padding-top: 32px;
  }
  body {
    margin-top: 0 !important;
  }
`

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


const BoostersRecipes = props => {
  return (
    <Hero>
      <Layout>
        <SEO title={props.data.booster.title} />
<div style={{backgroundColor: props.data.booster.backgroundColor}}> 


        <figure
          className="cover-category background"
          style={{
            backgroundImage:
              "url(" + props.data.booster.picture.secure_url + ")",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            borderRadius: "0",
            height: "400px",
          }}
        >
          <div>
            <div className="hero-name">
              <h1 className="hero-category">{props.data.booster.title}</h1>
            
            </div>
          </div>
        </figure>
        </div>

        <div>
          <div>
            <div className="rl rl-mobile max-width padding-initial  ">
              {props.data.booster.bList != null ? (
                props.data.booster.bList.map((edge, i) => {
                  return (
                    (
                      <div className="   mb-32" key={i}>
                        <div className="bg-w p-15 shadow-sm br6 dfmb">
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
                          >
                            {" "}
                          </div>

                          <div>
                            <Link
                              className="i-link font-size-16 b-b-g margin-right-qz font-bold margin-bottom-0nowrap p-15 padding-bottom-none"
                              to={`/recettes/base/${edge.slug}/`}
                            >
                              {edge.title}
                            </Link>
                            <div className=" p-15 font-size-14 padding-bottom-none">
                              <span className="">
                                <i className="fas fa-burn mr-5"></i>{" "}
                                {edge.calories} <strong>C</strong> · 100 gr.
                              </span>
                            </div>
                            <div className=" p-15 font-size-14">
                              <span className="color-black">
                                <i className="fas fa-check-circle mr-5"></i>{" "}
                                {edge.stockage}
                              </span>
                            </div>
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
      </Hero>
  )
}

export default BoostersRecipes
