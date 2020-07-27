import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import UserContext from "./UserContext"
import Navigation from "./homeScreen/links/nav"
import MediaLinks from "./homeScreen/links/links"

const Header = ({ siteTitle }) => {
  const { user } = useContext(UserContext)
  return (

    <header className="uk-background-default background-white">
        <div class="nav max-width flow-root">
          <input type="checkbox" id="nav-check" />
          <div class="nav-header">
            <div class="nav-title">
              <Link to="/" alt={siteTitle} className="uk-navbar-item uk-logo bold">
                <h1>Kiloka</h1>
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
            <MediaLinks />
            <Navigation />
            {!user && <Link to="/SignIn">Connexion</Link>}
            {user && <Link to="/Account"> <i class="fas fa-user"></i></Link>}
            {!user && <Link className="button--prenium" to="/SignIn">S'abonner</Link>}


            


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
