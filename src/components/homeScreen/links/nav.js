import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

export default function Navigation() {
  return (
    <StaticQuery
      query={graphql`
        query {
          home: contentfulHomePage {
            pages {
              url
              title
              id
            }
          }
        }
      `}
      render={data => (
        <>
            {data.home.pages.map(Pages => (
              <Link
                to={Pages.url}
                target="_bank"
                key={Pages.id}
              >
                {Pages.title}
              </Link>
            ))}
        </>
      )} 
    /> 
  )
}
