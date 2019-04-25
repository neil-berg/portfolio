import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Avatar from "../images/isabelle-wedding-pic.jpg"

const Img = styled.img`
  display: block;
  width: 300px;
  height: auto;
  margin: 0 auto;
`

const Container = styled.div`
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;

  section {
    padding: 0.5rem 0;
  }

  a {
    color: var(--white);
    padding-bottom: 2px;
    border-bottom: 1px white solid;
  }

  ul {
    list-style-type: none;

    li {
      line-height: 1.3em;
    }
  }

  .technical {
    ul {
      list-style-type: square;
      margin-left: 1.25rem;
    }
  }

  h2 {
    border-bottom: 1px grey solid;
  }

  p {
    padding: 0.5rem 0;
    line-height: 1.3em;
  }
`

const About = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="About" />
      <Img src={Avatar} alt="Profile Headshot of Neil Berg" />
      <Container>
        <section className="bio">
          <h2>Bio</h2>
          <p>
            I'm an LA-based front end developer focusing on fast, functional,
            and resiliant web sites and apps. After years as a climate scientist
            diving deep into big datasets and creating geospatial
            visualizations, I decided to blend my passions of coding and
            communication with my interests in design and style, and pursue a
            life in web development. Creating spaces in our digital world that
            are accessible, enjoyale, and realiable has been my driving force
            ever since. Yoga, guitar, and orange wine balance out my computer
            time.
          </p>
        </section>

        <section className="education">
          <h2>Education</h2>
          <ul>
            <li>PhD Atmospheric and Oceanic Sciences, UCLA, 2015</li>
            <li>BS Atmospheric and Oceanic Sciences, UW-Madison, 2009</li>
          </ul>
        </section>

        <section className="technical">
          <h2>Technical stack</h2>
          <p>
            I'm always learning and open to new technologies. Here's what I'm
            currently using:
          </p>
          <ul>
            <li>JavaScript: ES5/6+, React, Redux, React-Router, Gatsby, D3</li>
            <li>
              HTML/CSS: HTML5, CSS3, CSS Grid, Flexbox, Styled Components,
              Material UI, Semantic UI
            </li>
            <li>Python: Pandas, Numpy, Scipy, Matplotlib, Xarray, Cartopy</li>
            <li>Debugging: Chrome and Firefox Developer Tools</li>
            <li>Text editor: VS Code and vim</li>
            <li>Terminal: iterm2 + Z-shell</li>
          </ul>
        </section>

        <section className="communication">
          <h2>Communication skills</h2>
          <p>
            I have communicated complex technical and quantitative topics to a
            range of audiences, from{" "}
            <a href="https://www.rand.org/pubs/working_papers/WR1140.html">
              {" "}
              military officials{" "}
            </a>
            to{" "}
            <a href="https://www.rand.org/pubs/perspectives/PE243.html">
              policymakers and stakeholders
            </a>{" "}
            across the country.
          </p>
          <p>
            Alongside my <Link to="/blog">personal blog</Link> on web
            development, I created and teach a{" "}
            <a href="https://github.com/neil-berg/climate-data-analyses">
              course on data analytics
            </a>{" "}
            using Python for undergraduate students at UCLA.
          </p>
          <p>
            Additionally, I have published{" "}
            <a
              href="https://scholar.google.com/citations?user=SDOdTI8AAAAJ&hl=en"
              target="_blank"
            >
              several scientific papers
            </a>{" "}
            and have been featured in national media outlets such as{" "}
            <a
              href="https://www.scpr.org/programs/take-two/2019/01/16/19327/"
              target="_blank"
            >
              NPR
            </a>
            ,{" "}
            <a
              href="https://www.latimes.com/local/lanow/la-me-ln-sierra-nevada-snowpack-20181211-story.html"
              target="_blank"
            >
              the Los Angeles Times
            </a>
            , and{" "}
            <a
              href="https://mashable.com/article/california-rain-wildfire-season-2018/?utm_cid=hp-n-1#M3xRHynuQiqz"
              target="_blank"
            >
              Mashable
            </a>
            .
          </p>
        </section>
      </Container>
    </Layout>
  )
}

export default About
