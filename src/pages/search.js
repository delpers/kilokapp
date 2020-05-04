import React from "react"
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import PostPreview from "../components/post-preview"
import Layout from "../components/layout"
import SEO from "../components/seo"

const searchClient = algoliasearch('ROZVIIUYQG', '0a7d5fe8113aaa7a96d869e99fbd9619');


const NotFoundPage = () => (
  <Layout>
    <SEO title="Recherche" />

    <div className="w-screen p-120-0"> 
      <div className="m-w p-i pb-0 pt-0"
        
      >
        <section>
          <h1 className="w-50">Recherche</h1>
          <p className="mb-0">Recherche</p>
        </section>
      </div>

      </div>


   
<div class="m-w p-i pb-0 bg-w "> 
    <InstantSearch searchClient={searchClient} indexName="KILOKA_SEARCH">
    <SearchBox />
    <Hits hitComponent={PostPreview} />
  </InstantSearch></div>

  </Layout>
)

export default NotFoundPage
