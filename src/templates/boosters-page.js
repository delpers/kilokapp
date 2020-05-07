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
      bList {
        title
        slug
        stockage
        calories
      }
    }
    home: contentfulHomePage {
      description_boosters
    }
  }
`

const Background = styled.div`
  background: #FCFCFC;
  header {
    background: white !important;
    position: relative !important;
    box-shadow: rgba(16, 25, 30, 0.08) 0px 1px 4px 0px;
  }
`

const BoostersRecipes = props => {
  return (
    <Background>
      <Layout>
        <SEO title={props.data.booster.title} />

        <div className="w-screen p-120-0">
          <div className="m-w p-i pb-0 pt-0">
            <section>
              <h1>{props.data.booster.title}</h1>
              <p className="mb-0"> {props.data.home.description_boosters}</p>
            </section>
          </div>
        </div>

        <div>
          <div>
            <div className="rl rl-mobile m-w p-i  ">
              {props.data.booster.bList.map(edge => {
                return (
                  <div className=" border  mb-32">
                    <div className="bg-w p-15">
                      <Link
                        className="i-link fs-16 b-b-g mr-15 font-bold mb-0 nowrap p-15 pb-0"
                        to={`/recettes/base/${edge.slug}/`}
                      >
                        {edge.title}
                      </Link>
                      <div className=" p-15 fs-14 pb-0">
                        <span className="">
                          <i className="fas fa-burn mr-5"></i> {edge.calories}{" "}
                          <strong>Kcal</strong> / 100 gr.
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
                )
              })}
            </div>
          </div>
        </div>
      </Layout>
    </Background>
  )
}

export default BoostersRecipes
