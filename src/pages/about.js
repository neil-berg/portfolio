import React from "react"
import styled from "styled-components"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const StyledImg = styled(Img)`
  display: block;
  min-width: 250px;
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

  .bio {
    display: flex;
    flex-direction: column;
    align-items: center;
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

  .technical,
  .education {
    ul {
      list-style-type: square;
      margin-left: 1.25rem;
    }
  }

  .experience {
    ul {
      li {
        padding: 0;
        margin: 1rem 0;
        p {
          margin: 0;
          padding: 0;
          font-size: 1em;
        }
        p.years {
          padding-left: 1.5rem;
        }
      }
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
      flex-direction: row;
      align-items: center;

      .text {
        padding-left: 2.5rem;
      }
    }
  }

  @media (hover: hover) {
    a:hover {
      color: var(--lightred);
      border-bottom: 1px var(--lightred) solid;
    }
  }
`

const About = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/square_avatar.png" }) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  return (
    <Layout location={location}>
      <SEO title="About" />

      <Container>
        <section className="bio">
          <StyledImg
            fixed={data.file.childImageSharp.fixed}
            alt="Avatar of Neil Berg"
          />
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
          <h2>Technical skills</h2>
          <p>
            Always learning and open to new technologies, here's what I'm
            currently using:
          </p>
          <ul>
            <li>
              <span className="strong">Languages: </span>JavaScript, Python,
              HTML/CSS
            </li>
            <li>
              <span className="strong">JS frameworks/libraries </span>React,
              Redux, React-Router, Gatsby, D3
            </li>
            <li>
              <span className="strong">Python libraries: </span>Pandas, Numpy,
              Matplotlib, Xarray
            </li>
            <li>
              <span className="strong">Design + prototyping: </span>Figma
            </li>
          </ul>
        </section>

        <section className="communication">
          <h2>Communication skills</h2>
          <p>
            I have communicated complex technical and quantitative topics to a
            range of audiences, from{" "}
            <a
              href="https://www.rand.org/pubs/working_papers/WR1140.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              military officials{" "}
            </a>
            to{" "}
            <a
              href="https://www.rand.org/pubs/perspectives/PE243.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              policymakers and stakeholders
            </a>{" "}
            across the country.
          </p>
          <p>
            Alongside my <Link to="/blog">personal blog</Link> on web
            development, I created and teach a{" "}
            <a
              href="https://github.com/neil-berg/climate-data-analyses"
              target="_blank"
              rel="noopener noreferrer"
            >
              course on data analytics
            </a>{" "}
            using Python for undergraduate students at UCLA.
          </p>
          <p>
            Additionally, I have published{" "}
            <a
              href="https://scholar.google.com/citations?user=SDOdTI8AAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              several scientific papers
            </a>{" "}
            and have appeared in national media outlets such as{" "}
            <a
              href="https://www.scpr.org/programs/take-two/2019/01/16/19327/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NPR
            </a>
            , the{" "}
            <a
              href="https://www.latimes.com/local/lanow/la-me-ln-sierra-nevada-snowpack-20181211-story.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Los Angeles Times
            </a>
            , and{" "}
            <a
              href="https://mashable.com/article/california-rain-wildfire-season-2018/?utm_cid=hp-n-1#M3xRHynuQiqz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mashable
            </a>
            .
          </p>
        </section>
        <section className="education">
          <h2>Education</h2>
          <ul>
            <li>PhD Atmospheric and Oceanic Sciences, UCLA</li>
            <li>MS Atmospheric and Oceanic Sciences, UCLA</li>
            <li>BS Atmospheric and Oceanic Sciences, UW-Madison</li>
          </ul>
        </section>
        <section className="experience">
          <h2>Experience</h2>
          <ul>
            <li>
              <p className="title">Freelance web developer</p>
              <p className="years">2018 - current</p>
            </li>
            <li>
              <p className="title">
                Co-Associate Director, UCLA Center for Climate Science
              </p>
              <p className="years">2017 - current</p>
            </li>
            <li>
              <p className="title">Associate Physical Scientist, RAND</p>
              <p className="years">2015 - 2017</p>
            </li>
            <li>
              <p className="title">
                Atmospheric and Data Scientist, Vertum Partners
              </p>
              <p className="years">2011 - 2014</p>
            </li>
            <li>
              <p className="title">Graduate Student Researcher, UCLA</p>
              <p className="years">2009 - 2015</p>
            </li>
          </ul>
        </section>
      </Container>
    </Layout>
  )
}

export default About
