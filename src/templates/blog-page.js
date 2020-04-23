import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export const query = graphql`
  query($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      slug
      publishedDate(formatString: "Do MMMM, YYYY")
      body {
        json
      }
    }
  }
`
const BlogPage = props => {
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
      <SEO title={props.data.contentfulPage.title} />



      <div className="w-screen p-h"> 
      <div className="m-w p-i pb-0">
        <section>
        <h1>{props.data.contentfulPage.title}</h1>
          <p className="mb-0"> {props.data.contentfulPage.publishedDate}</p>
        </section>
      </div>

      </div>



      <div className="m-w p-i pb-0 bg-w fs-14 link justify mt-32">
    
        {documentToReactComponents(
          props.data.contentfulPage.body.json,
          options
        )}
      </div>
    </Layout>
  )
}

export default BlogPage