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
            <div className="">
              <Link to="/audio" className="">
                Bibliothèque numérique
              </Link>
            </div>
          )
      }}
    />
  )
}
