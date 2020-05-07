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
      style={{
        margin: `0 auto`,
        maxWidth: 1140,
        padding: `1.6rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }} className="text-xl font-bold">
        <Link
          to="/"
          alt={siteTitle}
          className="icon"
          style={{
            color: `initial`,
            textDecoration: `none`,
          }}
        >
          kiloka
        </Link>
        <Link
          className="fl-r i-link fs-16 b-b-g mr-15 font-bold  p-8"
          to="/search"
        >
          {" "}
          <i className="fas fa-search"></i>
        </Link>
      </h1>
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
