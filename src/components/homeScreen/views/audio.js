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
            <Link to="/audio"> <i className="fas fa-volume-up color-audio margin-right-icon"></i> Méditation</Link>
            <Link to="/podcasts"> <i className="fas fa-podcast color-podcats margin-right-icon"></i> Podcasts</Link>

            </>
          )
      }}
    />
  )
}
