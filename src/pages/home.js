import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HeroScreen from "../components/heroScreen"
import StickyNav from "../components/homeScreen/links/nav"
import Breakfasts from "../components/homeScreen/views/breakfasts"
import Entry from "../components/homeScreen/views/starters"
import Dishes from "../components/homeScreen/views/plats"
import Desserts from "../components/homeScreen/views/desserts"
import Boosters from "../components/homeScreen/views/boosters"
import Training from "../components/homeScreen/views/training"
import styled from "@emotion/styled"

const Custom = styled.div`
  header {
    position: absolute !important;
    background: none !important;
    box-shadow: none !important;
    width: 100%;
  }.logoHome {
    color: white !important;
  }.navLink {
    background: white;
padding: 15px 24px;
border-radius: 6px;
  }

`






const HomePage = () => {
  return (
    <Custom>  
    <Layout>
      <SEO title="Accueil" />
      <HeroScreen /> 

      <StickyNav />

      <Breakfasts />

      <Entry />


      <Dishes />

      <Desserts />

      <Boosters />

      <Training />



    </Layout>
    </Custom>
  )
}

export default HomePage
