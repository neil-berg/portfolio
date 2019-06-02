import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

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

  .blog__post-title {
    font-size: 1.5em;
  }

  .blog__post-date-readtime {
    padding: 0.25rem 0 1rem 0;
  }
`

const Blog = ({ location }) => {
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
  const postList = data.allMarkdownRemark.edges.map((edge, i) => {
    return (
      <li key={i} className="blog__post">
        <Link className="blog__post-link" to={`/blog/${edge.node.fields.slug}`}>
          <h2 className="blog__post-title">{edge.node.frontmatter.title}</h2>
        </Link>
        <p className="blog__post-date-readtime">
          {edge.node.frontmatter.date} | {edge.node.timeToRead} mins{" "}
        </p>
        <p className="blog__post-description">
          {edge.node.frontmatter.description}
        </p>
      </li>
    )
  })
  return (
    <Layout location={location}>
      <SEO title="Blog" />
      <BlogWrapper className="blog">
        <ul className="blog__list">{postList}</ul>
      </BlogWrapper>
    </Layout>
  )
}

export default Blog
