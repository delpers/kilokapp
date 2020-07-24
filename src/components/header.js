import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import UserContext from "./UserContext"

const Header = ({ siteTitle }) => {
  const { user } = useContext(UserContext)
  return (

    <header className="uk-background-default border-bottom">
      <div>
        <div class="nav max-width flow-root">
          <input type="checkbox" id="nav-check" />
          <div class="nav-header">
            <div class="nav-title">
              <Link to="/" className="uk-navbar-item uk-logo bold">
                kiloka.io
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
            {!user && <Link className="color-blue" to="/login"> Connexion</Link>}
            {!user && <Link className="color-blue"  to="/addu"> S'inscrire</Link>}
            {user && <Link className="color-blue"  to="/user"> Mon compte</Link>}
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
