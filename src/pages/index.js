import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Container = styled.div`
  background: var(--black);
  color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  height: 100vh;
  width: 100vw;
  padding: 1em;
  position: absolute;
  top: 0;
  z-index: -1;

  p {
    font-size: 2em;
  }

  p:first-child {
    padding-bottom: 2rem;
  }
`

const Home = ({ location }) => (
  <Layout location={location} showFooter={false}>
    <SEO title="Home" keywords={[`neil`, `berg`, `developer`]} />
    <Container className="landing">
      <p>Hi. I'm a front end developer based in Los Angeles.</p>
      <p>I like making fast, interesting, resilient web apps and sites.</p>
    </Container>
  </Layout>
)

export default Home
