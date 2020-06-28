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
import Calandar from "../components/homeScreen/views/month"
import Prenium from "../components/homeScreen/views/prenium"
import Audio from "../components/homeScreen/views/audio"

const HomePage = () => {
  return (
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

      <Audio />

      <Prenium />

    </Layout>
  )
}

export default HomePage
