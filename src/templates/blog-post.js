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


<article className="uk-article">
<img
          className=""
          src={props.data.post.picture.secure_url}
          alt={props.data.post.title}
        />

<h1 className="uk-article-title">{props.data.post.title}</h1>



    <p className="uk-text-lead">{documentToReactComponents(props.data.post.body.json, options)}</p>


</article>


      <div className="">
        <div className="max-width padding-initial">
          <HyvorTalk.Embed websiteId={277} id={props.data.post.slug} />
        </div>
      </div>






    </Layout>
  )
}

export default BlogPost
