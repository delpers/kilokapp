import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


const HomePage = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allContentfulCookingE {
          edges {
            node {
              title
              slug
              mediaE: childContentfulCookingEFeaturedImageJsonNode {
                secure_url
              }
            }
          }
        }
        allContentfulCookingB {
          edges {
            node {
              title
              slug
              mediaE: childContentfulCookingBFeaturedImageJsonNode {
                secure_url
              }
            }
          }
        }
        allContentfulCookingP {
          edges {
            node {
              title
              slug
              childContentfulCookingPFeaturedImageJsonNode {
                secure_url
              }
            }
          }
        }
        allContentfulCookingD {
          edges {
            node {
              title
              slug
              childContentfulCookingDFeaturedImageJsonNode {
                secure_url
              }
            }
          }
        }
        allContentfulBooster {
          edges {
            node {
              title
              slug
              childContentfulBoosterImageJsonNode {
                secure_url
              }
            }
          }
        }
        contentfulHome {
          titleHome
          descriptionHome
          mediaHome: childContentfulHomeHeroImageJsonNode {
            secure_url
          }
          pages {
            url
            title
          }
          titleBreakfast
          breakfastDescription
          descriptionEntrances
          titleEntrances
          titleDishes
          titleDesserts
          titleBoosters
        }
      }
    `
  )
  return (
    <Layout>
      <SEO title="Accueil" />
<div className="w-screen p-120-0" style={{
          backgroundImage:
            "url(" +
            data.contentfulHome.mediaHome
              .secure_url +
            ")",
        }}> 
      <div className="m-w p-i pb-0"
        
      >
        <section>
          <h1 className="w-50">{data.contentfulHome.titleHome}</h1>
          <p className="mb-0">{data.contentfulHome.descriptionHome}</p>
        </section>
      </div>

      </div>


      <div className="mb-32 sticky b-solid-b">      
        <nav className="pt-15 m-w p-i">
        {data.contentfulHome.pages.map(Pages => (
              <a
                className="i-link fs-16 b-b-g mr-15 font-bold"
                href={Pages.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {Pages.title}
              </a>
            ))}
        </nav>
 
        </div>




<div className="m-w p-i pb-0 bg-w ">

<div>
  <h3 className="mb-0 fs-36 pb-4">{data.contentfulHome.titleBreakfast}</h3>
  <span className="fs-18 text-gray">{data.contentfulHome.breakfastDescription}</span>
</div>
<div className="sr-cards">
  {data.allContentfulCookingB.edges.map(edge => {
    return (
      <div className="mr-32 mr-32 shadow-sm" key={edge.node.id}>
        <div

          className="media shadow-sm"
          style={{
            backgroundImage:
              "url(" +
              edge.node.mediaE
                .secure_url +
              ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "205px",
            width: "325px",
            borderRadius: "0",
          }}
        >
          <span class="mask-thumb-h">
            <span className="mt-10-b">
              <Link
                className="i-link fs-16 b-b-g mr-15 font-bold c-t"
                to={`/breakfast/recettes/${edge.node.slug}/`}
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






























        <div className="m-w p-i pb-0 bg-w ">

        <div>
          <h3 className="mb-0 fs-36 pb-4">{data.contentfulHome.titleEntrances}</h3>
          <span className="fs-18 text-gray">{data.contentfulHome.descriptionEntrances}</span>

        </div>
        <div className="sr-cards">
          {data.allContentfulCookingE.edges.map(edge => {
            return (
              <div className="" key={edge.node.id}>
                <div
                  className=""
                  style={{
                    backgroundImage:
                      "url(" +
                      edge.node.mediaE
                        .secure_url +
                      ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "205px",
                    width: "325px",
                    borderRadius: "0",
                  }}
                >


<span class="mask-thumb-h">
            <span className="mt-10-b">
              <Link
                className="i-link fs-16 b-b-g mr-15 font-bold c-t"
                to={`/recettes/${edge.node.slug}/`}
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









        <div className="m-w p-i pb-0 bg-w ">


        <div className="">
          <h3 className="mb-0 fs-36">{data.contentfulHome.titleDishes}</h3>
        </div>
        <div className="sr-cards">
        {data.allContentfulCookingP.edges.map(edge => {
            return (
              <div className="" key={edge.node.id}>
                <div
                  className=""
                  style={{
                    backgroundImage:
                      "url(" +
                      edge.node.childContentfulCookingPFeaturedImageJsonNode
                        .secure_url +
                      ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "200px",
                    width: "320px",
                    borderRadius: "0",
                  }}
                >


<span class="mask-thumb-h rounded">
            <span className="mt-10-b">
              <Link
                className="i-link fs-16 b-b-g mr-15 font-bold c-t"
                to={`/dishes/recettes/${edge.node.slug}/`}
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








        <div className="m-w p-i pb-0 bg-w ">


        <div className="">
          <h3>{data.contentfulHome.titleDesserts}</h3>
        </div>
        <div className="sr-cards">
        {data.allContentfulCookingD.edges.map(edge => {
            return (
              <div className="" key={edge.node.id}>
                <div
                  className=""
                  style={{
                    backgroundImage:
                      "url(" +
                      edge.node.childContentfulCookingDFeaturedImageJsonNode
                        .secure_url +
                      ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "200px",
                    width: "320px",
                    borderRadius: "0",
                  }}
                >
        

<span class="mask-thumb-h rounded">
            <span className="mt-10-b">
              <Link
                className="i-link fs-16 b-b-g mr-15 font-bold c-t"
                to={`/desserts/recettes/${edge.node.slug}/`}
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




        <div className="m-w p-i pb-0 bg-w ">


        <div className="">
          <h3>{data.contentfulHome.titleBoosters}</h3>
        </div>
        <div className="sr-cards">
        {data.allContentfulBooster.edges.map(edge => {
            return (
              <div className="" key={edge.node.id}>
                <div
                  className=""
                  style={{
                    backgroundImage:
                      "url(" +
                      edge.node.childContentfulBoosterImageJsonNode.secure_url +
                      ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "200px",
                    width: "320px",
                    borderRadius: "0",
                  }}
                >
            

<span class="mask-thumb-h rounded">
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