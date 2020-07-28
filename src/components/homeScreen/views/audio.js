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
            <>
            <Link to="/audio"> <i className="fas fa-volume-up color-green-sup"></i></Link>
            <Link to="/podcasts"> <i className="fas fa-podcast color-green"></i></Link>

            </>
          )
      }}
    />
  )
}
