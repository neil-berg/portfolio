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

import { navItems } from "../data/navItems"
import { colorPalettes } from "../data/colorPalettes"
import { StyledLink } from "../styles/link.css"

library.add(faCode, faComments, faUserAstronaut, faPhone)

const SmallNav = ({ location }) => {
  const currentPage = `/${location.pathname.split("/")[1]}`
  const colorPalette = colorPalettes[currentPage]

  const navList = navItems.map((item, idx) => {
    return (
      <li className="nav__item--small" key={idx}>
        <StyledLink className="nav__link--small" to={item.path}>
          <FontAwesomeIcon
            className="nav__link-icon"
            icon={item.icon}
            style={{
              color:
                item.path === currentPage
                  ? colorPalette.activeLink
                  : `var(--grey)`,
            }}
          />
          <span
            className="nav__link-text"
            style={{
              color:
                item.path === currentPage
                  ? colorPalette.activeLink
                  : `var(--grey)`,
            }}
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
    width: 17px;
    height: 17px;
  }

  .nav__link-text {
    font-size: 1rem;
    font-weight: bold;
    text-transform: lowercase;
    color: var(--lightgrey);
  }

  @media screen and (min-width: 800px) {
    display: none;
  }
`

SmallNav.propTypes = {
  location: PropTypes.object.isRequired,
}

export default SmallNav
