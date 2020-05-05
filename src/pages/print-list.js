import React from "react"
import algoliasearch from 'algoliasearch/lite';
import Layout from "../components/layout"
import styled from "@emotion/styled"
import SEO from "../components/seo"


const Background = styled.div`
  background: #f8f8f8;
`

const PrintPage = () => (
  <Background>

  <Layout>
    <SEO title="Recherche" />

    <div className="w-screen p-120-0"> 
      <div className="m-w p-i pb-0 pt-0"
        
      >
        <section>
          <h1 className="w-50">Impression</h1>
          <p className="mb-0">Imprimerie des références.</p>
        </section>
      </div>

      </div>

<div class="row m-w pt-0i mt-32">

<table id="customers">
  <tr>
    <th>Nom</th>
    <th>ID M</th>
    <th>Temps de préparation</th>
  </tr>
  <tr>
    <td>Recette 1</td>
    <td><i className="fas fa-file-medical-alt c-green mr-8"></i> R874 </td>
    <td>

    <span className="fs-14 bg-blue mr-p">
                <i className="fas fa-check-circle"></i> 45min
              </span>


    </td>
  </tr>
  
  <tr>
    <td>Recette 2</td>
    <td><i className="fas fa-file-medical-alt c-green mr-8"></i> R400 </td>
    <td>

    <span className="fs-14 bg-blue mr-p">
                <i className="fas fa-check-circle"></i> 22min
              </span>


    </td>
  </tr>
  <tr>
    <td>Recette 3</td>
    <td><i className="fas fa-file-medical-alt c-green mr-8"></i> R240 </td>
    <td>

    <span className="fs-14 bg-blue mr-p">
                <i className="fas fa-check-circle"></i> 18min
              </span>


    </td>
  </tr>
</table>



</div>

  </Layout>
  </Background>

)

export default PrintPage
