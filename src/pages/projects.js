import React from "react"
import styled from "styled-components"
import { animated, useSpring } from "react-spring"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faCode, faBook } from "@fortawesome/free-solid-svg-icons"

import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { data } from "../data/projectData"
import { createSlug } from "../helper"

library.add(faCode, faBook)

const Classes = {
  TitleLink: "project-card-title-link",
  TitleLinkText: "project-card-title-link-text",
  Description: "project-card-description",
  LinkContainer: "project-card-link-container",
  CodeLink: "project-card-code-link",
  CodeLinkText: "project-card-code-link-text",
  PostLink: "project-card-post-link",
  PostIcon: "project-card-post-icon",
  PostLinkText: "project-card-post-link-text",
}

const Projects = ({ location }) => {
  const animationProps = useSpring({
    from: {
      opacity: 0,
      transform: `scale(0.9)`,
    },
    to: {
      opacity: 1,
      transform: `scale(1)`,
    },
  })

  const projectList = data.map((project, idx) => {
    const slug = createSlug(project)

    return (
      <ProjectCard key={idx}>
        <a
          className={Classes.TitleLink}
          href={project.path}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={Classes.TitleLinkText}>{project.title}</h2>
        </a>
        {project.description && (
          <p className={Classes.Description}>{project.description}</p>
        )}
        <ul className="project__tool-list">
          {project.tools.map((tool, idx) => (
            <li className="project__tool-item" key={idx}>
              {tool}
            </li>
          ))}
        </ul>
        <div className={Classes.LinkContainer}>
          <a
            className={Classes.CodeLink}
            href={project.repoPath}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={"code"} />
            <span className={Classes.CodeLinkText}>View Code</span>
          </a>
          {project.hasPost && 
            <Link className={Classes.PostLink} to={slug}>
              <FontAwesomeIcon className={Classes.PostIcon} icon={"book"} />
              <span className={Classes.PostLinkText}>Read More</span>
            </Link>
          }
        </div>
      </ProjectCard>
    )
  })
  return (
    <Layout location={location}>
      <SEO title="Projects" />
      <ProjectContainer style={animationProps}>{projectList}</ProjectContainer>
    </Layout>
  )
}

const ProjectContainer = styled(animated.section)`
  margin: 2rem auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 2rem;
  justify-content: center;
  max-width: 800px;

  @media screen and (max-width: 800px) {
    padding: 0 1rem;
  }
`

const ProjectCard = styled.div`
  background: var(--mediumgrey);
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* align-items: flex-start; */
  justify-content: space-between;
  transition: all 0.3s ease;

  .${Classes.TitleLinkText} {
    color: var(--lightred);
    font-size: 30px;
    transition: all 0.3s ease;
  }

  .${Classes.Description} {
    color: var(--white);
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
  }

  .${Classes.LinkContainer} {
    display: flex;
    align-items: center;
  }

  .${Classes.CodeLink}, .${Classes.PostLink} {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--blue);
    border: 2px solid var(--blue);
    padding: 5px 10px;
    border-radius: 3px;
    width: 130px;
    font-size: 14px;
  }

  .${Classes.CodeLinkText}, .${Classes.PostLinkText} {
    margin-left: 10px;
    font-weight: bold;
  }

  .${Classes.PostLink} {
    margin-left: 10px;
    background: var(--white);
    border: 2px solid var(--white);
  }

  .${Classes.PostIcon} {
    color: var(--blue);
  }

  .${Classes.PostLinkText} {
    color: var(--blue);
  }

  .project__tool-list {
    list-style-type: none;
    text-align: center;
    margin: 15px 0;
    line-height: 20px;
  }

  .project__tool-item {
    color: var(--oatmeal);
    display: inline;
    margin: 0;
    font-size: 13px;
  }

  .project__tool-item::after {
    content: "+";
    display: inline-block;
    width: 8px;
    height: 8px;
    color: var(--blue);
    margin: 0 5px;
  }

  .project__tool-item:last-of-type:after {
    content: '';
    display: inline-block;
    background-color: transparent;
    margin: 0;
  }
`

export default Projects
