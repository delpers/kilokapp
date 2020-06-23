import React from "react"
import { Redirect } from "@reach/router" // highlight-line

const NotFoundPage = () => <Redirect noThrow to={`/home`} /> // highlight-line

export default NotFoundPage
