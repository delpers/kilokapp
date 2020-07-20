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

    <div className="mask-thumb-cat padding-50-0">
      <div className="max-width padding-initial padding-bottom-none padding-top-none">
        <h1>Que recherchez-vous ?</h1>
        <p className="mb-0">
          Recherche des recettes, ainsi que des références.
        </p>
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
