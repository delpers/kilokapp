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
        background: "transparent",
        width: `100%`,
        position: `absolute`,
      }}
    >
      <div
        className="css-15qsopm"
        style={{
          margin: `0 auto`,
          maxWidth: 1164,
          padding: `24px 24px`,
        }}
      >
        <div className="css-ok35s6 ">
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
        <div className="css-ok35s6 end">
         
            {!user && (
              <Link to="/login" className="button_blue">
                Connexion
              </Link>
            )}
            {user && (
              <Link to="/user" className="button_blue nowrap">
                Mon compte
              </Link>
            )}
            {user && (
                  <button onClick={logoutUser} className="btnlogout">
                  <i class="fas fa-sign-out-alt"></i>
                  </button>
            )}
            
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
