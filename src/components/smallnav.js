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

const SmallNavWrapper = styled.nav`
  width: 100vw;

  .nav__menu--small {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px var(--grey) solid;
    border-bottom: 1px var(--grey) solid;
    background: var(--black);
  }

  .nav__item--small {
    flex: 1;
    color: var(--grey);
  }

  .nav__link--small {
    padding: 0.75rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .nav__link-icon {
    font-size: 1.25rem;
    color: var(--grey);
  }

  .nav__link-icon--selected {
    font-size: 1.25rem;
    color: var(--white);
  }

  .nav__link-text--selected {
    font-weight: bold;
    color: var(--white);
  }

  @media screen and (min-width: 650px) {
    display: none;
  }
`

const SmallNav = ({ location }) => {
  const currentPath = location.pathname.split("/")[1]
  const navItems = [
    {
      name: "projects",
      path: "/projects",
      icon: "code",
    },
    {
      name: "thoughts",
      path: "/blog",
      icon: "comments",
    },
    {
      name: "about",
      path: "/about",
      icon: "user-astronaut",
    },
    {
      name: "contact",
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

SmallNav.propTypes = {
  location: PropTypes.object.isRequired,
}

export default SmallNav
