import React from "react"
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import PostPreview from "../components/post-preview"
import Layout from "../components/layout"
import styled from "@emotion/styled"
import SEO from "../components/seo"

const searchClient = algoliasearch('ROZVIIUYQG', '0a7d5fe8113aaa7a96d869e99fbd9619');

const Background = styled.div`
  background: #f8f8f8;
`

const NotFoundPage = () => (
  <Background>

  <Layout>
    <SEO title="Recherche" />

    <div className="w-screen p-120-0"> 
      <div className="m-w p-i pb-0 pt-0"
        
      >
        <section>
          <h1 className="w-50">Que recherchez-vous ?</h1>
          <p className="mb-0">Recherche des recettes, ainsi que des références.</p>
        </section>
      </div>

      </div>


   
<div class="m-w p-i pb-0  "> 
    <InstantSearch searchClient={searchClient}   indexName="KILOKA_SEARCH" >
    <SearchBox
  submit={ <span>Recherche</span> }   reset={ <i class="fas fa-times"></i> }  translations={{
    placeholder: 'Soupes...',
  }}
/>
    <Hits hitComponent={PostPreview} />
  </InstantSearch></div>

  </Layout>
  </Background>

)

export default NotFoundPage
