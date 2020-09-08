import React from "react"
import { Link } from "gatsby"
import { Highlight } from "react-instantsearch-dom"

const SearchPreview = ({ hit }) => {
  return (
    <div>
      <div>
        <div className="mb-32">
          <div id={hit.id} className="mb-20 border "> 
            <img className="featured" src={hit.childContentfulRecipesFeaturedImageJsonNode.secure_url} alt="Purée d'œufs à la ciboulette"></img>
            <div className="mt-10 p-15 font-size-16 ">
                <span className="med-i-2">
                  {" "}
                  <i className="fas fa-file-medical-alt c-green mr-8"></i>{" "}
                  <span className="font-size-14">{hit.medicalNumber}{" "}</span>
                </span>
              <Link
                className="i-link font-size-16 b-b-g margin-right-qz font-bold mb-15 fs-18 nowrap"
                to={`/recette/${hit.slug}/`}
              >
                <Highlight hit={hit} attribute="title" tagName="mark" />
              </Link>

              <div>
                <div className="t-d float-right mb-15">
                  <span className="font-size-14 bg-g">
                    {" "}
                    <i className="fas fa-check-circle"></i> {hit.time} min(s){" "}
                  </span>
                </div>
                <div className="bg-w-c pl-0">
                  <span className="font-size-14 text-gray ">
                    {" "}
                    <i className="far fa-user mr-5"></i> {hit.numberOfPersons}{" "}
                  </span>
                </div>

                
              </div>

            
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPreview
