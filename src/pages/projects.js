import React from "react"
import styled from "styled-components"
import { animated, useSpring } from "react-spring"

import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { data } from "../data/projectData"
import { createSlug } from "../helper"
// import MovieManiaBackdrop from "../images/movie-mania-backdrop.jpg"
// import NewsFlashBackdrop from "../images/news-flash-backdrop.jpg"
// import MeredithLackeyBackdrop from "../images/meredith-lackey-backdrop.jpg"
// import ChowNowBackdrop from "../images/chow-now-backdrop.jpg"
// import EmanuelRohssBackdrop from "../images/emanuel-rohss-backdrop.jpg"

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

    // const backgrounds = {
    //   "Movie Mania": MovieManiaBackdrop,
    //   "News Flash": NewsFlashBackdrop,
    //   "Meredith Lackey": MeredithLackeyBackdrop,
    //   "Chow Now": ChowNowBackdrop,
    //   "Emanuel Röhss": EmanuelRohssBackdrop,
    //

    return (
      <ProjectCard
        className="project"
        key={idx}
        // background={backgrounds[project.title] || MovieManiaBackdrop}
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
            className="project__link-view-code"
            href={project.repoPath}
            target="_blank"
            rel="noopener noreferrer"
          >
            view code
          </a>
          <Link className="project__link-learn-more" to={slug}>
            learn more
          </Link>
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
  border: 1px var(--mediumgrey) solid;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 5px 10px rgba(255, 237, 170, 0.25);

  .project__title {
    color: var(--lightred);
    font-size: 2.25em;
    text-align: center;
    padding: 1rem 0;
    border-bottom: 1px solid var(--mediumgrey);
    border-radius: 5px 5px 0 0;
    transition: all 0.3s ease;
  }

  .project__tool-list {
    list-style-type: none;
    text-align: center;
    padding: 1.5rem;
    line-height: 1.5rem;
  }

  .project__tool-item {
    color: var(--oatmeal);
    display: inline;
    margin: 0;
  }

  .project__tool-item::after {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--blue);
    margin: 0 0.65rem;
  }

  .project__tool-item:last-of-type:after {
    content: ''
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: transparent;
    margin: 0 0.65rem;
  }

  .project__links-container {
    display: flex;
    align-items: center;
  }

  .project__link-view-code,
  .project__link-learn-more {
    flex: 1;
    text-align: center;
    color: var(--lightred);
    font-weight: bold;
    padding: 1rem;
    border-top: 1px var(--mediumgrey) solid;
    transition: all 0.3s ease;
  }

  .project__link-view-code {
    border-right: 1px var(--mediumgrey) solid;
    border-radius: 0 0 0 5px;
  }

  .project__link-learn-more {
    border-radius: 0 0 5px 0;
  }

  @media (hover: hover) {
    .project__title:hover,
    .project__link-view-code:hover,
    .project__link-learn-more:hover {
      color: var(--oatmeal);
      background: var(--lightred);
    }
  }
`

// const ProjectWrapper = styled.article`
//   @media (hover: hover) {
//     &:hover {
//       background-image: linear-gradient(
//           to right,
//           transparent,
//           var(--white),
//           var(--white),
//           transparent 100%
//         ),
//         url(${props => props.background});
//       background-position: bottom;
//       background-size: cover;
//     }
//   }
// `

export default Projects
