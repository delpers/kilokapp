import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    CLE: contentfulBooster(slug: { eq: $slug }) {
      title
      slug
   
      bList {
        title
        slug
       
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
                <div className="rounded shadow-sm  mb-32">











                  <div className="bg-w p-15 shadow-sm">
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
