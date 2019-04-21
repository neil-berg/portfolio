import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faCode,
  faComments,
  faPhone,
} from "@fortawesome/free-solid-svg-icons"

import { StyledLink } from "../styles/link.css"

const SmallNav = styled.nav`
  width: 100vw;

  ul {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px var(--black) solid;
    border-bottom: 1px var(--black) solid;

    li {
      flex: 1;
    }

    li a {
      padding: 0.75rem 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      .link-icon {
        font-size: 1.25rem;
      }
    }
  }

  @media screen and (min-width: 600px) {
    display: none;
  }
`

const Dropdown = () => {
  return (
    <SmallNav>
      <ul>
        <li>
          <StyledLink to="/projects">
            <FontAwesomeIcon className="link-icon" icon={faCode} />
            <span className="link-text">projects</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/blog">
            <FontAwesomeIcon className="link-icon" icon={faComments} />
            <span className="link-text">thoughts</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/contact">
            <FontAwesomeIcon className="link-icon" icon={faPhone} />
            <span className="link-text">contact</span>
          </StyledLink>
        </li>
      </ul>
    </SmallNav>
  )
}

export default Dropdown
