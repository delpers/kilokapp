import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export const query = graphql`
  query($slug: String!) {
    contentfulTraining(slug: { eq: $slug }) {
      title
      slug
      nWeeks
      level
      steps {
        title
        id
        week
        day
        videoUrl {
          title
          urlVideo
        }
        body {
          json
        }
        adviceBefore {
          adviceBefore
        }
        adviceAfter {
          adviceAfter
        }
      }
      childContentfulTrainingImageJsonNode {
        secure_url
      }
    }
  }
`
const Background = styled.div`
  background: #FFF;
  header {
    background: #fd9f62 !important;
    position: relative !important;
  }
`
const cookingRecipe = props => {
  return (
    <Background>
      <Layout key={props.data.contentfulTraining.id}>
        <SEO title={props.data.contentfulTraining.title} />

        <div
          className="w-screen p-100-0 pt-0 pb-0  ml-i-8"
          style={{
           
            backgroundColor: "#fd9f62",
          }}
        >
          <span className="i-190">
            <div className="m-w p-i m-w ">
              <section>
                <img
                  className="dn w_print"
                  alt={props.data.contentfulTraining.title}
                  src={
                    props.data.contentfulTraining
                      .childContentfulTrainingImageJsonNode.secure_url
                  }
                ></img>

                <h1 className="fs-48 color-w  mw728">
                  {props.data.contentfulTraining.title}
                </h1>
              </section>
            </div>
          </span>
        </div>

        <div className="sticky">
          <div className="m-w p-i ">
            <span className="i-link fs-16 b-b-g mr-15  "></span>

            <span className="i-link fs-16 b-b-g mr-15  ">
              <i className="fas fa-heart mr-8"></i>{" "}
              {props.data.contentfulTraining.level}
            </span>

            <span className="i-link fs-16 b-b-g mr-15   ">
              <i className="fa fa-calendar-week mr-8"></i>{" "}
              {props.data.contentfulTraining.nWeeks}
            </span>
          </div>
        </div>

        <div className=" m-w pt-0i mt-32">
          <div>
         

            <div className=" p-i">
              <div className="week mb-32">
                {props.data.contentfulTraining.steps != null
                  ? props.data.contentfulTraining.steps.map((edge, i) => {
                      return (
                        <div className="accordion" key={i}>
                          <input id={edge.id} type="radio" className="accordion-toggle" name="toggle" />
  <label htmlFor={edge.id}><div className="day">{edge.week} - D{edge.day}</div> {edge.title}</label>
  <section> 

  {edge.videoUrl != null
                  ? edge.videoUrl.map((mv, i) => {
                      return (
<div>
<h4> {mv.title} </h4>
 

    <video id="player" key={i}>
  <source src={mv.urlVideo} type="video/mp4" />

</video>


</div>

)
})
: null}
                       {documentToReactComponents(edge.body.json)}


                          <div className="p-flex mb-32">
                            <div className="pw-50 p-20 border fs-16 mr-15">
                              <h4 className="uppercase">
                              Tips avant la séance{" "}
                              </h4>
                              <p className="fs-16 text-gray">{edge.adviceBefore.adviceBefore}</p>
                            </div>

                            <div className="pw-50 p-20 border fs-16 ">
                              <h4 className="uppercase">
                              Tips après la séance
                              </h4>
                              <p className="fs-16 text-gray">{edge.adviceAfter.adviceAfter}</p>
                            </div>
                          
                          </div>
                          
                          
                
                          </section>
                        </div>
                      )
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Background>
  )
}

export default cookingRecipe
