import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { StyledLink } from "../styles/link.css"
import { data } from "../data/projectData"
import { createSlug } from "../helper"

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
  }
`

const Projects = ({ location }) => {
  const projectList = data.map((project, idx) => {
    const slug = createSlug(project)
    return (
      <Container key={idx}>
        <StyledLink to={slug}>
          <h2>{project.title}</h2>
        </StyledLink>
        <ul>
          {project.tools.map((tool, idx) => (
            <li key={idx}>{tool}</li>
          ))}
        </ul>
        <div className="links">
          <a href={project.repoPath}>view code --></a>
          <StyledLink to={slug}>learn more--></StyledLink>
        </div>
      </Container>
    )
  })
  return (
    <Layout location={location}>
      <SEO title="Projects" />

      <div>{projectList}</div>
    </Layout>
  )
}

export default Projects
