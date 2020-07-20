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
            <div className="dif mt-10 mb-15">
              <Link to="/audio" className="button_pw  ">
                Bibliothèque numérique
              </Link>
            </div>
          )
      }}
    />
  )
}
