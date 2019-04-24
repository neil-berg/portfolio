import React from "react"
import styled from "styled-components"
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

const Nav = styled.nav`
  width: 100vw;
  margin-bottom: 1rem;

  ul {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px var(--grey) solid;
    border-bottom: 1px var(--grey) solid;

    li {
      flex: 1;
      color: var(--grey);
    }

    li a {
      padding: 0.75rem 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      .link-icon {
        font-size: 1.25rem;
        color: var(--grey);
      }

      .link-icon.selected {
        color: var(--lightred);
      }

      .link-text.selected {
        font-weight: bold;
        color: var(--lightred);
      }
    }
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
      <li key={idx}>
        <StyledLink to={item.path}>
          <FontAwesomeIcon
            className={
              item.path.split("/")[1] === currentPath
                ? "link-icon selected"
                : "link-icon"
            }
            icon={item.icon}
          />
          <span
            className={
              item.path.split("/")[1] === currentPath
                ? "link-text selected"
                : "link-text"
            }
          >
            {item.name}
          </span>
        </StyledLink>
      </li>
    )
  })

  return (
    <Nav>
      <ul>{navList}</ul>
    </Nav>
  )
}

export default SmallNav
