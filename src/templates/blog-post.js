import React from "react"
import { graphql } from "gatsby"
import HyvorTalk from "hyvor-talk-react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export const query = graphql`
  query($slug: String!) {
    post: contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      body {
        json
      }
      media: childContentfulBlogPostFeaturedImageJsonNode {
        secure_url
      }
    }
  }
`
const BlogPost = props => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img alt={alt} src={url} />
      },
    },
  }

  return (
    <Layout>
      <SEO title={props.data.post.title} />

      <div className="w-screen p-h"> 
      <div className="m-w p-i pb-0 mt-32">
        <section>
          <h1>{props.data.post.title}</h1>
        </section>
      </div>

      </div>


      <div className="m-w p-i">

        <img
          className=""
          src={props.data.post.media.secure_url}
          alt={props.data.post.title}
        />

        {documentToReactComponents(props.data.post.body.json, options)}
      </div>
      <div className="">
        <div className="m-w p-i">
          <HyvorTalk.Embed websiteId={277} id={props.data.post.slug} />
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost
