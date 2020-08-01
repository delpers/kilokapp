import React from "react"
import { graphql, Link } from "gatsby"
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
      title_boosters
    }
  }
`


const BoostersRecipes = props => {
  return (
      <Layout>
        <SEO title={props.data.booster.title} />


          
        <div className="right-hero">
<h1 class="hero-title-recipes bottom-none">{props.data.booster.title}</h1>
</div>          
          
          




        <div>
          <div>
            <div className="vegetables-grid m-w p-i padding-content">
              {props.data.booster.bList != null ? (
                props.data.booster.bList.map((edge, i) => {
                  return (
                    (
                      <div className="   mb-32" key={i}>
                        <div className="background-white shadow-plus r-12">
                          <div
                            className="border-bottom-light"
                            style={{
                              backgroundImage:
                                "url(" + edge.image.secure_url + ")",
                              backgroundSize: "50%",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              margin: "0 10%",
                              height: "156px",
                              width: "156px",
                              margin: "24px",
                            }}
                          >
                            {" "}
                          </div>

                          <div className="padding-min">
                            <Link
                              className="nowrap v-title margin-top-5"
                              to={`/recettes/base/${edge.slug}/`}
                            >
                              {edge.title}
                            </Link>
                            <div className="margin-top-5 v-size">
                              <span className="color-black">
                                <i className="fas fa-burn"></i>{" "}
                                {edge.calories} <strong>C</strong> · 100 gr.
                              </span>
                            </div>
                            <div className="margin-top-5 v-size">
                              <span className="color-black">
                                <i className="fas fa-check-circle"></i>{" "}
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
  )
}

export default BoostersRecipes
