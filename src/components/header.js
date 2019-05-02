import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import SmallNav from "./smallnav"
import { StyledLink } from "../styles/link.css"

const StyledHeader = styled.header`
  display: flex;
  align-items: baseline;
  padding: 0.5rem 1rem;
  max-width: 800px;
  margin: 0 auto;
  z-index: 999;
  background: var(--black);

  h1 {
    color: var(--white);
    flex: 1;
    text-align: center;
  }

  .slash {
    color: var(--lightred);
    transition: color 0.2s linear;
  }

  .nav-large {
    display: none;

    ul {
      display: flex;
      list-style-type: none;

      li {
        padding: 0 0.5rem 0.25rem 0.5rem;
        margin: 0 0.5rem;
        color: var(--white);
        font-size: 1.3em;
        &:hover {
          color: var(--grey);
        }
      }

      li.selected {
        color: var(--lightred);
      }
    }
  }

  .nav-small {
    display: block;
    width: 100vw;

    ul {
      display: flex;
      list-style-type: none;
    }
  }

  @media screen and (min-width: 650px) {
    h1 {
      text-align: left;
    }

    .nav-large {
      display: block;
    }
  }

  @media (hover: hover) {
    h1 {
      &:hover {
        color: var(--lightred);
      }

      &:hover .slash {
        color: var(--white);
      }
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
      name: "about",
      path: "/about",
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
    <div style={{ width: "100vw", background: "var(--black)" }}>
      <StyledHeader>
        <h1>
          <StyledLink to="/">
            neil
            <span className="slash"> / </span>
            berg
          </StyledLink>
        </h1>

        <nav className="nav-large">
          <ul>{renderNavList}</ul>
        </nav>
      </StyledHeader>
      <SmallNav location={location} />
    </div>
  )
}

export default Header
