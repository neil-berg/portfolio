import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import PageTransition from "gatsby-plugin-page-transitions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLongArrowAltRight,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons"

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
const NextLink = styled(Link)`
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .link-icon {
    margin: 0 0.5rem;
  }
`

const PrevLink = styled(Link)`
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .link-icon {
    margin: 0 0.5rem;
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
              <NextLink to={`/blog/${next.fields.slug}`} rel="next">
                <span className="link-text">{next.frontmatter.title}</span>
                <FontAwesomeIcon
                  className="link-icon"
                  icon={faLongArrowAltRight}
                />
              </NextLink>
            )}
          </li>
          <li className="previous">
            {previous && (
              <PrevLink to={`/blog/${previous.fields.slug}`} rel="prev">
                <FontAwesomeIcon
                  className="link-icon"
                  icon={faLongArrowAltLeft}
                />
                <span className="link-text">{previous.frontmatter.title}</span>
              </PrevLink>
            )}
          </li>
        </Pagination>
      </PageTransition>
    </Layout>
  )
}

export default BlogTemplate
