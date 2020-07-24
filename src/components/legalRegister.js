import { Link } from "gatsby"
import React from "react"

const Legal = ({}) => (
  <div>
    <p className="size-initial">
        En cliquant sur le bouton d'inscription, vous acceptez les{" "}
        <Link className="color-blue" to="/page/cgu">
          Conditions générales d'utilisation.
        </Link>
    </p>
    <p className="size-initial">
        Pour en savoir plus sur la façon dont nous utilisons vos données
        personnelles, veuillez consulter la{" "}
        <Link className="color-blue" to="/page/privacy-policy">
          Politique de confidentialité.
        </Link>
    </p>
  </div>
)

export default Legal
