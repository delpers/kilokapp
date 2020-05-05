import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "@emotion/styled"

const Background = styled.div`
  background: #f8f8f8;
`
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
     
       descriptionBoosters
    
    }
  }
`

const bRecipes = props => {
  return (
    <Background>

    <Layout>
      <SEO title={props.data.CLE.title} />

     
    
      <div className="w-screen p-120-0"> 
      <div className="m-w p-i pb-0 pt-0">
        <section>
          <h1>{props.data.CLE.title}</h1>
          <p className="mb-0"> {
                props.data.contentfulHome.descriptionBoosters
              }</p>
        </section>
      </div>

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
    </Background>

  )
}

export default bRecipes
