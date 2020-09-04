import React from "react"

function TitleFrench(props) {
  return <h1 className="hero-title-home bold">Discover articles by independent designers.</h1>
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
