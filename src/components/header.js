import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import UserContext from "./UserContext"
import Navigation from "./homeScreen/links/nav"

const Header = ({ siteTitle }) => {
  const { user } = useContext(UserContext)
  return (

    <header className="uk-background-default border-bottom background-white">
      <div>
        <div class="nav max-width flow-root">
          <input type="checkbox" id="nav-check" />
          <div class="nav-header">
            <div class="nav-title">
              <Link to="/" alt={siteTitle} className="uk-navbar-item uk-logo bold">
                <div className="logo"></div>
              </Link>
            </div>
          </div>
          <div class="nav-btn">
            <label for="nav-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>

          <div class="nav-links">
            <Navigation />
            {!user && <Link to="/SignIn"> Connexion</Link>}
            {user && <Link to="/Account"> <i class="fas fa-user"></i></Link>}
          </div>
        </div>
      </div>
    </header>

  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
