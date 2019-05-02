import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import PageTransition from "gatsby-plugin-page-transitions"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Avatar from "../images/square_avatar.png"

const Img = styled.img`
  display: block;
  width: 250px;
  height: auto;
  margin: 0 auto;
  border-radius: 50%;
`

const Container = styled.div`
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;

  section {
    padding: 0.5rem 0;

    p {
      font-size: 1.2em;
    }
  }

  a {
    color: var(--white);
    padding-bottom: 2px;
    border-bottom: 1px var(--white) solid;
    transition: all 0.25s linear;
  }

  ul {
    list-style-type: none;

    li {
      line-height: 1em;
      font-size: 1.2em;
      padding: 0.5rem;

      .strong {
        font-weight: bold;
      }
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

  @media screen and (min-width: 650px) {
    .bio {
      display: flex;
      align-items: center;

      .text {
        padding-left: 2.5rem;
      }
    }
    a:hover {
      color: var(--grey);
      border-bottom: 1px var(--grey) solid;
    }
  }
`

const About = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="About" />
      <PageTransition>
        <Container>
          <section className="bio">
            <Img src={Avatar} alt="Profile Headshot of Neil Berg" />
            <div className="text">
              <h2>Bio</h2>
              <p>
                I'm an LA-based front end developer. Building on a career in
                climate science where I specialized in geospatial data analytics
                and visualizations, I decided to blend my love of coding and
                communication with my interests in design and style, and pursue
                new opportunities in web development. Creating spaces in our
                digital world that are accessible, enjoyable, and realiable has
                become a passion ever since. Yoga and guitar balance out my
                computer time.
              </p>
            </div>
          </section>

          <section className="technical">
            <h2>Technical stack</h2>
            <p>
              I'm always learning and open to new technologies. Here's what I'm
              currently using:
            </p>
            <ul>
              <li>
                <span className="strong">JavaScript: </span>ES5/6+, React,
                Redux, React-Router, Gatsby, D3
              </li>
              <li>
                <span className="strong">HTML/CSS: </span>HTML5, CSS3, CSS Grid,
                Flexbox, Styled Components, Material UI
              </li>
              <li>
                <span className="strong">Python: </span>Pandas, Numpy, Scipy,
                Matplotlib, Xarray, Cartopy
              </li>
              <li>
                <span className="strong">Database:</span> Firebase
              </li>
              <li>
                <span className="strong">Debugging: </span> Chrome and Firefox
                Developer Tools
              </li>
              <li>
                <span className="strong">Text editor: </span> VS Code and vim
              </li>
              <li>
                <span className="strong">Terminal: </span>iterm2 + Z-shell
              </li>
            </ul>
          </section>

          <section className="communication">
            <h2>Communication is key</h2>
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
              and have appeared in national media outlets such as{" "}
              <a
                href="https://www.scpr.org/programs/take-two/2019/01/16/19327/"
                target="_blank"
              >
                NPR
              </a>
              , the{" "}
              <a
                href="https://www.latimes.com/local/lanow/la-me-ln-sierra-nevada-snowpack-20181211-story.html"
                target="_blank"
              >
                Los Angeles Times
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
      </PageTransition>
    </Layout>
  )
}

export default About
