import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import { colorPalettes } from "../data/colorPalettes"
import { navItems } from "../data/navItems"
import { StyledLink } from "../styles/link.css"

const Header = ({ location }) => {
  // All defined pages have a color palette
  // For 404 pages, just use the index.js palette
  const paths = Object.keys(colorPalettes)
  const currentPage = `/${location.pathname.split("/")[1]}`
  const colorPalette = paths.includes(currentPage)
    ? colorPalettes[currentPage]
    : colorPalettes["/"]

  const renderNavList = navItems.map((item, idx) => {
    return (
      <li
        key={idx}
        className="nav__item--large"
        style={{
          color:
            item.path === currentPage ? colorPalette.activeLink : `var(--grey)`,
        }}
      >
        <StyledLink className="nav__link--large" to={item.path}>
          {item.name}
        </StyledLink>
      </li>
    )
  })
  return (
    <StyledHeader colorPalette={colorPalette} className="header">
      <h1 className="header__name">
        <StyledLink className="header__link" to="/">
          <span className="header__firstname">neil</span>
          <span className="header__slash"> / </span>
          <span className="header__lastname">berg</span>
        </StyledLink>
      </h1>

      <nav className="nav">
        <ul className="nav-list">{renderNavList}</ul>
      </nav>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--darkgrey);
  border-bottom: 1px solid var(--mediumgrey);

  .header__name {
    margin-bottom: 20px;
  }

  .header__firstname {
    color: ${props => props.colorPalette.firstName};
    transition: color 0.3s ease;
  }

  .header__lastname {
    color: ${props => props.colorPalette.lastName};
    transition: color 0.3s ease;
  }

  .header__slash {
    color: ${props => props.colorPalette.slash};
    transition: color 0.3s ease;
  }

  .nav-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 300px;
    list-style-type: none;
  }

  .nav__item--large {
    padding: 0 0.5rem 0.25rem 0.5rem;
    margin: 0 0.5rem;
    font-size: 1.2em;
    font-weight: bold;
  }

  @media screen and (min-width: 500px) {
    .header__name {
      text-align: left;
    }

    .nav-list {
      max-width: 500px;
      justify-content: unset;
    }
  }

  @media (hover: hover) {
    .header__name:hover .header__firstname {
      color: ${props => props.colorPalette.firstNameHover};
    }
    .header__name:hover .header__slash {
      color: ${props => props.colorPalette.slashHover};
    }
    .header__name:hover .header__lastname {
      color: ${props => props.colorPalette.lastNameHover};
    }

    .header__name:hover .link__slash {
      color: var(--white);
    }

    .nav__link--large:hover {
      color: var(--white);
    }
  }
`

Header.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Header
