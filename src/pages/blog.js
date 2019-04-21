import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Blog = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="Blog" />
      <h1>Berg's Words</h1>
    </Layout>
  )
}

export default Blog
