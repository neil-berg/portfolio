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
            href="mailto:neil@neilberg.dev"
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
  background-color: #272c35;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23535558' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");

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
