import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const About = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="About" />
      <h2>About Page</h2>
    </Layout>
  )
}

export default About
