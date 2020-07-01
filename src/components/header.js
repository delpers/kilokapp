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
    <header
      style={{
        marginBottom: `0`,
        background: "#000",
        width: `100%`,
        position: `relative`,
      }}
    >
      <div
        className="css-15qsopm"
        style={{
          margin: `0 auto`,
          maxWidth: 1164,
          padding: `24px 24px`,
          display: "flex",

        }}
      >
        <div className="c">
          <h1 style={{ margin: 0 }} className="text-xl font-bold">
            <Link
              to="/"
              alt={siteTitle}
              style={{
                color: `initial`,
                textDecoration: `none`,
                maxWidth: "50%",
              }}
            >
              <p className="_logo mb-0"></p>
            </Link>
          </h1>
        </div>
         
          <div>
          <ul>
             <li className="svelte-4ldyho">
             {!user && (
              <Link to="/login" className="link_h">
                Connexion
              </Link>
            )}
            {user && (
              <Link to="/user" className="link_h">
                Mon compte
              </Link>
            )}
             </li>
           </ul>
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
