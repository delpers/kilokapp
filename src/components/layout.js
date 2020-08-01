import React, { useContext } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import UserContext from "./UserContext"
import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const { loading } = useContext(UserContext)
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  if (loading) return <div className="pfl">Chargement...</div>
  else
    return (
      <div className="body">
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="">
          <main>{children}</main>
        </div>

        <div className="footer-padding-grid border-top background-white">



          <footer className="m-w p-i footer-grid">
         
         
          <div className="align-center">© {new Date().getFullYear()} Kiloka Nutrition France.  Fait à Saint-Brieuc et São Paulo.</div>


          <div><Link className="bold" to="/legal" >Légal</Link></div>
          </footer>
    

          
        </div>


      </div>
    )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
