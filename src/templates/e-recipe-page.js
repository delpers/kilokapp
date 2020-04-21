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

      <div className="m-w p-i">
        <div>
          <div id={props.data.CRE.id}>
            <h1>{props.data.CRE.title}</h1>
            <picture>
                    <img
                      src={props.data.CRE.childContentfulCookingRecipeFeaturedImageJsonNode.secure_url}
                      alt={props.data.CRE.title}
                    ></img>
                  </picture>
          </div>
        </div>

        <div>
          <h4>{props.data.CRE.time}</h4>
          <h1> {props.data.CRE.ingredientsNumbers}</h1>
        </div>

        <div className="ingredientsList">
          {props.data.CRE.nIngredients.map(dataIGRD => {
            return (
              <div id={dataIGRD.id} className="rounded mb-32">
                <div>
                  <picture>
                    <img
                      src={dataIGRD.iMg.secure_url}
                      alt={dataIGRD.title}
                    ></img>
                  </picture>
                  <h3>{dataIGRD.title}</h3>
                  <span>{dataIGRD.amount}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="m-w p-i">
        <div>
          <div>
            {props.data.CRE.instructions.map(dataIST => (
              <div className="rounded mb-32" key={dataIST.instructions}>
                {dataIST}
              </div>
            ))}
          </div>

          <div className="end">
            <div>
              <label className="gomodal" for="showblock">
                <i class="far fa-image"></i>
              </label>
              <input type="checkbox" id="showblock" />
              <div id="modal">
                <div className="container">
                  <div className="modal-inner">
                    <label className="close" for="showblock">
                      
                    </label>
                    <div className="modal-side">
                      <div
                        style={{
                          backgroundImage:
                            "url(" +
                            props.data.CRE
                              .childContentfulCookingRecipeFeaturedImageJsonNode
                              .secure_url +
                            ")",
                        }}
                      />{" "}
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="m-w p-i">
        <div className="getBoosters getBoosters-mobile m-w p-i">
          {props.data.CRE.boosters.map(dataFLC => {
            return (
              <div>
                <div>
                  <picture>
                    <img
                      src={dataFLC.ImageFL.secure_url}
                      alt={dataFLC.title}
                    ></img>
                  </picture>

                  <div>{dataFLC.title}</div>
                  <Link
                    to={`/recettes/base/${dataFLC.slug}/`}
                    alt="Découvrez"
                    className="notunder"
                  >
                    <button>Découvrez</button>
                  </Link>

                  <div>
                    {dataFLC.getBoosters.map(datafl => (
                      <span key={dataFLC.getBoosters}>{datafl}</span>
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
