import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

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
        <p>{edge.node.frontmatter.date}</p>
      </li>
    )
  })
  return (
    <Layout location={location}>
      <SEO title="Blog" />
      <h2>Berg's Words</h2>
      <ul>{postList}</ul>
    </Layout>
  )
}

export default Blog
