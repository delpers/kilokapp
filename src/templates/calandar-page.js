import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    calandar: contentfulMonth(slug: { eq: $slug }) {
      title
      slug
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
  }
`
const Background = styled.div`
  background: #f7f7f6;
  header {
    background: white !important;
    position: relative !important;
    border-bottom: 1px solid #f8f9fb !important;
  }
`
const BoostersRecipes = props => {
  return (
    <Background>
      <Layout>
        <SEO title={props.data.calandar.title} />

        <div className="bg-wlw cw">
          <div className="m-wb padding-bottom-none padding-top-none">
            <section className="sub-header">
              <h1 className="margin-bottom-0fw300">
                {props.data.calandar.title}
              </h1>
            </section>
          </div>
        </div>
        <div>
          <div className="mt-32">
            <div className="rl rl-mobile max-width padding-initial  ">
              {props.data.calandar.bList != null ? (
                props.data.calandar.bList.map((edge, i) => {
                  return (
                    (
                      <div className=" mb-32" key={i}>
                        <div className="bg-w p-15 flex-m border   ">
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
                          </div>{" "}
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
                                {edge.calories} <strong>Cal(s)</strong> · 100
                                gr.
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
    </Background>
  )
}

export default BoostersRecipes
