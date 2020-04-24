import React from "react"
import { graphql, Link } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"

export const query = graphql`
  query($slug: String!) {
    CRE: contentfulCookingRecipe(slug: { eq: $slug }) {
      title
      slug
      time
      ingredientsNumbers
      numberOfPersons
      instructions
      childContentfulCookingRecipeFeaturedImageJsonNode {
        secure_url
      }
      nIngredients {
        id
        title
        amount
        iMg: childContentfulIngredientsImageJsonNode {
          secure_url
        }
      }
      boosters {
        id
        title
        slug
        ImageFL: childContentfulFruitsVegetablesImageJsonNode {
          secure_url
        }
        getBoosters
      }
    }
  }
`

const cookingRecipe = props => {
  return (
    <Layout>
      <SEO title={props.data.CRE.title} />

      <div className="w-screen p-100-0 pb-0 p-h"  style={{
                backgroundImage:
                  "url(" +
                  props.data.CRE.childContentfulCookingRecipeFeaturedImageJsonNode.secure_url +
                  ")",
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}> 

    <span className="mask-thumb">


      <div className="m-w p-i ">
        <section>
        <img className="dn w_print" src={props.data.CRE.childContentfulCookingRecipeFeaturedImageJsonNode.secure_url}></img>

          <h1 className="fs-6rem">{props.data.CRE.title}</h1>
      
        </section>
      </div>
      
  </span>

  </div>








<div className="mb-32 sticky b-solid-b">


  <div class="m-w p-i ">
    <span class="i-link fs-16 b-b-g mr-15 font-bold text-gray">{props.data.CRE.numberOfPersons}</span>

    <div class="t-d fl-r mb-15 mt_i5"><span class="fs-14 bg-g mr-p">
      <i class="fas fa-check-circle"></i> {props.data.CRE.time} </span></div>

    </div>
    </div>
    <h3 class="i-link b-b-g mr-15 font-bold m-w p-i bg-w">{props.data.CRE.ingredientsNumbers} Ingrédient(s).</h3>

        <div className="sr-cards m-w p-i mt-1 bg-w">
          {props.data.CRE.nIngredients.map(dataIGRD => {
            return (
              <div id={dataIGRD.id} className="rounded mb-32 mb-20 bg-w rounded shadow-sm bg-w-c mr-32">
                <div  className="ingr_mediap" style={{
                backgroundImage:
                  "url(" +
                  dataIGRD.iMg.secure_url +
                  ")",
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                height: "160px",
                width: "160px",
                margin: "20px",
              }}>
            
                </div>




                     <div className="mt-10 p-15 fs-16 _print_w">
                <h3 className="i-link fs-16 b-b-g mr-15 font-bold mb-0 nowrap">{dataIGRD.title}</h3>
                  <span class="fs-16 text-gray pr-15">{dataIGRD.amount}</span>
              </div>
              </div>

            )
          })}
        </div>
      <div className="m-w p-i bg-w">
        <div className="mt-32">
          <ol className="">
            {props.data.CRE.instructions.map(dataIST => (
              <li className="rounded mb-32 mb-32 b-solid-b direction p-0-32" key={dataIST.instructions}>
                {dataIST}
              </li>
            ))}
          </ol>

          
        </div>
      </div>

      <div className="m-w p-i boosters bg-w rounded mb-32">
        <div className="getBoosters getBoosters-mobile m-w p-i">
          {props.data.CRE.boosters.map(dataFLC => {
            return (
              <div className="mb-20 bg-w rounded shadow-sm">
                <div className="p-15 shadow-sm">





                <div  className="ingr_mediap " style={{
                backgroundImage:
                  "url(" +
                  dataFLC.ImageFL.secure_url +
                  ")",
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                height: "255px",
                width: "255px",
                margin: "20px",
              }}>
            
                </div>










                  <h3 className="i-link fs-16 b-b-g font-bold mb-0 nowrap p-15">{dataFLC.title}</h3>
                  <Link
                    to={`/recettes/base/${dataFLC.slug}/`}
                    alt="Découvrez"
                    className="i-link fs-16 b-b-g font-bold mb-0 nowrap"
                  >
                    <button className="orange-btn">Découvrez</button>
                  </Link>

                  <div className="tfd">
                    {dataFLC.getBoosters.map(datafl => (
                      <span className="p-10" key={dataFLC.getBoosters}>{datafl}</span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default cookingRecipe
