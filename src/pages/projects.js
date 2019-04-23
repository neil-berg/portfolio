import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { data } from "../data/projects"

const Projects = ({ location }) => {
  const projectList = data.map((project, idx) => {
    const slug = project.title
      .toLowerCase()
      .split(" ")
      .join("-")
    return (
      <div key={idx}>
        <Link to={`/projects/${slug}`}>
          <h2>{project.title}</h2>
          <ul>
            {project.tools.map((tool, idx) => (
              <li key={idx}>{tool}</li>
            ))}
          </ul>
        </Link>
      </div>
    )
  })
  return (
    <Layout location={location}>
      <SEO title="Projects" />
      <h1>Project Page</h1>
      <div>{projectList}</div>
    </Layout>
  )
}

export default Projects
