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
            nameValue
          }
        }
      `}
      render={data => {
        if (premium)
          return (
            <>
            <Link to="/audio">Méditation</Link>
            <Link to="/podcasts">Podcasts</Link>

            </>
          )
      }}
    />
  )
}
