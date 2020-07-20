import { Link } from "gatsby"
import React from "react"

const Prenium = ({ siteTitle }) => (
  <div className="bg_blue">
    <h1 className="prenium_title padding-top-none">
      Kiloka vous aidera à atteindre vos objectifs !{" "}
    </h1>

    <div className="grp">
      <div className="dif mt-10">
        <Link to="/" className="button_pw  ">
          Passer à Kiloka Premium
        </Link>
      </div>
    </div>
  </div>
)

export default Prenium
