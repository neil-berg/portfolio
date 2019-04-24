import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Avatar from "../images/isabelle-wedding-pic.jpg"

const Img = styled.img`
  display: block;
  width: 300px;
  height: auto;
  margin: 0 auto;
`

const About = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="About" />
      <Img src={Avatar} alt="Profile Headshot of Neil Berg" />
      <h3>Bio</h3>
      <h3>CV</h3>
      <h3>Values</h3>
    </Layout>
  )
}

export default About
