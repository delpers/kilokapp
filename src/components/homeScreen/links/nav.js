import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import MediaLinks from "./links"

export default function hNavigation() {
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
        <div className="sticky b-solid-b">
          <nav className="pt-15 m-w p-i">
            {data.home.pages.map(Pages => (
              <Link
                className="i-link fs-16 b-b-g mr-15 font-bold"
                to={Pages.url}
                target="_bank"
                key={Pages.id}
              >
                {Pages.title}
              </Link>
            ))}

            <MediaLinks />
          </nav>
        </div>
      )}
    />
  )
}
