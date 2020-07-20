import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import UserContext from "./UserContext"

const Header = ({ siteTitle }) => {
  const { user } = useContext(UserContext)
  return (
    <header className="welcome">
      <div className="max-width padding-initial padding-bottom-none padding-top-none header">
        <Link className="logo-home-page" to="/">
          Name
        </Link>

        <div class="space"></div>
        <nav className="right">
          {" "}
          {!user && (
            <Link className="navLink" to="/login">
              Connexion
            </Link>
          )}
          {user && (
            <Link className="navLink" to="/user">
              Mon compte
            </Link>
          )}{" "}
        </nav>
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
