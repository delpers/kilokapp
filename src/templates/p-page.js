import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    CLE: contentfulCookingP(slug: { eq: $slug }) {
      title
      slug
      childContentfulCookingPDescriptionTextNode {
        description
      }
      recipesRecettes {
        id
        title
        time
        numberOfPersons
        for
        ingredientsNumbers
        slug
        childContentfulCookingRecipeFeaturedImageJsonNode {
          secure_url
        }
      }
    }contentfulHome {
     
      titleDishes
      descriptionDishes
    
    }
  }
`

const pRecipes = props => {
  return (
    <Layout>
      <SEO title={props.data.CLE.title} />

      <div className="w-screen p-120-0"> 
      <div className="m-w p-i pb-0 pt-0">
        <section>
          <h1>{props.data.contentfulHome.titleDishes}</h1>
          <p className="mb-0"> {
                props.data.contentfulHome.descriptionDishes
              }</p>
        </section>
      </div>

      </div>






      <div className="m-w p-i pb-0 mt-32"><h3 class="mb-0 fs-36 pb-4">{props.data.CLE.title}</h3>
      <span class="fs-18 text-gray">{
                props.data.CLE.childContentfulCookingPDescriptionTextNode
                  .description
              }</span>
      </div>





  
      <div>
        <div>
          <div className="rl rl-mobile m-w p-i ">
            {props.data.CLE.recipesRecettes.map(edge => {
              return (
                <div id={edge.id} className="mb-20 border">
               
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
  height: "230px",
  width: "374px",
  borderRadius: "0",
}}
>

</div>


                  <div className="mt-10 p-15 fs-16 ">
                    <Link className="i-link fs-16 b-b-g mr-15 font-bold mb-15 nowrap" to={`/recette/${edge.slug}/`}>{edge.title}</Link>

                    <div> 

                    <div className="t-d fl-r mb-15">

<span class="fs-14 bg-g"> <i class="fas fa-check-circle"></i>  {edge.time} </span>




</div>
                    <div className="bg-w-c pl-0">
                        <span class="fs-14 text-gray "> <i class="far fa-user mr-5"></i> {edge.numberOfPersons} </span>
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

export default pRecipes
