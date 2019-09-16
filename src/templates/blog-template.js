import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLongArrowAltRight,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons"

import { StyledPost } from "../styles/post.css"
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
const BlogTemplate = props => {
  const { previous, next } = props.pageContext

  return (
    <Layout location={props.location}>
      {/* <SEO title={props.data.markdownRemark.frontmatter.title} /> */}

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
    </Layout>
  )
}

const NextLink = styled(Link)`
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: color 0.2s linear;

  .link-icon {
    margin: 0 0.5rem;
  }

  @media (hover: hover) {
    &:hover {
      color: var(--lightred);
    }
  }
`

const PrevLink = styled(Link)`
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: color 0.2s linear;

  .link-icon {
    margin: 0 0.5rem;
  }

  @media (hover: hover) {
    &:hover {
      color: var(--lightred);
    }
  }
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

export default BlogTemplate
