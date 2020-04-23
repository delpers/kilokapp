import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      marginBottom: `0`,
      width: `100%`,
      position: `absolute`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1120,
        padding: `1.80rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }} className="text-xl font-bold">
        <Link
          to="/"
          className="icon"
          style={{
            color: `initial`,
            textDecoration: `none`,
          }}
        >
          K
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
