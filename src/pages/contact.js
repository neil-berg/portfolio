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

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  .contact__intro {
    font-size: 1.2em;
    margin-top: 1rem;
  }

  .contact__list {
    list-style-type: none;
    margin-top: 2rem;
  }

  .contact__link {
    color: var(--white);
    padding: 1rem 0;
    display: flex;
    align-items: center;
    transition: color 0.2s linear;
  }

  .contact__link-icon {
    font-size: 1.5em;
  }

  .contact__link-text {
    padding: 0 1rem;
    font-size: 1.2em;
  }

  @media (hover: hover) {
    .contact__link:hover {
      color: var(--lightred);
    }
  }
`

const Contact = ({ location }) => {
  return (
    <Layout location={location} showFooter={false}>
      <SEO title="Contact" />

      <ContactWrapper className="contact">
        <p className="contact__intro">
          Interested in working together? I'd love to hear from you.{" "}
        </p>
        <ul className="contact__list">
          <li className="contact__item">
            <a className="contact__link" href="mailto:neil@neilberg.dev">
              <FontAwesomeIcon
                className="contact__link-icon"
                icon={faEnvelope}
              />
              <span className="contact__link-text">Email</span>
            </a>
          </li>
          <li className="contact__item">
            <a className="contact__link" href="https://github.com/neil-berg">
              <FontAwesomeIcon className="contact__link-icon" icon={faGithub} />
              <span className="contact__link-text">Github</span>
            </a>
          </li>
          <li className="contact__item">
            <a className="contact__link" href="https://twitter.com/_neilberg">
              <FontAwesomeIcon
                className="contact__link-icon"
                icon={faTwitter}
              />
              <span className="contact__link-text">Twitter</span>
            </a>
          </li>
          <li>
            <a
              className="contact__link"
              href="https://www.linkedin.com/in/neil-berg-43135b55/"
            >
              <FontAwesomeIcon
                className="contact__link-icon"
                icon={faLinkedin}
              />
              <span className="contact__link-text">LinkedIn</span>
            </a>
          </li>
        </ul>
      </ContactWrapper>
    </Layout>
  )
}

export default Contact
