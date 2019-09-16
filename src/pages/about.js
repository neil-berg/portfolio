import React from "react"
import styled from "styled-components"
import { Link, graphql, useStaticQuery } from "gatsby"
import { useSpring, animated } from "react-spring"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const About = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/profile-avatar.jpg" }) {
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
              I'm an LA-based full-stack developer. Building on a career in
              climate science where I specialized in geospatial data analytics
              and visualizations, I decided to blend my love of coding and
              communication with my interests in design and style, and dive into
              web development. Creating spaces in our digital world that are
              accessible, enjoyable, and reliable has become a passion ever
              since. Practicing yoga, playing guitar, and cooking balance out my
              computer time.
            </p>
          </div>
        </section>

        <section className="tech-skills">
          <h2 className="tech-skills__header">Technical skills</h2>
          <p className="tech-skills__text">
            Always learning and open to new technologies, here's what I'm
            currently using:
          </p>
          <ul className="tech-skills__list">
            <li className="tech-skills__item">
              <span className="strong">Languages: </span>JavaScript, Python,
              HTML/CSS
            </li>
            <li className="tech-skills__item">
              <span className="strong">JS frameworks/libraries: </span>React,
              Node, Express, React, Gatsby
            </li>
            <li className="tech-skills__item">
              <span className="strong">Databases and data management: </span>
              Redux, React Context, MongoDB, Mongoose, Firebase
            </li>
            <li className="tech-skills__item">
              <span className="strong">APIs: </span>REST, GraphQL, Postman
            </li>
            <li className="tech-skills__item">
              <span className="strong">CMS: </span>Contentful, Airtable
            </li>
            <li className="tech-skills__item">
              <span className="strong">Styling and animations: </span>
              Styled-components, React-spring
            </li>
            <li className="tech-skills__item">
              <span className="strong">Hosting/Deployment: </span>Netlify,
              Heroku
            </li>
            <li className="tech-skills__item">
              <span className="strong">Python libraries: </span>Pandas, Numpy,
              Matplotlib, Xarray
            </li>
            <li className="tech-skills__item">
              <span className="strong">Design + prototyping: </span>Figma
            </li>
          </ul>
        </section>

        <section className="comm-skills">
          <h2 className="comm-skills__header">Communication skills</h2>
          <p className="comm-skills__text">
            I have communicated complex technical and quantitative topics to a
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
            on web development, I created and teach a{" "}
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
        <section className="education">
          <h2 className="education__header">Education</h2>
          <ul className="education__list">
            <li className="education__item">
              PhD Atmospheric and Oceanic Sciences, UCLA
            </li>
            <li className="education__item">
              MS Atmospheric and Oceanic Sciences, UCLA
            </li>
            <li className="education__item">
              BS Atmospheric and Oceanic Sciences, UW-Madison
            </li>
          </ul>
        </section>
        <section className="experience">
          <h2 className="experience__header">Experience</h2>
          <ul className="experience__list">
            <li className="experience__item">
              <p className="experience__item-title">
                Full-stack software engineer @ Polycade
              </p>
              <p className="experience__item-years">2019 - current</p>
            </li>
            <li className="experience__item">
              <p className="experience__item-title">Freelance web developer</p>
              <p className="experience__item-years">2018 - current</p>
            </li>
            <li className="experience__item">
              <p className="experience__item-title">
                Co-Associate Director, UCLA Center for Climate Science
              </p>
              <p className="experience__item-years">2017 - 2019</p>
            </li>
            <li className="experience__item">
              <p className="experience__item-title">
                Associate Physical Scientist, RAND
              </p>
              <p className="experience__item-years">2015 - 2017</p>
            </li>
            <li className="experience__item">
              <p className="experience__item-title">
                Atmospheric and Data Scientist, Vertum Partners
              </p>
              <p className="experience__item-years">2011 - 2014</p>
            </li>
            <li className="experience__item">
              <p className="experience__item-title">
                Graduate Student Researcher, UCLA
              </p>
              <p className="experience__item-years">2009 - 2015</p>
            </li>
          </ul>
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
  .comm-skills,
  .education,
  .experience {
    padding: 0.5rem 0;
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

  .tech-skills__list,
  .education__list,
  .experience__list {
    list-style-type: square;
    margin-left: 1.25rem;
  }

  .tech-skills__item,
  .education__item,
  .experience__item {
    font-size: 1em;
    line-height: 1.45em;
    padding: 0.5rem;
  }

  .strong {
    font-weight: bold;
  }

  .experience__item {
    padding: 0;
    margin: 1rem 0;
  }

  .experience__item-title,
  .experience__item-years {
    margin: 0;
    padding: 0;
    font-size: 1em;
  }

  .experience__item-years {
    padding-left: 1.5rem;
  }

  .bio__header,
  .tech-skills__header,
  .comm-skills__header,
  .education__header,
  .experience__header {
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

  // If touch on device is enabled
  @media (hover: hover) {
    .comm-skills__link:hover {
      color: var(--lightred);
      border-bottom: 1px var(--lightred) solid;
    }
  }
`

export default About
