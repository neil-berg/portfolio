import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faCode,
  faComments,
  faUserAstronaut,
  faPhone,
} from "@fortawesome/free-solid-svg-icons"

import { StyledLink } from "../styles/link.css"

library.add(faCode, faComments, faUserAstronaut, faPhone)

const SmallNav = ({ location }) => {
  const currentPath = location.pathname.split("/")[1]
  const navItems = [
    {
      name: "Projects",
      path: "/projects",
      icon: "code",
    },
    {
      name: "Thoughts",
      path: "/blog",
      icon: "comments",
    },
    {
      name: "About",
      path: "/about",
      icon: "user-astronaut",
    },
    {
      name: "Contact",
      path: "/contact",
      icon: "phone",
    },
  ]
  const navList = navItems.map((item, idx) => {
    return (
      <li className="nav__item--small" key={idx}>
        <StyledLink className="nav__link--small" to={item.path}>
          <FontAwesomeIcon
            className={
              item.path.split("/")[1] === currentPath
                ? "nav__link-icon--selected"
                : "nav__link-icon"
            }
            icon={item.icon}
          />
          <span
            className={
              item.path.split("/")[1] === currentPath
                ? "nav__link-text--selected"
                : "nav__link-text"
            }
          >
            {item.name}
          </span>
        </StyledLink>
      </li>
    )
  })

  return (
    <SmallNavWrapper className="nav__menu">
      <ul className="nav__menu--small">{navList}</ul>
    </SmallNavWrapper>
  )
}

const SmallNavWrapper = styled.nav`
  width: 100vw;

  .nav__menu--small {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 2px var(--mediumgrey) solid;
    border-bottom: 2px var(--mediumgrey) solid;
    border-radius: 0 0 10px 10px;
    background: var(--darkgrey);
    box-shadow: 0px 5px 10px rgba(214, 213, 212, 0.25);
  }

  .nav__item--small {
    flex: 1;
    color: var(--lightgrey);
  }

  .nav__link--small {
    padding: 0.75rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .nav__link-icon {
    font-size: 1rem;
    color: var(--lightgrey);
  }

  .nav__link-text {
    font-size: 1rem;
    color: var(--lightgrey);
  }

  .nav__link-icon--selected {
    color: var(--lightred);
  }

  .nav__link-text--selected {
    color: var(--lightred);
  }

  @media screen and (min-width: 650px) {
    display: none;
  }
`

SmallNav.propTypes = {
  location: PropTypes.object.isRequired,
}

export default SmallNav
