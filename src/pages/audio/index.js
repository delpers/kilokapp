import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import styled from "@emotion/styled"

const Background = styled.div`
  background: #000000;
  header {
    position: relative !important;
    border: 0 !important;
    background: white;
    display: none;
  }
`
const Audio = () => {
  const data = useStaticQuery(
    graphql`
      query {
        audio: allContentfulAudio(
          sort: { fields: publishedDate, order: DESC }
        ) {
          edges {
            node {
              title
              id
              slug
              author
              category
              eAudio: childContentfulAudioAudioJsonNode {
                secure_url
              }
             
            }
          }
        }
      }
    `
  )
  return (
      <Background>
    <Layout>
      <SEO title="Blog" />

      <div className="w-screen p-100-0 bg-black">
        <div className="m-w p-i pb-0 mt-32">
          <section>
            <h1 className="fs-76 cw">Bien-être </h1>
            <p className="mb-0 cw fs-36 ">
              Retrouvez ici l'ensemble des séances
              
            </p>
          </section>
        </div>
      </div>

      <div className="blogPost blogPost-mobile m-w p-i">
        {data.audio.edges.map(edge => {
          return (
            <div className="shadow-sm rounded mb-32 blackblack p-15" key={edge.node.id}>
             
              <h3 className="cw">
                {edge.node.title}
              </h3>
              <span className="cab">                {edge.node.category}
</span>
              <div className="audio">

              <figure>
    <figcaption>Listen to the T-Rex:</figcaption>
    <audio
        controls
        src={edge.node.eAudio.secure_url}>
            Your browser does not support the
            <code>audio</code> element.
    </audio>
</figure>


              </div>
              <div className="b-solid-top p-24 text-base font-bold">
                {edge.node.author}
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
    </Background>
  )
}

export default Audio
