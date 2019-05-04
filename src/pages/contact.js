import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"

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

    li a {
      color: var(--white);
      padding: 1rem 0;
      display: flex;
      align-items: center;
      transition: color 0.2s linear;

      .contact-icon {
        font-size: 1.5em;
      }

      .contact-text {
        padding: 0 1rem;
        font-size: 1.2em;
      }
    }
  }

  @media (hover: hover) {
    li a:hover {
      color: var(--lightred);
    }
  }
`

const Contact = ({ location }) => {
  return (
    <Layout location={location} showFooter={false}>
      <SEO title="Contact" />

      <Container>
        <p>Interested in working together? I'd love to hear from you. </p>
        <ul>
          <li>
            <a className="email" href="mailto:neil@neilberg.dev">
              <FontAwesomeIcon className="contact-icon" icon={faEnvelope} />
              <span className="contact-text">Email</span>
            </a>
          </li>
          <li>
            <a href="https://github.com/neil-berg">
              <FontAwesomeIcon className="contact-icon" icon={faGithub} />
              <span className="contact-text">Github</span>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/_neilberg">
              <FontAwesomeIcon className="contact-icon" icon={faTwitter} />
              <span className="contact-text">Twitter</span>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/neil-berg-43135b55/">
              <FontAwesomeIcon className="contact-icon" icon={faLinkedin} />
              <span className="contact-text">LinkedIn</span>
            </a>
          </li>
        </ul>
      </Container>
    </Layout>
  )
}

export default Contact
