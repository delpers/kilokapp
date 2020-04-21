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
          <div className="rl rl-mobile m-w p-i bg-w">
            {props.data.CLE.recipesRecettes.map(edge => {
              return (
                <div id={edge.id} className="mb-32 shadow-sm rounded bg-w">
               
               <div

className="mediaLR rounded shadow-sm"
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


                  <div className="mt-10 p-15 ">
                    <Link className="i-link fs-16 b-b-g mr-15 font-bold mb-15 nowrap" to={`/recette/${edge.slug}/`}>{edge.title}</Link>

                    <div> 

                    <div className="t-d fl-r mb-15">

<span class="fs-14 bg-g"> <i class="fas fa-check-circle"></i>  {edge.time} </span>




</div>
                    <div className="bg-w-c">
                        <span class="fs-14 text-gray "> <i class="fas fa-shopping-basket mr-5"></i> {edge.ingredientsNumbers} </span>
                      </div>

                     


                  
                    
                    
                    </div>
                 

                    <div className="b-solid-top">
                      <div  className="pt-15 ">
                      <i class="fas fa-file-medical-alt c-g mr-15"></i>
                        {edge.for.map(dataFor => (
                          <span  class="fs-14 text-gray pr-15" key={dataFor.instructions}>
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