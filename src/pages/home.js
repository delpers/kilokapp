import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HeroScreen from "../components/heroScreen"
import StickyNav from "../components/homeScreen/links/nav"
import Breakfasts from "../components/homeScreen/views/breakfasts"
import Entry from "../components/homeScreen/views/entry"
import Dishes from "../components/homeScreen/views/dishes"
import Desserts from "../components/homeScreen/views/desserts"



const HomePage = () => {
  const data = useStaticQuery(
    graphql`
      query {
       
        
       
     
        allContentfulBoosters {
          edges {
            node {
              title
              slug
            }
          }
        }
        contentfulHomePage {
          
        
          titleBoosters
          descriptionBoosters
        }
      }
    `
  )
  return (
    <Layout>
      <SEO title="Accuceil" />

      <HeroScreen />
      
      <StickyNav />

      <Breakfasts />
    
      <Entry />

      <Dishes />

      <Desserts />


    


      <div className="m-w p-i pb-0 bg-w ">
        <div className="">
          <h3 className="mb-0 fs-32 pb-4">
            {data.contentfulHomePage.titleBoosters}
          </h3>
          <span className="fs-18 text-gray">
            {data.contentfulHomePage.descriptionBoosters}
          </span>
        </div>
        <div className="sr-cards">
          {data.allContentfulBoosters.edges.map(edge => {
            return (
              <div className="" key={edge.node.id}>
                <div className="">
                  <span className="mask-thumb-h rounded">
                    <span className="mt-10-b">
                      <Link
                        className="i-link fs-16 b-b-g mr-15 font-bold c-t"
                        to={`/booster/${edge.node.slug}/`}
                      >
                        {edge.node.title}
                      </Link>
                    </span>
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
