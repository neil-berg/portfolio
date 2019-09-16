import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../images/palm-trees.jpg"

const LandingWrapper = styled.div`
  // Small screens: Height of container is
  // based on 100vh minus height of header (65px)
  // navbar (63px) and footer (110)px

  padding: 3rem 0.25rem;
  height: calc(100vh - 65px - 63px - 110px);
  // Photo by Corey Agopian on Unsplash
  background-image: linear-gradient(var(--lightred) 35%, transparent),
    url(${Image});
  background-position: bottom 20%;
  background-size: cover;

  .landing__text {
    font-size: 1.5em;
    text-align: center;
    color: var(--white);
  }

  .landing__text:first-child {
    padding-bottom: 2rem;
  }

  @media screen and (min-width: 650px) {
    // Larger screens: Height of container is
    // based on 100vh minus height of header (65px)
    // and footer (110)px
    height: calc(100vh - 65px - 110px);
    background-position: bottom;

    .landing__text {
      font-size: 2em;
    }
  }

  // Phones on their side / small heights
  @media screen and (max-height: 570px) {
    padding: 1rem;

    .landing__text {
      font-size: 1.25em;
    }

    .landing__text:first-child {
      padding-bottom: 0.75rem;
    }
  }
`

const Home = ({ location }) => (
  <Layout location={location} showFooter={true}>
    <SEO title="Home" keywords={[`neil`, `berg`, `developer`]} />
    <LandingWrapper>
      <p className="landing__text">
        Hi. I'm a full-stack developer based in Los Angeles.
      </p>
      <p className="landing__text">
        I like making fast, elegant, and resilient web products.
      </p>
    </LandingWrapper>
  </Layout>
)

export default Home
