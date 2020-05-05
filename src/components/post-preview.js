import React from "react"
import { Link } from "gatsby"
import { Highlight } from "react-instantsearch-dom"

const PostPreview = ({ hit }) => {
  return (
   
<div>
<div>
  <div>
        <div id={hit.id} className="mb-20 border ">
       
        <div

className="mediaLR"
style={{
backgroundImage:
"url(" +
hit.childContentfulCookingRecipeFeaturedImageJsonNode.secure_url +
")",
backgroundPosition: "center",
backgroundSize: "cover",
backgroundRepeat: "no-repeat",
height: "240px",
width: "374px",
borderRadius: "0",
}}
>
</div>


           <div className="mt-10 p-15 fs-16 ">
             <Link className="i-link fs-16 b-b-g mr-15 font-bold mb-15 nowrap" to={`/recette/${hit.slug}/`}>
             <Highlight hit={hit} attribute="title" tagName="mark" />

             </Link>

             <div> 

             <div className="t-d fl-r mb-15">

<span class="fs-14 bg-g"> <i class="fas fa-check-circle"></i>  {hit.time} </span>




</div>
             <div className="bg-w-c pl-0">
                 <span class="fs-14 text-gray "> <i class="far fa-user mr-5"></i> {hit.numberOfPersons} </span>
               </div>

              


           
               <span className="med-i"> <i className="fas fa-file-medical-alt c-green mr-8"></i> {hit.medicalNumber}  </span>

             
             </div>
          

             <div className="b-solid-top">
               <div  className="pt-15 ">
               <i class="fas fa-file-medical-alt c-g mr-15"></i>
                 {hit.for.map(dataFor => (
                   <span  class="fs-14 text-gray pr-15" key={dataFor.instructions}>
                     {dataFor}
                   </span>
                 ))}
               </div>
             </div>
           </div>
         </div>
    
  </div>
</div>
</div>


  )
}

export default PostPreview