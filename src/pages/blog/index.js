import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Blog = () => {
  const data = useStaticQuery(
    graphql`
      query {
        blog: allContentfulBlogPost(
          sort: { fields: publishedDate, order: DESC }
        ) {
          edges {
            node {
              title
              id
              slug
              ePost: childContentfulBlogPostExcerptTextNode {
                excerpt
              }
              media: childContentfulBlogPostFeaturedImageJsonNode {
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

      <div className="mask-thumb-cat p-50-0">
      <div className="max-width padding-initial padding-bottom-none padding-top-none  " >
            <h1>Blog</h1>
        </div>
      </div>

     
      

      <div className="blogPost blogPost-mobile max-width padding-initial">
        {data.blog.edges.map(edge => {
          return (
            <div className="shadow-sm rounded mb-32" key={edge.node.id}>
              <img
                className="featured"
                src={edge.node.media.secure_url}
                alt={edge.node.title}
              />
                <Link
                  className="p-0-24 blog-title font-bold i-link"
                  to={`/blog/${edge.node.slug}/`}
                >
                  {edge.node.title}
                </Link>
              <p className="text-gray text-base justify p-0-24">
                {edge.node.ePost.excerpt}
              </p>
              <div className="b-solid-top p-24 text-base font-bold">
                <Link className="i-link" to={`/blog/${edge.node.slug}/`}>
                  En savoir plus
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default Blog
