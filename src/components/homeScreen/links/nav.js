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
        <div className="sticky m-b-plus">
          <nav className="">
            {data.home.pages.map(Pages => (
              <Link
                className="i-link color-white font-size-16 b-b-g margin-right-qz font-bold"
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
