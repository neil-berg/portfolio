import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"
import PageTransition from "gatsby-plugin-page-transitions"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  p {
    font-size: 1.2em;
    margin-top: 1rem;
  }

  ul {
    list-style-type: none;
    margin-top: 2rem;

    li {
      padding: 1rem 0;
      display: flex;
      align-items: center;

      .contact-icon {
        font-size: 1.5em;
      }

      .contact-text {
        padding: 0 1rem;
        font-size: 1.2em;
      }
    }
  }
`

const Contact = ({ location }) => {
  return (
    <Layout location={location} showFooter={false}>
      <SEO title="Contact" />
      <PageTransition>
        <Container>
          <p>Interested in working together? I'd love to hear from you. </p>
          <ul>
            <li>
              <FontAwesomeIcon className="contact-icon" icon={faEnvelope} />
              <span className="contact-text">Email</span>
            </li>
            <li>
              <FontAwesomeIcon className="contact-icon" icon={faGithub} />
              <span className="contact-text">Github</span>
            </li>
            <li>
              <FontAwesomeIcon className="contact-icon" icon={faTwitter} />
              <span className="contact-text">Twitter</span>
            </li>
            <li>
              <FontAwesomeIcon className="contact-icon" icon={faLinkedin} />
              <span className="contact-text">LinkedIn</span>
            </li>
          </ul>
        </Container>
      </PageTransition>
    </Layout>
  )
}

export default Contact
