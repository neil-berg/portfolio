import React from "react"
import styled from "styled-components"

import PageTransition from "gatsby-plugin-page-transitions"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StyledLink } from "../styles/link.css"
import { data } from "../data/projectData"
import { createSlug } from "../helper"
import MovieManiaBackdrop from "../images/movie-mania-backdrop.jpg"
import NewsFlashBackdrop from "../images/news-flash-backdrop.jpg"

const Container = styled.div`
  border-top: 1px grey solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;

  h2 {
    font-size: 2.25em;
    text-align: center;
  }

  ul {
    list-style-type: none;
    text-align: center;
    padding: 1.5rem;
    line-height: 1.5rem;

    li {
      display: inline;
      margin: 0;
      padding: 0 0.5rem;
      border-right: 1px var(--white) solid;
    }

    li:last-child {
      border-right: 0;
    }
  }

  .links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    a {
      color: var(--white);
      padding-bottom: 2px;
      border-bottom: 1px var(--white) solid;
    }
  }

  @media screen and (min-width: 650px) {


    &:hover {
      background-image: linear-gradient(var(--white) 35%, transparent),
       url(${props => props.background});
      background-position: bottom;
      background-size: cover;

      a {
        color: var(--black);
      }

      li {
        color: var(--black);
        border-right: 1px var(--black) solid;
      }
    }
`

const Projects = ({ location }) => {
  const projectList = data.map((project, idx) => {
    const slug = createSlug(project)
    let background
    if (project.title === "Movie Mania") {
      background = MovieManiaBackdrop
    } else if (project.title === "News Flash") {
      background = NewsFlashBackdrop
    }
    return (
      <Container key={idx} background={background}>
        <a href={project.path} target="_blank" rel="noopener noreferrer">
          <h2>{project.title}</h2>
        </a>
        <ul>
          {project.tools.map((tool, idx) => (
            <li key={idx}>{tool}</li>
          ))}
        </ul>
        <div className="links">
          <a href={project.repoPath} target="_blank" rel="noopener noreferrer">
            view code
          </a>
          <Link to={slug}>learn more</Link>
        </div>
      </Container>
    )
  })
  return (
    <Layout location={location}>
      <SEO title="Projects" />
      <PageTransition>
        <div>{projectList}</div>
      </PageTransition>
    </Layout>
  )
}

export default Projects
