import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import UserContext from "./UserContext"

const Header = ({ siteTitle }) => {
  const { user } = useContext(UserContext)
  return (
    <header className="uk-background-default border-bottom">

    <div className="uk-container uk-container-expand">

<nav className="uk-navbar">

<div className="uk-navbar-left">


  <Link to="/" className="uk-navbar-item uk-logo bold">kiloka.io</Link>
</div>

<div className="uk-navbar-item">





{!user && (

 <Link to="/login"> <button class="uk-button uk-button-default border radius">  Connexion            </button>

              
            </Link>
   
          
          )}



          {user && (
 <Link to="/user"> <button class="uk-button uk-button-default border radius">  Mon compte            </button>

              
 </Link>






          )}{" "}



</div>


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
