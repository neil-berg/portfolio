import React from "react"
import styled from "styled-components"
import { Link, graphql, useStaticQuery } from "gatsby"
import { useSpring, animated } from "react-spring"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { skills } from '../data/skills';

const About = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/profile-headshot.jpg" }) {
        childImageSharp {
          fixed(width: 249) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  // animation props for the about page
  const animationProps = useSpring({
    from: {
      opacity: 0,
      transform: `translate3d(50px, 0, 0)`,
    },
    to: {
      opacity: 1,
      transform: `translate3d(0,0,0)`,
    },
  })

  return (
    <Layout location={location}>
      <SEO title="About" />

      <AboutWrapper style={animationProps} className="about">
        <section className="bio">
          <Img
            className="bio__avatar"
            fixed={data.file.childImageSharp.fixed}
            alt="Profile avatar of Neil Berg"
          />
          <div className="bio__text-container">
            <h2 className="bio__header">Bio</h2>
            <p className="bio__text">
              I'm a full-stack software engineer based in Los Angeles. Building on a career in
              climate science where I specialized in geospatial data analytics
              and visualizations, I decided to blend my love of coding and
              communication with my interests in design and style, and dive into
              web app development. Creating spaces in our digital world that are
              fast, engaging, and reliable has become a passion ever
              since. Practicing yoga, playing guitar, and cooking balance out my
              computer time.
            </p>
          </div>
        </section>

        <section className="tech-skills">
          <h2 className="tech-skills__header">Tech Stack</h2>
          <p className="tech-skills__text">
            Always learning and open to new technologies, here's what I'm
            currently using or have recent experience with:
          </p>
          <div className="tech-skills-category-container">
            {Object.keys(skills).map(category => (
              <div className="tech-skills-category">
                <h5 className="tech-skills-category__header">{category}</h5>
                <ul className="tech-skills-category__list">
                  {skills[category].map(skill => <li className="tech-skills-category__list-item">{skill}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="comm-skills">
          <h2 className="comm-skills__header">Communication</h2>
          <p className="comm-skills__text">
            I have spoken and written about complex technical and quantitative topics to a
            range of audiences, from{" "}
            <a
              className="comm-skills__link"
              href="https://www.rand.org/pubs/working_papers/WR1140.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              military officials{" "}
            </a>
            to{" "}
            <a
              className="comm-skills__link"
              href="https://www.rand.org/pubs/perspectives/PE243.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              policymakers and stakeholders
            </a>{" "}
            across the country.
          </p>
          <p className="comm-skills__text">
            Alongside my{" "}
            <Link className="comm-skills__link" to="/blog">
              personal blog
            </Link>{" "}
            on web development, I created and taught a{" "}
            <a
              className="comm-skills__link"
              href="https://github.com/neil-berg/climate-data-analyses"
              target="_blank"
              rel="noopener noreferrer"
            >
              course on data analytics
            </a>{" "}
            using Python for undergraduate students at UCLA.
          </p>
          <p className="comm-skills__text">
            Additionally, I have published{" "}
            <a
              className="comm-skills__link"
              href="https://scholar.google.com/citations?user=SDOdTI8AAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              several scientific papers
            </a>{" "}
            and have appeared in national media outlets such as{" "}
            <a
              className="comm-skills__link"
              href="https://www.scpr.org/programs/take-two/2019/01/16/19327/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NPR
            </a>
            , the{" "}
            <a
              className="comm-skills__link"
              href="https://www.latimes.com/local/lanow/la-me-ln-sierra-nevada-snowpack-20181211-story.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Los Angeles Times
            </a>
            , and{" "}
            <a
              className="comm-skills__link"
              href="https://mashable.com/article/california-rain-wildfire-season-2018/?utm_cid=hp-n-1#M3xRHynuQiqz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mashable
            </a>
            .
          </p>
        </section>
      </AboutWrapper>
    </Layout>
  )
}

const AboutWrapper = styled(animated.div)`
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;

  .bio__text-container,
  .tech-skills,
  .comm-skills {
    padding: 0.5rem 0;
  }

  .tech-skills {
    margin: 2rem 0;
  }

  .bio {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bio__avatar {
    display: block;
    min-width: 250px;
    border-radius: 50%;
  }

  .bio__text,
  .tech-skills__text,
  .comm-skills__text {
    font-size: 1em;
    line-height: 1.45em;
    padding: 0.5rem 0;
  }

  .comm-skills__link {
    color: var(--blue);
  }

  .tech-skills-category-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .tech-skills-category {
    width: 100%;
    border-top: 1px solid var(--mediumgrey);
    padding: .75em;
    /* margin: 0.25rem; */
  }

  .tech-skills-category__header {
    text-align: center;
    font-size: 1em;
    padding-bottom: 0.5em;
    color: var(--oatmeal);
  }

  .tech-skills-category__list {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .tech-skills-category__list-item {
    font-size: 0.9em;
    text-align: center;
    color: var(--white);
  }

  .strong {
    font-weight: bold;
  }

  .bio__header,
  .tech-skills__header,
  .comm-skills__header {
    color: var(--lightred);
    border-bottom: 1px grey solid;
  }

  @media screen and (min-width: 650px) {
    .bio {
      flex-direction: row;
      align-items: center;

      .bio__text-container {
        padding-left: 2.5rem;
      }
    }
  }

  @media screen and (min-width: 768px) {
     .tech-skills-category {
      width: 248px;
      margin: 4px;
      border-top: 1px solid var(--mediumgrey);
      padding: 0.25em;
    }
  }

  // If touch on device is enabled
  @media (hover: hover) {
    .comm-skills__link:hover {
      color: var(--lightred);
      border-bottom: 1px var(--lightred) solid;
    }
  }
`

export default About
