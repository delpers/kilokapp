require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

const blogQuery = `
{
  allMarkdownRemark {
    nodes {
      id
      excerpt
    }
  }
  allContentfulRecipes {
    nodes {
      id
      slug
      childContentfulRecipesFeaturedImageJsonNode {
        secure_url
      }
      title
      numberOfPersons
      time
      for
      medicalNumber
    }
  }
}
`

const queries = [
  {
    query: blogQuery,
    transformer: ({ data }) => data.allContentfulRecipes.nodes, // optional
    indexName: process.env.ALGOLIA_INDEX_NAME, // overrides main index name, optional
  },
]

module.exports = {
  siteMetadata: {
    title: `Kiloka`,
    description: `- -`,
    author: `@kilokajs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `kilokajs`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        // Careful, no not prefix this with GATSBY_, since that way users can change
        // the data in the index.
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
        queries,
        chunkSize: 10000, // default: 1000
        settings: {
          // optional, any index settings
        },
        enablePartialUpdates: true, // default: false
        matchFields: ["slug", "modified"], // Array<String> default: ['modified']
      },
    },
  ],
}
