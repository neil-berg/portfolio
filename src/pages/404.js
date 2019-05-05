import React from "react"

import SEO from "../components/seo"
import Header from "../components/header"

const NotFoundPage = ({ location }) => (
  <div>
    <SEO title="Not found" />
    <Header location={location} />
    <div
      style={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--white)",
      }}
    >
      <h1>NOT FOUND</h1>
      <p>{location.pathname.split("/")[1]} is not found...</p>
    </div>
  </div>
)

export default NotFoundPage
