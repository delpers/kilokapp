import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export const query = graphql`
  query($slug: String!) {
    page: contentfulPages(slug: { eq: $slug }) {
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
      <SEO title={props.data.page.title} />

      <div className="w-screen p-120-0 padding-bottom-none">
        <div className="max-width padding-initial padding-bottom-none padding-top-none">
          <section>
            <h1>{props.data.page.title}</h1>
            <p className="mb-0"> {props.data.page.publishedDate}</p>
          </section>
        </div>
      </div>

      <div className="max-width padding-initial padding-bottom-none bg-w link justify mt-32 mb-32 init">
        {documentToReactComponents(
          props.data.page.body.json,
          options
        )}
      </div>
    </Layout>
  )
}

export default BlogPage
