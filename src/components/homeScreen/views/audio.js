import React, { useContext } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import UserContext from "../../../components/UserContext"

export default function Audio() {
  const { premium } = useContext(UserContext)
  return (
    <StaticQuery
      query={graphql`
        query {
          home: contentfulHomePage {
            title_audio
            description_audio
          }
        }
      `}
      render={data => {
        if (premium)
          return (
            <div className="bg-top">
            <div className="bg_audio">
              <h1 className="prenium_title pt-0">
                {" "}
                {data.home.title_audio} L'esprit clair !{" "}
              </h1>
              <p>
                {data.home.description_audio} L'esprit clair avec des programmes nombreux et variés.
              </p>

              <div className="grp">
                <div className="dif mt-10">
                  <Link to="/audio" className="button_pw  ">
                    Méditer
                  </Link>
                </div>
              </div>
            </div></div>
          )
      }}
    />
  )
}
