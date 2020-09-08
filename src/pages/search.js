import React from "react"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom"
import SearchPreview from "../components/search-preview"
import Layout from "../components/layout"
import SEO from "../components/seo"

const searchClient = algoliasearch(
  "ROZVIIUYQG",
  "0a7d5fe8113aaa7a96d869e99fbd9619"
)

const SearchPage = () => (
  <Layout>
    <SEO title="Recherche" />

    <div className="hero">
      <div className="m-w p-i">
        <h1 className="hero-title bold bottom-none">Que recherchez-vous ?</h1>

      </div>
    </div>

    <div className="max-width padding-initial padding-bottom-none  ">
      <InstantSearch searchClient={searchClient} indexName="KILOKA_SEARCH">
        <SearchBox
          submit={<span>Recherche</span>}
          reset={<i className="fas fa-times"></i>}
          translations={{
            placeholder: "Soupes...",
          }}
        />
        <Hits hitComponent={SearchPreview} />
      </InstantSearch>
    </div>
  </Layout>
)

export default SearchPage
