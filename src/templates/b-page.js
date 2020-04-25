import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    CLE: contentfulBooster(slug: { eq: $slug }) {
      title
      slug
      childContentfulBoosterImageJsonNode {
        secure_url
      }
      bList {
        title
        slug
        childContentfulFruitsVegetablesImageJsonNode {
          secure_url
        }
      }
    }
  }
`

const bRecipes = props => {
  return (
    <Layout>
      <SEO title={props.data.CLE.title} />

      <div className="w-screen p-h"> 
      <div className="m-w p-i pb-0">
        <section>
          <h1>{props.data.CLE.title}</h1>
        
        </section>
      </div>

      </div>

      <div>
        <div>
        <div className="rl rl-mobile m-w p-i ">
            {props.data.CLE.bList.map(edge => {
              return (
                <div className="rounded shadow-sm">



             <div

className="mediaLR"
style={{
  backgroundImage:
    "url(" +
    edge.childContentfulFruitsVegetablesImageJsonNode
      .secure_url +
    ")",
  backgroundPosition: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  height: "200px",
  width: "320px",
  borderRadius: "0",
}}
>

</div>









                  <div>
                    <Link class="i-link fs-16 b-b-g mr-15 font-bold mb-0 nowrap" to={`/recettes/base/${edge.slug}/`}>
                      {edge.title}
                    </Link>

                    <div></div>
                    <div></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default bRecipes
