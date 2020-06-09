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
                picture: childContentfulTrainingImageJsonNode {
                  secure_url
                }
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

        <div className=" pe-blue p-i pb-0 pt-m-32 nowrap prog">
          <div className="m-w p-i pb-0 pt-m-32 ">
            <h4 className="mb-0 fs-24 pb-4 title-m">{data.home.title_trainings} (Prenium)</h4>
            <span className="fs-18 text-gray dn-m">{data.home.description_trainings}</span>
          
          </div>



          <div className="sr-pe">
            {
              data.training.edges.length>0 ? (
                data.training.edges.map((edge,i) => {
                  return (
                    <div className="mt-10 fs-16   box" key={i}>
                      <div
                        className="sr-media"
                        style={{
                          backgroundImage:
                            "url(" + edge.node.picture.secure_url + ")",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          height: "310px",
                          width: "508px",
                          borderRadius: "0px",

                        }}
                       />

                        <span className=" nowrap i-link p-15">
                      
                          <Link
                              className="i-link fs-16 b-b-g mr-15 font-bold mb-15 nowrap"
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
