import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import UserContext from "./UserContext"
import Navigation from "./homeScreen/links/nav"
import MediaLinks from "./homeScreen/links/links"
import CustomLink from "./homeScreen/views/CustomLink"

const Header = ({ siteTitle }) => {
  const { user } = useContext(UserContext)
  return (

    <header className="uk-background-default background-white">
        <div class="nav max-width flow-root">
          <input type="checkbox" id="nav-check" />
          <div class="nav-header">
            <div class="nav-title">
              <Link to="/" alt={siteTitle} className="uk-navbar-item uk-logo">
                <h1 className="log-title bottom-none bold">helpquit</h1>
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
            <CustomLink />
            <MediaLinks />

            {!user && <Link to="/SignIn">Connexion</Link>}
            {!user && <Link className="button-user" to="/SignUp">Offre Premium</Link>}
            {user && <Link className="button-user" to="/Account">Mon compte </Link>}

            <Link className = "button-user" to = "/AddProduct">Add Product </Link>
            


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
