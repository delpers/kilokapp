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
      medicalNumber
      ingredientsNumbers
      amountPerServingCalories
      allergen
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
      facts {
        id
        name
        value
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
  background: #f6f6f6;
`
const cookingRecipe = props => {
  return (
    <Background>
      <Layout>
        <SEO title={props.data.CRE.title} />

        <div
          className="w-screen p-100-0 pb-0 p-h ml-i-8"
          style={{
            backgroundImage:
              "url(" +
              props.data.CRE.childContentfulCookingRecipeFeaturedImageJsonNode
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
                  src={
                    props.data.CRE
                      .childContentfulCookingRecipeFeaturedImageJsonNode
                      .secure_url
                  }
                ></img>

                <h1 className="fs-6rem">{props.data.CRE.title}</h1>
              </section>
            </div>
          </span>
        </div>

        <div className="mb-32 sticky blue b-b-blue">
          <div class="m-w p-i ">
            <span class="i-link fs-16 b-b-g mr-15 font-bold text-white">
              {props.data.CRE.numberOfPersons}
            </span>

            <div class="t-d fl-r mb-15 mt_i5">
              <span class="fs-14 bg-blue mr-p">
                <i class="fas fa-check-circle"></i> {props.data.CRE.time}{" "}
              </span>
            </div>
          </div>
        </div>

        <div className="row m-w">
          <div className="m-w-780">
            <h3 class="i-link b-b-g mr-15 font-bold m-w p-i bg-w">
              {props.data.CRE.ingredientsNumbers} Ingrédients.
            </h3>

            <div className="ir-cards m-w mt-1 ns-print mt-32 mb-32">
              {props.data.CRE.nIngredients.map(dataIGRD => {
                return (
                  <div id={dataIGRD.id} className=" bg-w ns-print bg-w-c">
                    <div className="fs-16 _print_w ns-print">
                      <h3 className="i-link fs-16 b-b-g mr-15 font-bold mb-0 nowrap">
                        {dataIGRD.title}
                      </h3>
                      <span class="fs-16 text-gray pr-15">
                        {dataIGRD.amount}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
            <h3 class="i-link b-b-g mr-15 font-bold m-w p-i bg-w mb-32">
              Directions.
            </h3>

            <div className="m-w p-i bg-w mb-32 ">
              <div className="mt-32">
                <ol>
                  {props.data.CRE.instructions.map(dataIST => (
                    <li
                      className="mb-32 mb-32  direction p-0-32"
                      key={dataIST.instructions}
                    >
                      {dataIST}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="m-w p-i boosters bg-w  mb-32">
              <h3 class="i-link b-b-g mr-15 font-bold m-w p-i bg-w">
                Nutriments
              </h3>
              <div className="getBoosters getBoosters-mobile m-w">
                {props.data.CRE.boosters.map(dataFLC => {
                  return (
                    <div className="mb-20 bg-w rounded shadow-sm">
                      <div className="">
                        <h3 className="i-link fs-24 b-b-g font-bold mb-0 nowrap p-i">
                          {dataFLC.title}
                        </h3>
                        <div class=" p-i fs-14">
                          <span className="">
                            <i class="fas fa-burn mr-5"></i> {dataFLC.calories}{" "}
                            <strong>Kcal</strong>/ 100 gr.
                          </span>
                        </div>
                        <div class=" p-i fs-14">
                          <span className="color-black">
                            <i class="fas fa-check-circle mr-5"></i>{" "}
                            {dataFLC.stockage}
                          </span>
                        </div>

                        <Link
                          to={`/recettes/base/${dataFLC.slug}/`}
                          alt="Découvrez"
                          className="i-link fs-16 b-b-g font-bold mb-0 p-i db nowrap"
                        >
                          <button className="sd-btn">Afficher la liste</button>
                        </Link>

                        <div className="tfd w-325">
                          {dataFLC.getBoosters.map(datafl => (
                            <span
                              className="p-i align-left"
                              key={dataFLC.getBoosters}
                            >
                              {datafl}
                            </span>
                          ))}
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
              <h3 class="i-link b-b-g mr-15 font-bold m-w p-i  b-solid-b">
                Valeur nutritive
              </h3>
              <div className="total flex p-i">
                <span className="d-grid w-80">
                  <i className="text-gray fs-16">Quantité par portion</i>
                  <i className="text-gray fs-16">Calories</i>
                </span>

                <span className="tfd">
                  <h3 className="fs-42">
                    {props.data.CRE.amountPerServingCalories}
                  </h3>
                </span>
              </div>

              <div className="d-grid m-w mt-1 ns-print mt-32 mb-32">
                {props.data.CRE.facts.map(dataFACTS => {
                  return (
                    <div id={dataFACTS.id} className=" bg-w ns-print bg-w-c">
                      <div className="fs-16 _print_w ns-print">
                        <h3 className="i-link fs-16 b-b-g mr-15 font-bold mb-0 nowrap">
                          {dataFACTS.name}
                        </h3>
                      </div>
                      <div>
                        {" "}
                        <span class="fs-16 text-gray pr-15">
                          {dataFACTS.value}
                          {dataFACTS.type}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="nutrition">
              <h3 class="i-link b-b-g mr-15 font-bold m-w p-i fs-18  b-solid-b">
                Allergène(s)
              </h3>
              <div className="db">
                {props.data.CRE.allergen.map(dataALRG => (
                  <div className="p-i fs-18 b-solid-b" key={dataALRG.allergen}>
                    <i class="fas fa-caret-right mr-5"></i> {dataALRG}
                  </div>
                ))}
              </div>
            </div>

            <div className="nutrition">
              <h3 class="i-link b-b-g mr-5 font-bold m-w p-i fs-18 bg-w">
                <i class="fas fa-file-medical-alt c-green mr-15"></i> M{" "}
                {props.data.CRE.medicalNumber}
              </h3>
            </div>
          </div>
        </div>
      </Layout>
    </Background>
  )
}

export default cookingRecipe
