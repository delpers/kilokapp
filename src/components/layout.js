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
        <div>
          <main>{children}</main>
        </div>

        <div className="  border-top footer-padding-grid background-white">
          <footer className="padding-TT font-size-16 max-width padding-initial footer-grid">
            <div className=" ">
              <div className="  uppercase font-size-14 bold font-bold mb-32 ">
                Entreprise
              </div>

              <Link className="i-link   db mb-15" to="/page/about">
                A propos
              </Link>
              <Link className="i-link    db mb-15" to="/page/mentions-legales">
                Offres d'emploi
              </Link>
            </div>
            <div className=" ">
              <div className="  uppercase font-size-14 bold font-bold mb-32 ">
                Communautés
              </div>

              <Link className="i-link   db mb-15" to="/">
                Investisseurs
              </Link>
            </div>
            <div className=" ">
              <div className="  uppercase font-size-14 bold font-bold mb-32 ">
                Liens utiles
              </div>

              <a
                className="i-link    db mb-15"
                target="_bank"
                href="https://www.facebook.com/kilokafr"
              >
                Facebook
              </a>

              <a
                className="i-link    db mb-15"
                target="_bank"
                href="https://www.instagram.com/kilokafr/"
              >
                Instagram
              </a>
            </div>
            <div className=" ">
              <div className="  uppercase font-size-14 bold font-bold mb-32 ">
                Légales
              </div>
              <Link className="i-link    db mb-15" to="/page/privacy-policy">
                Politique de confidentialité
              </Link>{" "}
              <Link className="i-link    db mb-15" to="/page/cgu">
                Conditions générales d'utilisation
              </Link>
              <Link className="i-link    db mb-15" to="/page/mentions-legales">
                Légal
              </Link>{" "}
            </div>

            <div>
              <p className="">
                {" "}
                © {new Date().getFullYear()}, {` `}
                <a className="i-link  " href="https://kiloka.io/">
                  Kiloka France
                </a>
              </p>
            </div>
          </footer>
        </div>
      </>
    )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
