import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../images/palm-trees.jpg"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  height: 100vh;
  width: 100vw;
  padding: 1rem;
  position: absolute;
  top: 0;
  z-index: -1;
  // Photo by Corey Agopian on Unsplash
  background-image: linear-gradient(var(--lightred) 35%, transparent),
    url(${Image});
  background-position: bottom;
  background-size: cover;

  p {
    font-size: 1.75em;
    text-align: center;
    color: var(--white);
    transform: translateY(-25px);
  }

  p:first-child {
    padding-bottom: 2rem;
  }

  @media screen and (min-width: 650px) {
    p {
      font-size: 2em;
    }
  }
`

const Home = ({ location }) => (
  <Layout location={location} showFooter={false}>
    <SEO title="Home" keywords={[`neil`, `berg`, `developer`]} />
    <Container>
      <p>Hi. I'm a front end developer based in Los Angeles.</p>
      <p>I like making fast, elegant, and resilient web products.</p>
    </Container>
  </Layout>
)

export default Home
