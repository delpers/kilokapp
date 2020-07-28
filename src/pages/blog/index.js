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

      <div className="k-grid m-w p-i padding-content">
        {data.blog.edges.map(edge => {
          return (
              <div className="background-white margin-bottom k-grid-margin shadow" key={edge.node.id}>

<div>
<img src={edge.node.media.secure_url}
                alt={edge.node.title}
              />            </div>

<div className="padding">
                <h3> <Link
                className="blog-title"
                to={`/blog/${edge.node.slug}/`}
              >
                {edge.node.title}
              </Link></h3>
                <p> {edge.node.ePost.excerpt}</p>

                <Link className="i-link db color-blue bold" to={`/blog/${edge.node.slug}/`}>
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
