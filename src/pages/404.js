import React from "react"

import SEO from "../components/seo"
import Header from "../components/header"

const NotFoundPage = ({ location }) => (
  <div>
    <SEO title="Not found" />
    <Header location={location} />
    <h1>NOT FOUND</h1>
    <p>{location.pathname.split("/")[1]} is not found...</p>
  </div>
)

export default NotFoundPage
