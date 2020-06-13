import { Link } from "gatsby"
import React from "react"

const Prenium = ({ siteTitle }) => (
  <div className="bg_blue">
    <h1 className="prenium_title">Kiloka Explore </h1>
<h4 className="prenium_subtitle">Accès à toutes les recettes et programmes sportifs, sans publicité.</h4>


<div className="grp">

<div className="db"> 

    <Link to="/" className="button_pw db">Passer à Kiloka Premium</Link>

</div>
<div className="db"> 

        
          <Link to="/"
        className="button_reverse db">En savoir plus</Link>


</div>




</div>


    <div className="align-center mt-32">
        <span>

            <Link to="/cgv" className="cw fs-16">Offre soumise à nos Conditions générales d'utilisation.</Link>
        </span>
    </div>
  </div>
)

export default Prenium
