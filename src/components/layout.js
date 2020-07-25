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
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="">
          <main>{children}</main>
        </div>

        <div className="footer-padding-grid border-top background-white">



          <footer className="m-w p-i footer-grid">
            <div className=" margin-bottom ">
              <div className="  small bold ">
                Entreprise
              </div>

              <Link className="i-link   db  " to="/page/about">
                A propos
              </Link>
              <Link className="i-link    db  " to="/page/mentions-legales">
                Offres d'emploi
              </Link>
            </div>
            <div className=" margin-bottom ">
              <div className="  small bold ">
                Communautés
              </div>

              <Link className="i-link   db  " to="/">
                Investisseurs
              </Link>
            </div>
            <div className=" margin-bottom ">
              <div className="  small  bold ">
                Liens utiles
              </div>

              <a
                className="i-link    db  "
                target="_bank"
                href="https://www.facebook.com/kilokafr"
              >
                Facebook
              </a>

              <a
                className="i-link    db  "
                target="_bank"
                href="https://www.instagram.com/kilokafr/"
              >
                Instagram
              </a>
            </div>
            <div className=" margin-bottom ">
              <div className="  small bold ">
                Légales
              </div>
              <Link className="i-link    db  " to="/page/privacy-policy">
                Politique de confidentialité
              </Link>{" "}
              <Link className="i-link    db  " to="/page/cgu">
                Conditions générales d'utilisation
              </Link>
              <Link className="i-link    db  " to="/page/mentions-legales">
                Légal
              </Link>{" "}
            </div>

          </footer>
    

          
        </div>


        <div className="background-white">
              <div className="m-w p-i padding-content">

                © {new Date().getFullYear()}, {` `}
                <a className="i-link  " href="https://kiloka.io/">
                  Kiloka Nutrition France
                </a>
              </div>

            </div>
      </>
    )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
