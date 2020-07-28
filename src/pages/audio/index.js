import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Blog = () => {
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
              color
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
    <Layout>
      <SEO title="Blog" />
<div className="hero">
        <div className="m-w p-i">
          <h1 className="hero-title bold bottom-none">Méditation</h1>
        </div></div>

      <div className="blogPost blogPost-mobile max-width padding-initial">
        {data.audio.edges.map(edge => {
          return (
            <div className="shadow-sm rounded mb-32" key={edge.node.id}>
              <h4 className="p-024">{edge.node.title}</h4>
              <div>

     


{edge.node.eAudio.secure_url}

                
              </div>
              <div className="b-solid-top p-24 text-base font-bold">
                <h3 className="i-link cab di" id={edge.node.color}>
                  {edge.node.category}
                </h3>
                <div className="mt-15">{edge.node.author}</div>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default Blog
