import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      marginBottom: `0`,
      background: 'white',
      width: `100%`,
      position: `relative`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1275,
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
        <Link className="fl-r i-link fs-16 b-b-g mr-15 font-bold  p-8" to="/search"> <i class="fas fa-search"></i> 
</Link>
        <Link className="fl-r i-link fs-16 b-b-g mr-15 font-bold  p-8" to="/print-list"> <i class="fas fa-print mr-8"></i>
 Recipes List
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
