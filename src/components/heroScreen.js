import React from "react"

function TitleFrench(props) {
  return <h1 className="hero-title bold">Santé, forme et bien-être.</h1>
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
