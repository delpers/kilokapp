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

        <div className="  border-top p-100-0 bg-w">
          <footer className="p-32 fs-16 m-w p-i footer-gr">
            <div className=" ">
              <div className="  uppercase fs-18 bold font-bold mb-32 ">
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
              <div className="  uppercase fs-18 bold font-bold mb-32 ">
                Communautés
              </div>

              <Link className="i-link   db mb-15" to="/">
                Investisseurs
              </Link>
            </div>
            <div className=" ">
              <div className="  uppercase fs-18 bold font-bold mb-32 ">
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
              <div className="  uppercase fs-18 bold font-bold mb-32 ">
                Légales
              </div>
              <Link className="i-link    db mb-15" to="/page/mentions-legales">
                Mentions légales
              </Link>{" "}
              <Link className="i-link    db mb-15" to="/page/rgpd">
                RGPD
              </Link>
              <Link className="i-link    db mb-15" to="/page/cgv">
                CGV
              </Link>
            </div>

            <div>
              <div className="kilokaFooter"></div>

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
