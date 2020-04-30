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
        stockage
      calories
      }
    }contentfulHome {
     
      titleBoosters
       descriptionBoosters
    
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
          <h1>{props.data.contentfulHome.titleBoosters}</h1>
          <p className="mb-0"> {
                props.data.contentfulHome.descriptionBoosters
              }</p>
        </section>
      </div>

      </div>






      <div className="m-w p-i pb-0"><h3 class="mb-0 fs-36 pb-4">{props.data.CLE.title}</h3>
   
      </div>





      <div>
        <div>
        <div className="rl rl-mobile m-w p-i  ">
            {props.data.CLE.bList.map(edge => {
              return (
                <div className=" border  mb-32">











                  <div className="bg-w p-15">
                    <Link class="i-link fs-16 b-b-g mr-15 font-bold mb-0 nowrap p-15 pb-0" to={`/recettes/base/${edge.slug}/`}>
                      {edge.title}
                    </Link>
                    <div class=" p-15 fs-14 pb-0"><span className=""><i class="fas fa-burn mr-5" ></i> {edge.calories} <strong>Kcal</strong> / 100 gr.</span></div> 
                 <div class=" p-15 fs-14"><span className="color-black"><i class="fas fa-check-circle mr-5"></i>  {edge.stockage}</span></div> 
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
