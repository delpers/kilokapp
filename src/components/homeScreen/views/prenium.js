import { Link } from "gatsby"
import React from "react"

const Prenium = ({ siteTitle }) => (
  <div className="bg_blue">
    <h1 className="fs-42 ">Explorez</h1>
    <h1 className="prenium_title pt-0">Choisissez l'offre qui vous convient</h1>


<div className="grp">

<div className="dif mt-10"> 

    <Link to="/" className="button_pw  ">Passer à Kiloka Premium</Link>

</div>
<div className="db"> 

        
          <Link to="/"
        className="button_reverse  color-black">En savoir plus</Link>


</div>




</div>


  </div>
)

export default Prenium
