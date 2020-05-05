import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import SEO from "../components/seo"
import Layout from "../components/layout"

export const query = graphql`
  query($slug: String!) {
    contentfulCookingRecipe(slug: { eq: $slug }) {
      title
      slug
      time
      medicalNumber
      ingredientsNumbers
      amountPerServingCalories
      allergen
      numberOfPersons
      childContentfulCookingRecipeFeaturedImageJsonNode {
        secure_url
      }
      
      nIngredients {
        id
        title
        amount
      }
      dRecipe {
        id
        title
        direction {
          direction
        } 
      }
      nFacts {
        contentful_id
        title
        amount
        type
      }
      boosters {
        id
        title
        slug
        calories
        stockage
        getBoosters
      }
    }
  }
`
const Background = styled.div`
  background: #f8f8f8;
`
const cookingRecipe = props => {
  return (
    <Background>
      <Layout key={props.data.contentfulCookingRecipe.id}>
        <SEO title={props.data.contentfulCookingRecipe.title} />
        <div className="sticky blue">
          <div className="m-w p-i ">
            <span className="i-link fs-16 b-b-g mr-15 font-bold text-white">
              {props.data.contentfulCookingRecipe.numberOfPersons}
            </span>

            <span className="i-link fs-16 b-b-g mr-15 font-bold text-white">
            <i className="fas fa-file-medical-alt  mr-15"></i> {props.data.contentfulCookingRecipe.medicalNumber}
            </span>



  
            <div className="t-d fl-r mb-15 mt_i5">
              <span className="fs-14 bg-blue mr-p">
                <i className="fas fa-check-circle"></i> {props.data.contentfulCookingRecipe.time}
              </span>
            </div>
          </div>
        </div>

        <div
          className="w-screen p-100-0 pb-0 p-h ml-i-8"
          style={{
            backgroundImage:
              "url(" +
              props.data.contentfulCookingRecipe.childContentfulCookingRecipeFeaturedImageJsonNode
                .secure_url +
              ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <span className="mask-thumb">
            <div className="m-w p-i ">
              <section>
                <img
                  className="dn w_print"
                  alt={props.data.contentfulCookingRecipe.title}
                  src={
                    props.data.contentfulCookingRecipe
                      .childContentfulCookingRecipeFeaturedImageJsonNode
                      .secure_url
                  }
                ></img>

                <h1 className="fs-6rem">{props.data.contentfulCookingRecipe.title}</h1>
              </section>
            </div>
          </span>
        </div>

     








        <div className="row m-w pt-0i mt-32">
          <div className="m-w-780">
            <h3 className="i-link b-b-g mr-15 font-bold m-w p-i bg-w">
              {props.data.contentfulCookingRecipe.ingredientsNumbers} Ingrédients.
            </h3>

            <div className="ir-cards m-w mt-1 ns-print bg-w mb-32 pt-32 pb-32">
              {props.data.contentfulCookingRecipe.nIngredients.map(dataIGRD => {
                return (
                  <div id={dataIGRD.id} className=" bg-w ns-print bg-w-c pt-0">
                    <div className="fs-16 _print_w ns-print">
                      <h3 className="i-link fs-16 b-b-g mr-15 font-bold mb-0 nowrap">
                        {dataIGRD.title}
                      </h3>
                      <span className="fs-16 text-gray pr-15">
                        {dataIGRD.amount}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>







            <h3 className="i-link b-b-g mr-15 font-bold m-w p-i bg-w ">
                  Directions.
                </h3>
              <div className="mt-1 mb-32">
             



                  {props.data.contentfulCookingRecipe.dRecipe.map(dataDr => {
                return (
                      <div id={dataDr.id} className=" bg-w ns-print bg-w-c p-20 mb-1">
                        <div className="fs-16 _print_w ns-print  mt-1">
                          <h3 className="text-gray  i-link fs-16 b-b-g mr-15 font-bold mb-0 nowrap tl">
                            {dataDr.title}
                          </h3>
                          <span className="fs-16 pr-15">
                            {
                              dataDr.direction
                                .direction
                            }
                          </span>
                        </div>
                        
                      </div>
                      )
                    })}
                </div>







                <h3 className="i-link b-b-g mr-15 font-bold m-w p-i bg-w">
                Nutriments
              </h3>

            <div className="m-w boosters bg-w  mb-32 mt-1-s">
           
              <div className="getBoosters getBoosters-mobile m-w">
                {props.data.contentfulCookingRecipe.boosters.map(dataFLC => {
                  return (
                    <div
                      className="mb-32 bg-w w-391 br-1"
                      id={dataFLC.id}
                    >
                      <div className="">
                        <h3 className="i-link fs-24 b-b-g font-bold mb-0 nowrap p-i pb-0">
                          {dataFLC.title}
                        </h3>
                        
                        <div className=" p-i fs-14 pb-0">
                          <span className="">
                            <i className="fas fa-burn mr-5"></i>
                            {dataFLC.calories} <strong>Kcal</strong>/ 100 gr.
                          </span>
                        </div>
                        <div className=" p-i fs-14">
                          <span className="color-black">
                            <i className="fas fa-check-circle mr-5"></i>
                            {dataFLC.stockage}
                          </span>
                        </div>

                      <div className="">
                      <Link
                          to={`/recettes/base/${dataFLC.slug}/`}
                          alt="Découvrez"
                          className="g-btn td-none "
                        >
                         <i class="fas fa-link"></i> Afficher la liste
                        </Link>
                      </div>

                        <div className="tfd">
                          {dataFLC.getBoosters.map(datafl => {
                  return (

                            <span
                              id={datafl.contentful_id}
                              className="p-16-20 align-left  pb-0"
                            >
                              {datafl}
                            </span>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>








          <div className="m-w-100p100 bg-w ml-32">

            
            <div className="nutrition">
              <h3 className="i-link b-b-g mr-15 font-bold m-w p-i  b-solid-b">
                Valeur nutritive
              </h3>
              <div className="total flex p-i">
                <span className="d-grid w-80">
                  <i className="text-gray fs-16">Quantité par portion</i>
                  <i className="text-gray fs-16">Calories</i>
                </span>

                <span className="tfd">
                  <h3 className="fs-42">
                    {props.data.contentfulCookingRecipe.amountPerServingCalories}
                  </h3>
                </span>
              </div>

              <table className="d-grid m-w mt-1 ns-print mt-32 pb-0 p-15">
                {props.data.contentfulCookingRecipe.nFacts.map(dataFACTS => {
                  return (

                   

                    <tbody
                      id={dataFACTS.id}
                      className=" bg-w ns-print bg-w-c d-table"
                    >
                      <tr className="fs-16 _print_w ns-print">
                        <th className="i-link fs-16 b-b-g mr-15 font-bold mb-0 nowrap align-left">
                          {dataFACTS.title}
                        </th>
                        
                        <th
                          className="fs-16 text-gray pr-15 align-right"
                        >
                          {dataFACTS.amount}
                          <strong className="initial">{dataFACTS.type}</strong>
                      </th>
                      </tr>

                     
                    </tbody>
                  )
                })}
              </table>
            </div>

















            <div className="nutrition">
              <h3 className="i-link b-b-g mr-15 font-bold m-w p-i  b-solid-b">
                Allergène(s)
              </h3>
              <div className="db">
                {props.data.contentfulCookingRecipe.allergen.map(dataALRG => {
                  return (
                    <div
                      className="p-i fs-18 b-solid-b"
                      id={dataALRG.contentful_id}
                    >
                      <i className="fas fa-caret-right mr-5"></i> {dataALRG}
                    </div>
                  )
                })}
              </div>
            </div>

          
          </div>
        </div>













      </Layout>
    </Background>
  )
}

export default cookingRecipe
