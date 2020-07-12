import { Link } from "gatsby"
import React from "react"

const Legal = ({ }) => (
  <div className="mt-20">
    <p class="font-size-16">
      <span>
        En cliquant sur le bouton d'inscription, vous acceptez les{" "}
        <Link class="font-bold" to="/page/cgu" target="_blank">
          Conditions générales d'utilisation
        </Link>{" "}
        de Kiloka.
      </span>
    </p>
    <p class="font-size-16">
      <span>
        Pour en savoir plus sur la façon dont Kiloka utilise vos données
        personnelles, veuillez consulter la{" "}
        <Link class="font-bold" to="/page/privacy-policy">
          Politique de confidentialité
        </Link>{" "}
        de Kiloka.
      </span>
    </p>
  </div>
)

export default Legal
