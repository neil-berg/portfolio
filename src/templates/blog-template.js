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
      }
      html
    }
  }
`

const StyledPost = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`

const BlogTemplate = props => {
  return (
    <Layout location={props.location}>
      <SEO title={props.data.markdownRemark.frontmatter.title} />
      <StyledPost
        dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
      />
    </Layout>
  )
}

export default BlogTemplate
