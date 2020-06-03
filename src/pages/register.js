import React from "react"
import Layout from "../components/layout"
import styled from "@emotion/styled"
import SEO from "../components/seo"


const Background = styled.div`
  background: #f8f8f8;
  .btn_h {
      display: none !important;
  }
  .btn_h_r {
    display: block !important;
}
`

const SearchPage = () => (
  <Background>
    <Layout>
      <SEO title="Recherche" />

      <div className="w-screen p-120-0">
        <div className="m-w p-i pb-0 pt-0">
          <section>
            <h1 className="w-50">Profitez de 1 mois de Kiloka Premium gratuits</h1>
            <p className="mb-0">
            Créez votre compte Kiloka pour accéder à de nombreux avantages            </p>
          </section>
        </div>
      </div>





      <div className="m-w p-i pb-0  ">


        <div className="_kilokapr mt-32 mb-32 ">

            <div className="brp">             <h2>Pourquoi passer à Premium ?</h2>
            <h3 className="fw300 fs18">Profitez de la totalité des catégories.</h3>
            <h3 className="fw300 fs18">Profitez d'un accompagnement personnalisé.</h3>
            <h3 className="fw300 fs18">Profitez pleinement des programmes sportifs.</h3>
 </div>

 <div>             <h2>FAQ</h2>

 <h3 className="fw300 fs18 font-bold">Comment annuler mon abonnement ?</h3>
<p className="fs14">Vous pouvez annuler votre abonnement à tout moment depuis votre compte.</p>


<h3 className="fw300 fs18 font-bold">Quand mon abonnement sera-t-il débité ?</h3>
<p className="fs14">À partir de la date de souscription, le montant de l'abonnement sera débité chaque mois, sauf en cas d'annulation.
Vous pouvez modifier la date avec nous si nécessaire.</p>




 </div>



        </div>



<div className="center">

<h1>Choisissez votre offre Kiloka Premium</h1>
        <p>Kiloka sans limites, votre enceinte et d'autres appareils.</p>
</div>
        
      </div>
    </Layout>
  </Background>
)

export default SearchPage
