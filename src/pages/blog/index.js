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

      <div className="k-grid" uk-grid>
        {data.blog.edges.map(edge => {
          return (
              <div className="card-shadow margin-bottom" key={edge.node.id}>

<div className="uk-card-media-top">
<img src={edge.node.media.secure_url}
                alt={edge.node.title}
              />            </div>

<div className="uk-card-body">
                <h3 className="uk-card-title"> <Link
                className="p-0-24 blog-title font-bold i-link"
                to={`/blog/${edge.node.slug}/`}
              >
                {edge.node.title}
              </Link></h3>
                <p> {edge.node.ePost.excerpt}</p>

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
