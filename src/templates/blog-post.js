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
      <div className="m-w p-i">
        <h1 className="">{props.data.post.title}</h1>

        <img
          className=""
          src={props.data.post.media.secure_url}
          alt={props.data.post.title}
        />

        {documentToReactComponents(props.data.post.body.json, options)}
      </div>
      <div className="">
        <div className="">
          <HyvorTalk.Embed websiteId={277} id={props.data.post.slug} />
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost
