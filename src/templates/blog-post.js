import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import HyvorTalk from "hyvor-talk-react"

export const query = graphql`
  query($slug: String!) {
    post: contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      body {
        json
      }
      picture: childContentfulBlogPostFeaturedImageJsonNode {
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

      <div className="mask-thumb-cat padding-50-0 mb-0">
        <div className="max-width padding-initial padding-bottom-none padding-top-none  ">
          <h1 className="fs-48">{props.data.post.title}</h1>
        </div>
      </div>

      <div>
        <img
          className=""
          src={props.data.post.picture.secure_url}
          alt={props.data.post.title}
        />
        <div className="max-width padding-initial mt-32 align-justify">
          {documentToReactComponents(props.data.post.body.json, options)}{" "}
        </div>
      </div>
      <div className="">
        <div className="max-width padding-initial">
          <HyvorTalk.Embed websiteId={277} id={props.data.post.slug} />
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost
