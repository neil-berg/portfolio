import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import PageTransition from "gatsby-plugin-page-transitions"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Container = styled.div`
  padding: 1rem;

  ul {
    list-style-type: none;
    max-width: 800px;
    margin: 0 auto;

    li {
      padding: 1rem 0;

      h2 {
        font-size: 1.5em;
      }

      p.date-read {
        padding: 0.25rem 0 1rem 0;
      }
    }
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
      <li key={i}>
        <Link to={`/blog/${edge.node.fields.slug}`}>
          <h2>{edge.node.frontmatter.title}</h2>
        </Link>
        <p className="date-read">
          {edge.node.frontmatter.date} | {edge.node.timeToRead} mins{" "}
        </p>
        <p className="description">{edge.node.frontmatter.description}</p>
      </li>
    )
  })
  return (
    <Layout location={location}>
      <SEO title="Blog" />
      <PageTransition>
        <Container>
          <ul>{postList}</ul>
        </Container>
      </PageTransition>
    </Layout>
  )
}

export default Blog
