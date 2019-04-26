import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import PageTransition from "gatsby-plugin-page-transitions"

import { StyledLink } from "../styles/link.css"
import SEO from "../components/SEO"
import Layout from "../components/layout"

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      html
    }
  }
`

const StyledPost = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`

const Pagination = styled.ul`
  list-style-type: none;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;

  .next {
    text-align: right;
    margin-bottom: 2rem;
  }

  .previous {
    text-align: left;
  }
`

const BlogTemplate = props => {
  const { previous, next } = props.pageContext
  return (
    <Layout location={props.location}>
      <SEO title={props.data.markdownRemark.frontmatter.title} />
      <PageTransition>
        <StyledPost
          dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
        />
        <Pagination>
          <li className="next">
            {next && (
              <StyledLink to={`/blog/${next.fields.slug}`} rel="next">
                {next.frontmatter.title} →
              </StyledLink>
            )}
          </li>
          <li className="previous">
            {previous && (
              <StyledLink to={`/blog/${previous.fields.slug}`} rel="prev">
                ← {previous.frontmatter.title}
              </StyledLink>
            )}
          </li>
        </Pagination>
      </PageTransition>
    </Layout>
  )
}

export default BlogTemplate
