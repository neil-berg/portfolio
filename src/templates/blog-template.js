import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import SEO from "../components/SEO"
import Layout from "../components/layout"

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
      excerpt
      timeToRead
    }
  }
`

const StyledPost = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const BlogTemplate = props => {
  return (
    <Layout location={props.location}>
      <SEO title={props.data.markdownRemark.frontmatter.title} />
      <h2>Berg's Words</h2>
      <StyledPost
        dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
      />
    </Layout>
  )
}

export default BlogTemplate
