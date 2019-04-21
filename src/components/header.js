import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import Dropdown from "./dropdown"
import { StyledLink } from "../styles/link.css"

const StyledHeader = styled.header`
  display: flex;
  align-items: baseline;
  padding: 0.5rem 1rem;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    color: var(--black);
    flex: 1;
    text-align: center;
  }

  .slash {
    color: var(--red);
    transition: color 0.2s linear;
  }

  .nav-large {
    display: none;

    ul {
      display: flex;
      list-style-type: none;
    }

    ul li {
      padding: 0 0.5rem 0.25rem 0.5rem;
      margin: 0 0.5rem;
      font-weight: bold;
      transition: border 0.3s linear;
      border-bottom: none;
      &:hover {
        color: var(--red);
      }
    }

    ul li.selected {
      border-bottom: 1px var(--red) solid;
    }
  }

  .nav-small {
    display: block;
    width: 100vw;
    border: 1px red solid;

    ul {
      display: flex;
      list-style-type: none;
    }
  }

  @media screen and (min-width: 600px) {
    h1 {
      text-align: left;
      &:hover {
        color: var(--red);
      }
      &:hover .slash {
        color: var(--black);
      }
    }

    .nav-large {
      display: block;
    }
  }
`

const Header = ({ location }) => {
  const currentPath = location.pathname.split("/")[1]
  const navItems = [
    {
      name: "projects",
      path: "/projects",
    },
    {
      name: "thoughts",
      path: "/blog",
    },
    {
      name: "contact",
      path: "/contact",
    },
  ]
  const renderNavList = navItems.map((item, idx) => {
    return (
      <li
        key={idx}
        className={item.path.split("/")[1] === currentPath ? "selected" : ""}
      >
        <StyledLink to={item.path}>{item.name}</StyledLink>
      </li>
    )
  })
  return (
    <React.Fragment>
      <StyledHeader>
        <h1>
          <StyledLink to="/">
            neil <span className="slash">/</span> berg
          </StyledLink>
        </h1>

        <nav className="nav-large">
          <ul>{renderNavList}</ul>
        </nav>
      </StyledHeader>
      <Dropdown />
    </React.Fragment>
  )
}

export default Header
