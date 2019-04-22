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

  h1 {
    color: var(--black);
    color: var(--white);
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
        color: var(--red);
      }
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

  @media screen and (min-width: 650px) {
    h1 {
      text-align: left;
      &:hover {
        color: var(--red);
      }
      &:hover .slash {
        color: var(--white);
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
      <SmallNav location={location} />
    </React.Fragment>
  )
}

export default Header
