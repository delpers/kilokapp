import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import ReactFlowPlayer from "react-flow-player";

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

      {props.data.contentfulTraining.title}
      {props.data.contentfulTraining.level}
      {props.data.contentfulTraining.nWeeks}

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
                    {edge.week} {edge.day}
                  </div>{" "}
                </label>

                <section>
                  {edge.videoUrl != null
                    ? edge.videoUrl.map((mv, i) => {
                        return (
                          <div>
                            <h4> {mv.title} </h4>

                            <ReactFlowPlayer
  playerInitScript="http://releases.flowplayer.org/7.2.1/flowplayer.min.js"
  playerId="reactFlowPlayer"
  sources={[
    {
      type: "video/mp4",
      src: mv.urlVideo,
    }
  ]}
/>;


                            <video
                              width="720"
                              height="405"
                              controls
                              poster={mv.urlVideo}
                            >
                              <source src={mv.urlVideo} type="video/mp4" />
                              Your browser does not support the video tag or the
                              file format of this video.{" "}
                              <a href="http://www.supportduweb.com/">
                                http://www.supportduweb.com/
                              </a>
                            </video>

                            <div id="my_video">
                              <video
                                src={mv.urlVideo}
                                type="video/mp4"
                                poster="sample.jpg"
                                playsinline
                              >
                                <source src={mv.urlVideo} type="video/mp4" />
                              </video>
                            </div>

                            <div
                              id="my_video"
                              data-video={mv.urlVideo}
                              data-type="video/mp4"
                              data-poster="sample.jpg"
                            ></div>
                          </div>
                        )
                      })
                    : null}
                  {documentToReactComponents(edge.body.json)}

                  <div className="p-flex mb-32 mt-32">
                    <div className="pw-50 font-size-16 mr-32-i">
                      <h3 className="">Avant la séance </h3>
                      <p className="font-size-16">
                        {edge.adviceBefore.adviceBefore}
                      </p>
                    </div>

                    <div className="pw-50 font-size-16">
                      <h3 className="">Après la séance</h3>
                      <p className="font-size-16">
                        {edge.adviceAfter.adviceAfter}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            )
          })
        : null}
    </Layout>
  )
}

export default cookingRecipe
