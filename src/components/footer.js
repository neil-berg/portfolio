import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 1px grey solid;

  .email {
    text-decoration: none;
    color: var(--white);
    font-size: 1.25em;
    padding: 1em 0;
    transition: color 0.2s linear;
  }

  ul {
    display: flex;
    align-items: center;
    list-style-type: none;
    padding-bottom: 0.5em;

    li a {
      color: var(--white);
      font-size: 1.5em;
      padding: 1em;
      transition: color 0.2s linear;
    }
  }

  @media (hover: hover) {
    .email:hover,
    li a:hover {
      color: var(--lightred);
    }
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <a className="email" href="mailto:neil.berg14@gmail.com">
        Email
      </a>
      <ul className="social">
        <li>
          <a href="https://github.com/neil-berg">
            <FontAwesomeIcon className="social-icon" icon={faGithub} />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/_neilberg">
            <FontAwesomeIcon className="social-icon" icon={faTwitter} />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/neil-berg-43135b55/">
            <FontAwesomeIcon className="social-icon" icon={faLinkedin} />
          </a>
        </li>
      </ul>
    </StyledFooter>
  )
}

export default Footer
