import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import SmallNav from "./smallnav"
import { StyledLink } from "../styles/link.css"

const Header = ({ location }) => {
  const currentPath = location.pathname.split("/")[1]
  const navItems = [
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Thoughts",
      path: "/blog",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ]
  const renderNavList = navItems.map((item, idx) => {
    return (
      <li
        key={idx}
        className={`nav__item--large--${
          item.path.split("/")[1] === currentPath ? "selected" : "unselected"
        }`}
      >
        <StyledLink className="nav__link--large" to={item.path}>
          {item.name}
        </StyledLink>
      </li>
    )
  })
  return (
    <div style={{ width: "100vw" }}>
      <StyledHeader className="header">
        <h1 className="header__name">
          <StyledLink className="header__link" to="/">
            neil
            <span className="header__name-slash"> / </span>
            berg
          </StyledLink>
        </h1>

        <nav className="nav--large">
          <ul className="nav__menu--large">{renderNavList}</ul>
        </nav>
      </StyledHeader>
      <SmallNav location={location} />
    </div>
  )
}

const StyledHeader = styled.header`
  display: flex;
  align-items: baseline;
  padding: 0.5rem 0;
  max-width: 800px;
  margin: 0 auto;
  z-index: 999;
  background: #272c35;

  .header__name {
    color: var(--white);
    flex: 1;
    text-align: center;
  }

  .header__name-slash {
    color: var(--lightred);
    transition: color 0.2s linear;
  }

  .nav--large {
    display: none;
  }

  .nav__menu--large {
      display: flex;
      list-style-type: none
  }

  .nav__item--large--selected, .nav__item--large--unselected {
        padding: 0 0.5rem 0.25rem 0.5rem;
        margin: 0 0.5rem;
        color: var(--lightgrey);
        font-size: 1.3em;
      }

  .nav__item--large--selected {
        color: var(--lightred);
      }
    }
  }

  @media screen and (min-width: 650px) {
    .header__name {
      text-align: left;
    }

    .nav--large {
      display: block;
    }
  }

  @media (hover: hover) {
    .header__name:hover {
      color: var(--lightred);
    }

    .header__name:hover .header__name-slash {
      color: var(--white);
      }
    
    .nav__item--large--unselected:hover {
      color: var(--white);
    }
  }
`

Header.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Header
