import React from "react"
import { graphql } from "gatsby"
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
     
    }
  }
`

const cookingRecipe = props => {
  return (
      <Layout key={props.data.contentfulTraining.id}>
        <SEO title={props.data.contentfulTraining.title} />

     

      <div className="mask-thumb-cat p-50-0 mb-0 bblue cw">
      <div className="m-w p-i pb-0 pt-0  " >
            <h1 className="fs-48">                  {props.data.contentfulTraining.title}
</h1>
        </div>
      </div>



        <div className="sticky b-solid-b">
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
                          <input
                            id={edge.id}
                            type="radio"
                            className="accordion-toggle"
                            name="toggle"
                          />
             <div className="title-trading">{edge.title}</div>

                          <label htmlFor={edge.id}>
                            <div className="day">
                              {edge.week} - D{edge.day}
                            </div>{" "}
                          </label>
                          <section>
                            {edge.videoUrl != null
                              ? edge.videoUrl.map((mv, i) => {
                                  return (
                                    <div>
                                      <h4> {mv.title} </h4>

                                      <video id="player" key={i}>
                                        <source
                                          src={mv.urlVideo}
                                          type="video/mp4"
                                        />
                                      </video>
                                    </div>
                                  )
                                })
                              : null}
                            {documentToReactComponents(edge.body.json)}

                            <div className="p-flex mb-32 mt-32">
                              <div className="pw-50 fs-16 mr-15">
                                <h4 className="">
                                  Avant la séance{" "}
                                </h4>
                                <p className="fs-16 text-gray">
                                  {edge.adviceBefore.adviceBefore}
                                </p>
                              </div>

                              <div className="pw-50 fs-16">
                                <h4 className="">
                                  Après la séance
                                </h4>
                                <p className="fs-16 text-gray">
                                  {edge.adviceAfter.adviceAfter}
                                </p>
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
  )
}

export default cookingRecipe
