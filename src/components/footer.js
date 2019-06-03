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
  justify-content: space-between;
  border-top: 1px grey solid;
  height: 110px;
  padding: 1rem;

  .footer__link-email {
    text-decoration: none;
    color: var(--white);
    font-size: 1.25em;
    transition: color 0.2s linear;
  }

  .footer__list-social {
    display: flex;
    align-items: center;
    list-style-type: none;
    padding-bottom: 0.5em;
  }

  .footer__link-social {
    color: var(--white);
    font-size: 1.5em;
    padding: 0 1em;
    transition: color 0.2s linear;
  }

  @media (hover: hover) {
    .footer__link-email:hover,
    .footer__link-social:hover {
      color: var(--lightred);
    }
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <a className="footer__link-email" href="mailto:neil.berg14@gmail.com">
        Email
      </a>
      <ul className="footer__list-social">
        <li className="footer__social-item">
          <a
            className="footer__link-social"
            href="https://github.com/neil-berg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon className="footer__social-icon" icon={faGithub} />
          </a>
        </li>
        <li className="footer__social-item">
          <a
            className="footer__link-social"
            href="https://twitter.com/_neilberg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon className="footer__social-icon" icon={faTwitter} />
          </a>
        </li>
        <li className="footer__social-item">
          <a
            className="footer__link-social"
            href="https://www.linkedin.com/in/neil-berg-43135b55/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              className="footer__icon-social"
              icon={faLinkedin}
            />
          </a>
        </li>
      </ul>
    </StyledFooter>
  )
}

export default Footer
