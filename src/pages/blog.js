import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Container = styled.div`
  padding: 1rem;

  ul {
    list-style-type: none;

    li {
      padding: 1rem 0;
    }
  }
`

const Blog = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
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
      <li key={i}>
        <Link to={`/blog/${edge.node.fields.slug}`}>
          <h2>{edge.node.frontmatter.title}</h2>
        </Link>
        <p>
          {edge.node.frontmatter.date} | {edge.node.timeToRead} mins{" "}
        </p>
        <p>{edge.node.excerpt}</p>
      </li>
    )
  })
  return (
    <Layout location={location}>
      <SEO title="Blog" />
      <Container>
        <h2>Berg's Words</h2>
        <ul>{postList}</ul>
      </Container>
    </Layout>
  )
}

export default Blog
