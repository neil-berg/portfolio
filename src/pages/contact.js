import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Contact = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="Contact" />
      <h1>Contact Page</h1>
      <p>
        Interested in working together to make something great? I'd love to hear
        from you.{" "}
      </p>
    </Layout>
  )
}

export default Contact
