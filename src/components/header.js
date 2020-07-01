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
    <header className="header">
      <div className="">
      <Link to="/"><h1>Yuko</h1></Link>
        


        <nav>  {!user && <Link to="/login">Connexion</Link>}

{user && <Link to="/user">Mon compte</Link>} </nav>
        
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
