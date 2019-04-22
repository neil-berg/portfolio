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

  background-color: #f6f3ea;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='30' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23aeaeae' stroke-width='1.8' %3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E");

  .email {
    text-decoration: none;
    color: var(--black);
    font-size: 1.25em;
    padding: 0.5em 0;
  }

  ul {
    display: flex;
    align-items: center;
    list-style-type: none;
    padding-bottom: 0.5em;

    li a {
      color: var(--black);
      font-size: 1.5em;
      padding: 0.5em;
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
