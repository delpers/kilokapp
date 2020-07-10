import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"


export const query = graphql`
  query($slug: String!) {
    contentfulRecipes(slug: { eq: $slug }) {
      title
      slug
      time
      medicalNumber
      ingredientsNumbers
      numberOfPersons
      childContentfulRecipesFeaturedImageJsonNode {
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
        id
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
        image: childContentfulFruitsVegetablesImageJsonNode {
          secure_url
        }
      }
    }
  }
`
const Background = styled.div`
  background: #f7f7f7;
  header {
    background: white !important;
    position: relative !important;
    border-bottom: 1px solid #f4f5f5;
  }
`
const cookingRecipe = props => {
  return (
    <Background>
      <Layout key={props.data.contentfulRecipes.id}>
        <SEO title={props.data.contentfulRecipes.title} />
       

     

        <div className="sticky">
          <div className="m-w p-i ">


            <span className="i-link fs-16 b-b-g mr-15 fw300">
              {props.data.contentfulRecipes.numberOfPersons}
            </span>





            <span className="i-link fs-16 b-b-g mr-15 fw300">
              <i className="fas fa-file-medical-alt  mr-15 c-green"></i>{" "}
              {props.data.contentfulRecipes.medicalNumber}
            </span>

            

            <div className="t-d fl-r mb-15 mt_i5">
              <span className="fs-16 bg-wl mr-p">
                <i className="fas fa-check-circle"></i>{" "}
                {props.data.contentfulRecipes.time} min(s).
              </span>
            </div>
          </div>
        </div>



        <div className="row m-w pt-0i mt-32">
          <div> 
          <div className="m-w-780">

<div>

</div>
          <div className="sw-recipes mb-32">

            <h3 className="i-link b-b-g mr-15 font-bold m-w p-i bg-w shadow-sm mb-1">
            {props.data.contentfulRecipes.title}
        
            </h3>
         

            <div className="ir-cards m-w mt-1 ns-print bg-w mb-32 shadow-sm pt-32 pb-32">
              {props.data.contentfulRecipes.nIngredients.map(dataIGRD => {
                return (
                  <div id={dataIGRD.id} className=" bg-w ns-print bg-w-c pt-0">
                    <div className="_print_w ns-print">
                      <h3 className="i-link fs-20 b-b-g mr-15 font-bold mb-5 nowrap">
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
            </div>


<div className="sw-recipes">
            <h3 className="i-link b-b-g mr-15 font-bold m-w p-i bg-w shadow-sm mb-1">
            Préparation
            </h3>
            <div className="mt-1 mb-32">
              {props.data.contentfulRecipes.dRecipe.map((dataDr,i) => {
                return (
                  <div
                    id={dataDr.id}
                    className=" bg-w ns-print bg-w-c p-20 mb-1 mbs shadow-sm"
                    key={i}
                  >
                    <div className="fs-16 _print_w ns-print  mt-1">
                      <h3 className=" i-link fs-20 b-b-g mb-5 fw300 nowrap ">
                        {dataDr.title}
                      </h3>
                      <span className="fs-16 pr-15">
                        {dataDr.direction.direction}
                      </span>
                      </div>

                    </div>
                )
              })}

            </div>
            </div>


            </div>


            <div>

            </div>
          </div>

          

          <div className="m-w-100p100 bg-w ml-32 sw-recipes shadow-sm">

            <div  style={{
            backgroundImage:
              "url(" +
              props.data.contentfulRecipes
                .childContentfulRecipesFeaturedImageJsonNode.secure_url +
              ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPositionX: "bottom",
            height: "280px"
          }}></div>
            <div className="nutrition">
              <h3 className="i-link b-b-g mr-15 font-bold m-w p-i shadow-sm mb-1">
                Information(s)
              </h3>
            

              <table className="d-grid m-w mt-1 ns-print pb-0 pt-0 p-15">


{props.data.contentfulRecipes.nFacts != null
  ? props.data.contentfulRecipes.nFacts.map((mv, i) => {
      return (
                    <tbody
                      key={i}
                      className=" bg-w ns-print bg-w-c d-table"
                    >
                      <tr className="fs-16 _print_w ns-print">
                        <th className="i-link fs-16 b-b-g mr-15 font-bold mb-0 nowrap align-left">
                          {mv.title}
                        </th>

                        <th className="fs-16 text-gray pr-15 align-right">
                          {mv.amount}
                          <strong className="initial">{mv.type}</strong>
                        </th>
                      </tr>
                    </tbody>
                   )
                  })
                : (
                  <div className="">Aucune données disponible</div>
                )
              
              }
              </table>
            </div>

            </div>
            </div>



<div className="none-print">



            <div className="rl rl-mobile m-w p-i  p0-m">
                {props.data.contentfulRecipes.boosters.map(dataFLC => {
                  return (
                    <div className="bg-w p-15 flex-m sw-recipes bm01b mb-32 shadow-sm" id={dataFLC.id}>
                      <div
          className="w-screen p-80-0 perfect-bg pbg-m"
          style={{
              backgroundImage:
              "url(" + dataFLC.image.secure_url + ")",
              backgroundSize: "50%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              margin: "0 10%",
          }}
        > </div> 
<div>
<Link
                            to={`/recettes/base/${dataFLC.slug}/`}
                            alt="Découvrez"
                            className="i-link fs-16 b-b-g mr-15 font-bold mb-0 nowrap p-15 pb-0"
                          >
                          {dataFLC.title}
                          </Link>

                          
                          <div className=" p-15 fs-14 pb-0">
                            <span className="">
                              <i className="fas fa-burn mr-5"></i>{" "}
                              {dataFLC.calories} <strong>Cal(s)</strong> · 100 gr.
                            </span>
                          </div>
                          <div className=" p-15 fs-14">
                            <span className="color-black">
                              <i className="fas fa-check-circle mr-5"></i>{" "}
                              {dataFLC.stockage}
                            </span>
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
