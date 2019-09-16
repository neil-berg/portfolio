import React from "react"
import styled from "styled-components"
import { animated, useSpring } from "react-spring"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Contact = ({ location }) => {
  // Animations for each contact link
  const emailAnimationProps = useSpring({
    from: {
      opacity: 0,
      transform: `translate3d(-50px, -50px, 0)`,
      color: "var(--white)",
    },
    to: {
      opacity: 1,
      transform: `translate3d(0, 0, 0)`,
      color: "var(--white)",
    },
  })

  const githubAnimationProps = useSpring({
    from: {
      opacity: 0,
      transform: `translate3d(50px, -50px, 0)`,
      color: "var(--white)",
    },
    to: {
      opacity: 1,
      transform: `translate3d(0, 0, 0)`,
      color: "var(--oatmeal)",
    },
  })

  const twitterAnimationProps = useSpring({
    from: {
      opacity: 0,
      transform: `translate3d(-50px, 50px, 0)`,
      color: "var(--white)",
    },
    to: {
      opacity: 1,
      transform: `translate3d(0, 0, 0)`,
      color: "var(--blue)",
    },
  })

  const linkedinAnimationProps = useSpring({
    from: {
      opacity: 0,
      transform: `translate3d(50px, 50px, 0)`,
      color: "var(--white)",
    },
    to: {
      opacity: 1,
      transform: `translate3d(0, 0, 0)`,
      color: "var(--lightred)",
    },
  })

  return (
    <Layout location={location} showFooter={false}>
      <SEO title="Contact" />

      <ContactWrapper className="contact">
        <p className="contact__intro">
          Interested in working together? I'd love to hear from you.{" "}
        </p>
        <ul className="contact__list">
          <animated.li className="contact__item" style={emailAnimationProps}>
            <a className="contact__link" href="mailto:neil@neilberg.dev">
              <FontAwesomeIcon
                className="contact__link-icon"
                icon={faEnvelope}
              />
              <span className="contact__link-text">Email</span>
            </a>
          </animated.li>
          <animated.li className="contact__item" style={githubAnimationProps}>
            <a
              className="contact__link"
              href="https://github.com/neil-berg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon className="contact__link-icon" icon={faGithub} />
              <span className="contact__link-text">Github</span>
            </a>
          </animated.li>
          <animated.li className="contact__item" style={twitterAnimationProps}>
            <a
              className="contact__link"
              href="https://twitter.com/_neilberg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                className="contact__link-icon"
                icon={faTwitter}
              />
              <span className="contact__link-text">Twitter</span>
            </a>
          </animated.li>
          <animated.li className="contact__item" style={linkedinAnimationProps}>
            <a
              className="contact__link"
              href="https://www.linkedin.com/in/neil-berg-43135b55/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                className="contact__link-icon"
                icon={faLinkedin}
              />
              <span className="contact__link-text">LinkedIn</span>
            </a>
          </animated.li>
        </ul>
      </ContactWrapper>
    </Layout>
  )
}

const ContactWrapper = styled(animated.div)`
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
    padding: 1rem 0;
    display: flex;
    align-items: center;
  }

  .contact__link-icon {
    font-size: 1.5em;
  }

  .contact__link-text {
    padding: 0 1rem;
    font-size: 1.2em;
  }
`

export default Contact
