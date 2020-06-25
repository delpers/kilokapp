import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    vegetable: contentfulFruitsVegetables(slug: { eq: $slug }) {
      title
      slug
      category
      getBoosters
      image: childContentfulFruitsVegetablesImageJsonNode {
        secure_url
      }
      dataRecipes {
        id
        title
        time
        for
        numberOfPersons
        ingredientsNumbers
        slug
        childContentfulRecipesFeaturedImageJsonNode {
          secure_url
        }
      }
    }
  }
`

const Background = styled.div`
  background: #f8f9fb;
`

const FVegetablesRecipes = props => {
  return (
    <Background>
      <Layout>
        <SEO title={props.data.vegetable.title} />

        <div className="w-screen p-120-0">
          <div className="m-w p-i pb-0 pt-0">
            <section className="row">
           
         




        <div> 
          
           <h1 id={props.data.vegetable.slug}>
              {props.data.vegetable.title} 
              </h1>
              <p className="mb-0"> {props.data.vegetable.category}</p>
 </div>
            


 <div> 

<div className="tfd">
                          {props.data.vegetable.getBoosters.map(datafl => {
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


            </section>

            
        </div>
        </div>
        <div>
          <div>
            <div className="rl rl-mobile m-w p-i ">
                  {props.data.vegetable.dataRecipes != null ? (
                    props.data.vegetable.dataRecipes.map((edge, i) => {
                      return (
                  <div className="mb-20 border " key={i}>
                    <div
                      className="mediaLR"
                      style={{
                        backgroundImage:
                          "url(" +
                          edge.childContentfulRecipesFeaturedImageJsonNode
                            .secure_url +
                          ")",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        height: "240px",
                        width: "374px",
                        borderRadius: "0",
                      }}
                    ></div>

                    <div className="mt-10 p-15 fs-16 ">
                      <Link
                        className="i-link fs-16 b-b-g mr-15 font-bold mb-15 nowrap"
                        to={`/recette/${edge.slug}/`}
                      >
                        {edge.title}
                      </Link>

                      <div>
                        <div className="t-d fl-r mb-15">
                          <span className="fs-14 bg-g">
                            {" "}
                            <i className="fas fa-check-circle"></i> {edge.time}  min(s){" "}
                          </span>
                        </div>
                        <div className="bg-w-c pl-0">
                          <span className="fs-14 text-gray ">
                            {" "}
                            <i className="far fa-user mr-5"></i>{" "}
                            {edge.numberOfPersons}{" "}
                          </span>
                        </div>
                        
                      </div>

                      <div className="b-solid-top">
                        <div className="pt-15 ">
                          <i className="fas fa-file-medical-alt c-g mr-15"></i>
                          {edge.for != null
                  ? edge.for.map((mv, i) => {
                      return (

                            <span
                              className="fs-14 text-gray pr-15"
                              key={i}
                            >
                              {mv.for}
                            </span>
                                   )
                                  })
                                : null}
                        </div>
                      </div>
                    </div>
                  </div>
                )})) : (null)
              }
            </div>
          </div>
        </div>
      </Layout>
    </Background>
  )
}

export default FVegetablesRecipes
