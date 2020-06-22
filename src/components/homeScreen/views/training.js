import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

export default function Training() {
  return (
    <StaticQuery
      query={graphql`
        query {
            training: allContentfulTraining {
            edges {
              node {
                title
                slug
                nWeeks
                level
              }
            }
          }
          home: contentfulHomePage {
            title_trainings
            description_trainings
          }
        }
      `}
      render={data => (

        <div className=" pe-blue p-i pb-0   prog">


          
          <div className=" pt120 m-w p-i ">
            <h2 className="mw728 mb-0 fs-24 pb-4 title-m title-ble">{data.home.title_trainings} (Prenium)</h2>
            <p className="pl text-gray mw728 ">{data.home.description_trainings}</p>
          
          </div>



          <div className="sr-pe p-i">
            {
              data.training.edges.length>0 ? (
                data.training.edges.map((edge,i) => {
                  return (
                    <div className="mt-10 fs-16   box" key={i}>
                      
                        <span className=" nowrap i-link p-15 border radius">
                      
                          <Link
                              className="i-link fs-16 b-b-g mr-15  mb-15 nowrap"
                              to={`/training/${edge.node.slug}/`}
                            >
                              {edge.node.title}
                            </Link>
                            <span className="mt-10-b db-fb">
                            <i className="fas fa-heart ig mr-15"></i>{edge.node.level}
                          </span>
                          <span className="mt-10-b db-fb">
                          <i className="fas fa-calendar-week mr-15"></i> {edge.node.nWeeks} semaine(s)
                          </span>
                        
                        </span>
                      </div>
                  )
                })
              ) : (
                <div>La catégorie sera bientôt disponible</div>
              )
            
            }
          </div>
        </div>
      )}
    />
  )
}
