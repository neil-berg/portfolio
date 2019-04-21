import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Projects = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="Projects" />
      <h1>Project Page</h1>
    </Layout>
  )
}

export default Projects
