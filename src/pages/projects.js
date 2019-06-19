import React from "react"
import styled from "styled-components"

import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { data } from "../data/projectData"
import { createSlug } from "../helper"
import MovieManiaBackdrop from "../images/movie-mania-backdrop.jpg"
import NewsFlashBackdrop from "../images/news-flash-backdrop.jpg"
import MeredithLackeyBackdrop from "../images/meredith-lackey-backdrop.jpg"
import ChowNowBackdrop from "../images/chow-now-backdrop.jpg"

const ProjectWrapper = styled.article`
  border-top: 0;
  border-bottom: 1px grey solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;

  &:last-child {
    border-bottom: 0;
  }

  .project__title {
    font-size: 2.25em;
    text-align: center;
    border-bottom: 2px solid var(--lightred);
  }

  .project__tool-list {
    list-style-type: none;
    text-align: center;
    padding: 1.5rem;
    line-height: 1.5rem;
  }

  .project__tool-item {
    display: inline;
    margin: 0;
    padding: 0 0.5rem;
    border-right: 1px var(--white) solid;
  }

  .project__tool-item:last-child {
    border-right: 0;
  }

  .project__links-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
  }

  .project__link {
    color: var(--white);
    padding-bottom: 2px;
    border-bottom: 1px var(--white) solid;
  }

  @media screen and (min-width: 650px) {
    &:first-child {
      border-top: 1px grey solid;
    }
  }

  @media (hover: hover) {
    &:hover {
      background-image: linear-gradient(
          to right,
          transparent,
          var(--white),
          var(--white),
          transparent 100%
        ),
        url(${props => props.background});
      background-position: bottom;
      background-size: cover;
    }

    &:hover .project__tool-item {
      color: var(--black);
      border-right: 1px var(--black) solid;
    }

    &:hover .project__tool-item:last-child {
      border-right: 0;
    }

    &:hover .project__link {
      color: var(--black);
      border-bottom: 1px var(--black) solid;
      transition: color 0.2s linear;
    }
  }
`

const Projects = ({ location }) => {
  const projectList = data.map((project, idx) => {
    const slug = createSlug(project)

    const backgrounds = {
      "Movie Mania": MovieManiaBackdrop,
      "News Flash": NewsFlashBackdrop,
      "Meredith Lackey": MeredithLackeyBackdrop,
      "Chow Now": ChowNowBackdrop,
    }

    return (
      <ProjectWrapper
        className="project"
        key={idx}
        background={backgrounds[project.title] || MovieManiaBackdrop}
      >
        <a
          className="project__url"
          href={project.path}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="project__title">{project.title}</h2>
        </a>
        <ul className="project__tool-list">
          {project.tools.map((tool, idx) => (
            <li className="project__tool-item" key={idx}>
              {tool}
            </li>
          ))}
        </ul>
        <div className="project__links-container">
          <a
            className="project__link"
            href={project.repoPath}
            target="_blank"
            rel="noopener noreferrer"
          >
            view code
          </a>
          <Link className="project__link" to={slug}>
            learn more
          </Link>
        </div>
      </ProjectWrapper>
    )
  })
  return (
    <Layout location={location}>
      <SEO title="Projects" />
      <section className="projects">{projectList}</section>
    </Layout>
  )
}

export default Projects
