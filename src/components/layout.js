import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div>
        <main>{children}</main>
      </div>

      <footer className="b-solid-top p-32 fs-16">
        © {new Date().getFullYear()}, {` `}
        <a className="i-link font-bold" href="https://kiloka.io/">
          Kiloka France
        </a>
        <Link className="i-link font-bold ml-15" to="/page/mentions-legales">
          Mentions légales
        </Link>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
