import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    CLE: contentfulCookingE(slug: { eq: $slug }) {
      title
      slug
      childContentfulCookingEDescriptionTextNode {
        description
      }
      recipesRecettes {
        id
        title
        time
        for
        ingredientsNumbers
        slug
        childContentfulCookingRecipeFeaturedImageJsonNode {
          secure_url
        }
      }
    }
  }
`

const eRecipes = props => {
  return (
    <Layout>
      <SEO title={props.data.CLE.title} />




      <div className="w-screen p-100-0"> 
      <div className="m-w p-i pb-0">
        <section>
          <h1>{props.data.CLE.title}</h1>
          <p className="mb-0"> {
                props.data.CLE.childContentfulCookingEDescriptionTextNode
                  .description
              }</p>
        </section>
      </div>

      </div>


      <div>
        <div>
          <div className="rl rl-mobile m-w p-i">
            {props.data.CLE.recipesRecettes.map(edge => {
              return (
                <div id={edge.id} className="mb-32">
               
               <div

className="mediaLR"
style={{
  backgroundImage:
    "url(" +
    edge.childContentfulCookingRecipeFeaturedImageJsonNode
      .secure_url +
    ")",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "200px",
  width: "320px",
  borderRadius: "0",
}}
>

</div>


                  <div className="mt-10">
                    <Link className="i-link fs-16 b-b-g mr-15 font-bold mb-15" to={`/recette/${edge.slug}/`}>{edge.title}</Link>

                    <div>
                    <div className="t-d ">
                        <span class="fs-14 text-gray "> {edge.ingredientsNumbers} </span>
                      </div>

                     


                      <div className="t-d fl-r mb-15">

                        <span class="fs-14 bg-g"> <i class="fas fa-check-circle"></i>  {edge.time} </span>
                        


                        <span class="fs-14 bg-w">                        <i class="fas fa-certificate c-w"></i> </span>

                      </div>
                    
                    
                    </div>
                 

                    <div className="b-solid-top">
                      <div>
                        {edge.for.map(dataFor => (
                          <span  class="fs-14 text-gray" key={dataFor.instructions}>
                            {dataFor}
                          </span>
                        ))}
                      </div>
                    </div>
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

export default eRecipes