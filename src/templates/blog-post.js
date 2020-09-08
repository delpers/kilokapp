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

<div>
<div className="m-w p-i article"><h1>{props.data.post.title}</h1>
</div>

      <img
          className="image-blog"
          src={props.data.post.picture.secure_url}
          alt={props.data.post.title}
        />


<div className="m-w p-i article">





    <p>{documentToReactComponents(props.data.post.body.json, options)}</p>


</div>

<div className="padding-content border-top">


<div className="m-w p-i ">
          <HyvorTalk.Embed websiteId={397} id={props.data.post.slug} />
        </div>

</div>
       





</div>

    </Layout>
  )
}

export default BlogPost
