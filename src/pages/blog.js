import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Blog = ({ location }) => {
  // Grab all the markdown files
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              description
            }
            html
            excerpt
            timeToRead
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // Generate a list of markdown posts
  const postList = data.allMarkdownRemark.edges.map((edge, i) => {
    return (
      <Link
        key={i}
        className="blog__post-link"
        to={`/blog/${edge.node.fields.slug}`}
      >
        <li className="blog__post">
          <h2 className="blog__post-title">{edge.node.frontmatter.title}</h2>
          <p className="blog__post-date-readtime">
            <span>{edge.node.frontmatter.date}</span>
            <FontAwesomeIcon
              className="blog__post-circle-icon"
              icon={faCircle}
            />
            <span>{edge.node.timeToRead} mins </span>
          </p>
          <p className="blog__post-description">
            {edge.node.frontmatter.description}
          </p>
        </li>
      </Link>
    )
  })

  // Spring animation settings
  const animationProps = useSpring({
    from: {
      opacity: 0,
      transform: `translateY(-30px)`,
    },
    to: {
      opacity: 1,
      transform: `translateY(0)`,
    },
  })
  return (
    <Layout location={location}>
      <SEO title="Blog" />
      <BlogWrapper className="blog">
        <animated.ul style={animationProps} className="blog__list">
          {postList}
        </animated.ul>
      </BlogWrapper>
    </Layout>
  )
}

const BlogWrapper = styled.div`
  padding: 1rem;

  .blog__list {
    list-style-type: none;
    max-width: 800px;
    margin: 0 auto;
  }

  .blog__post {
    padding: 1rem 0;
  }

  .blog__post:not(last-child) {
    margin-bottom: 1.5rem;
  }

  .blog__post-title {
    font-size: 1.75em;
    color: var(--oatmeal);
  }

  .blog__post-circle-icon {
    font-size: 6px;
    color: var(--lightgrey);
    margin: 0 0.5rem;
  }

  .blog__post-date-readtime {
    padding: 0.5rem 0 1rem 0rem;
    color: var(--lightgrey);
    font-size: 0.9em;
    display: flex;
    align-items: center;
  }

  .blog__post-description {
    color: var(--white);
    border-left: 3px var(--blue) solid;
    padding-left: 1rem;
    margin-left: 2px;
  }
`

export default Blog
