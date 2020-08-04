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
<div className="border-bottom">
        <div className="sticky">
          <div className="m-w p-i">
            <span className="">
              {props.data.contentfulRecipes.numberOfPersons}
            </span>

            <span className="">
              <i className="fas fa-file-medical-alt color-green"></i>{" "}
              {props.data.contentfulRecipes.medicalNumber}
            </span>

            <div className="t-d float-right mb-15 mt_i5">
              <span className="">
                <i className="fas fa-check-circle"></i>{" "}
                {props.data.contentfulRecipes.time} Min(s).
              </span>
            </div>
          </div>
        </div>
        </div>
        <div class="right-hero">
          <h1 class="hero-title-recipes bottom-none color-initial bold font-time none">
            Recipes
          </h1>
        </div>

        <div className="row m-w p-i">
          <div>
            <div>
              <section>
                <h1 class="hero-title bold bottom-initial font-time">
                  {props.data.contentfulRecipes.title}
                </h1>
              </section>
              <div></div>
              <div className="sw-recipes mb-32">
              <h3 className="title-medium bottom-initial color-green">
              Ingrédient(s)
            </h3>
                <div className="grid-list bottom-initial-divi">
                  {props.data.contentfulRecipes.nIngredients.map(dataIGRD => {
                    return (
                      <div id={dataIGRD.id} className="">
                        <div className="  padding shadow  r-10">
                          <h3 className="size-i-item">{dataIGRD.title}</h3>
                          <span className="font-size-16 text-gray pr-15">
                            {dataIGRD.amount}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              
            </div>

            <div></div>
          </div>

          <div className="w-recipes">
          <div className="bottom-initial-divi">
                <h3 className="title-medium bottom-initial">Préparation</h3>
                <div className="mt-1 mb-32">
                  {props.data.contentfulRecipes.dRecipe.map((dataDr, i) => {
                    return (
                      <div id={dataDr.id} className="" key={i}>
                        <div className=" border-bottom">
                          <h3 className=" i-link size-24 nowrap ">
                            {dataDr.title}
                          </h3>
                          <span className="font-size-16 pr-15">
                            {dataDr.direction.direction}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

            <div
              style={{
                backgroundImage:
                  "url(" +
                  props.data.contentfulRecipes
                    .childContentfulRecipesFeaturedImageJsonNode.secure_url +
                  ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "bottom",
                height: "280px",
              }}
            ></div>
          </div>

          <div className="none-print">
            <div className="rl rl-mobile max-width padding-initial  p0-m">
              {props.data.contentfulRecipes.boosters.map(dataFLC => {
                return (
                  <div
                    className="bg-w p-15 flex-m sw-recipes bm01b mb-32 shadow-sm"
                    id={dataFLC.id}
                  >
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
                    >
                      {" "}
                    </div>
                    <div>
                      <Link
                        to={`/recettes/base/${dataFLC.slug}/`}
                        alt="Découvrez"
                        className="i-link font-size-16 b-b-g margin-right-qz font-bold margin-bottom-0nowrap p-15 padding-bottom-none"
                      >
                        {dataFLC.title}
                      </Link>

                      <div className=" p-15 font-size-14 padding-bottom-none">
                        <span className="">
                          <i className="fas fa-burn mr-5"></i>{" "}
                          {dataFLC.calories} <strong>Cal(s)</strong> · 100 gr.
                        </span>
                      </div>
                      <div className=" p-15 font-size-14">
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
        </div>
      </Layout>
    </Background>
  )
}

export default cookingRecipe
