import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Home = ({ location }) => (
  <Layout location={location}>
    <SEO title="Home" keywords={[`neil`, `berg`, `developer`]} />
    <h1>Home Page</h1>
  </Layout>
)

export default Home
