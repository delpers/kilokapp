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
      <div className="b-solid-top bg-black color-w p-100-0">
        <footer className="p-32 fs-16 m-w p-i footer-gr">
         

          <div className="color-w">
            
          <div className="color-w uppercase fs-14 bold font-bold mb-32">Entreprise</div>

<Link className="i-link color-w db mb-15" to="/page/about">
          A propos
          </Link>
          <Link className="i-link  color-w db mb-15" to="/page/mentions-legales">
          Offres d'emploi
          </Link>
          
        
          
          
          
          </div>
         <div className="color-w">
           
         <div className="color-w uppercase fs-14 bold font-bold mb-32">Communautés</div>


 <Link className="i-link color-w db mb-15" to="/page/mentions-legales">
          Investisseurs
          </Link>
          </div>
         <div className="color-w">

         <div className="color-w uppercase fs-14 bold font-bold mb-32">Liens utiles</div>

         <a className="i-link  color-w db mb-15" target="_bank" href="https://www.facebook.com/kilokafr">
          Facebook
          </a>
          
          <a className="i-link  color-w db mb-15" target="_bank"  href="https://www.instagram.com/kilokafr/">
          Instagram
          </a>
         </div>
         <div className="color-w">
           
         <div className="color-w uppercase fs-14 bold font-bold mb-32">Légales</div>

<Link className="i-link  color-w db mb-15" to="/page/mentions-legales">
            Mentions légales
          </Link>  <Link className="i-link  color-w db mb-15" to="/page/mentions-legales">
          Confidentialité
          </Link>
          
       
          
          </div>
         <p> © {new Date().getFullYear()}, {` `}
          <a className="i-link color-w" href="https://kiloka.io/">
            Kiloka France
          </a></p>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
