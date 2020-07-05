import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { logout } from "../utils/firebase"

import UserContext from "./UserContext"
const logoutUser = async () => {
  await logout()
    .then(() => {})
    .catch(error => {
      alert(error.message)
    })
}
const Header = ({ siteTitle }) => {
  const { user } = useContext(UserContext)
  return (
    <header className="bsh shadow-sm">
      <div className="m-w p-i pb-0 pt-0 header">
      <Link className="logoHome" to="/">Doshi</Link>
        

      <div class="_1fmnqpr"></div>
        <nav className="_vuzcgs">  {!user && <Link className="navLink"to="/login">Connexion</Link>}

{user && <Link className="navLink" to="/user">Mon compte</Link>} </nav>
        
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
