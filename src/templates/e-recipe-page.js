import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
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
      }
      boosters {
        id
        title
        slug
        calories
        getBoosters
      }
    }
  }
`
const Background = styled.div`
background: #f2f1eb;

`
const cookingRecipe = props => {
  return (
    <Background>
    <Layout>
      <SEO title={props.data.CRE.title} />

      <div className="w-screen p-100-0 pb-0 p-h ml-i-8"  style={{
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








<div className="mb-32 sticky blue b-b-blue">


  <div class="m-w p-i ">
    <span class="i-link fs-16 b-b-g mr-15 font-bold text-white">{props.data.CRE.numberOfPersons}</span>



    
    <div class="t-d fl-r mb-15 mt_i5"><span class="fs-14 bg-blue mr-p">
      <i class="fas fa-check-circle"></i> {props.data.CRE.time} </span></div>

    </div>
    </div>



    <h3 class="i-link b-b-g mr-15 font-bold m-w p-i bg-w">{props.data.CRE.ingredientsNumbers} Ingrédient(s).</h3>

        <div className="sr-cards m-w p-i mt-1 bg-w ns-print">
          {props.data.CRE.nIngredients.map(dataIGRD => {
            return (
              <div id={dataIGRD.id} className="rounded mb-32 mb-20 bg-w rounded shadow-sm ns-print bg-w-c mr-32">
            




                     <div className="mt-10 p-15 fs-16 _print_w ns-print">
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
                <div className="">





        










                  <h3 className="i-link fs-24 b-b-g font-bold mb-0 nowrap p-15">{dataFLC.title}</h3>
                 <div class="t-d p-15 fs-14"><span className=""><i class="fas fa-burn"></i> {dataFLC.calories}</span></div> 
                  <Link
                    to={`/recettes/base/${dataFLC.slug}/`}
                    alt="Découvrez"
                    className="i-link fs-16 b-b-g font-bold mb-0 p-15 db nowrap"
                  >
                    <button className="sd-btn">Afficher la liste complète</button>
                  </Link>

                  <div className="tfd w-325">
                    {dataFLC.getBoosters.map(datafl => (
                      <span className="p-15 align-left" key={dataFLC.getBoosters}>{datafl}</span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </Layout>
    </Background>
    
  )
}

export default cookingRecipe
