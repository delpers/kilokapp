import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HeroScreen from "../components/heroScreen"
import Breakfasts from "../components/homeScreen/views/breakfasts"
import Entry from "../components/homeScreen/views/starters"
import Product from "../components/homeScreen/views/product"
import AddProduct from "../pages/AddProduct"
import Desserts from "../components/homeScreen/views/desserts"
import Search from "../components/homeScreen/views/search"
import Training from "../components/homeScreen/views/training"

const HomePage = () => {
  return (
    <Layout>
      <SEO title="Accueil" />
      <AddProduct/>
      
    </Layout>
  )
}

export default HomePage