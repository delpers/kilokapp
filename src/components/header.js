import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"


const Header = ({ siteTitle }) => (
  <header 
    style={{
      marginBottom: `0`,
      background: "transparent",
      width: `100%`,
      position: `absolute`,
    }}
  >
    <div 
    className="css-15qsopm"
      style={{
        margin: `0 auto`,
        maxWidth: 1090,
        padding: `1.6rem 1.0875rem`,
      }}
    >

      <div className="css-ok35s6 ">
      <h1 style={{ margin: 0 }} className="text-xl font-bold">
        <Link
          to="/"
          alt={siteTitle}
          style={{
            color: `initial`,
            textDecoration: `none`,
            maxWidth: "50%",

          }}
        >
          <p className="_logo mb-0"></p>
        </Link>
       
      </h1>
      </div>
      <div className="css-ok35s6 end">

      <h1 style={{ margin: 0 }} className="text-xl font-bold">


      <Link
          className="fl-r i-link fs-16 b-b-g mr-15 font-bold  p-8"
          to="/search"

        >
          {" "}
          <i className="fas fa-search lgw"></i>
        </Link>      </h1>

        <Link className="btn_h" to="/login">
          Connexion
          </Link>

          <Link className="btn_h_r" to="/register">
          Inscription
          </Link>
        </div>

    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
