import React from "react"

function TitleFrench(props) {
  return <h1 className="hero-title-home bold">Découvrez des articles de créateurs indépendants.</h1>
}

export default function heroScreen() {
  return (
    <div className="hero">
      <div className="m-w p-i">
        <section>
          <TitleFrench />
        </section>
      </div>
    </div>
  )
}
