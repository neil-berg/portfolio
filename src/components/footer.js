import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
  return (
    <StyledFooter>
      <ul className="icon-list">
        <li className="icon-list__item" style={{ color: "var(--white)" }}>
          <a
            className="icon-list__item-link"
            type="email"
            href="mailto:neil.berg14@gmail.com"
          >
            <FontAwesomeIcon className="icon-list__icon" icon={faEnvelope} />
          </a>
        </li>
        <li className="icon-list__item" style={{ color: "var(--oatmeal)" }}>
          <a
            className="icon-list__item-link"
            href="https://github.com/neil-berg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon className="icon-list__icon" icon={faGithub} />
          </a>
        </li>
        <li className="icon-list__item" style={{ color: "var(--blue)" }}>
          <a
            className="icon-list__item-link"
            href="https://twitter.com/_neilberg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon className="icon-list__icon" icon={faTwitter} />
          </a>
        </li>
        <li className="icon-list__item" style={{ color: "var(--lightred)" }}>
          <a
            className="icon-list__item-link"
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

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 2px var(--mediumgrey) solid;
  height: 110px;

  .icon-list {
    display: flex;
    align-items: center;
    list-style-type: none;
  }

  .icon-list__item-link {
    font-size: 1.5em;
    padding: 0 1em;
  }
`

export default Footer
