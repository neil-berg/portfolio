import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"

import { SmallNav } from './smallnav'
import { colorPalettes } from "../data/colorPalettes"
import { navItems } from "../data/navItems"
import { StyledLink } from "../styles/link.css"

library.add(faBars, faTimes)

const Classes = {
  InnerContainer: 'header-inner-container',
  Name: 'header-name',
  FirstName: 'header-first-name',
  LastName: 'header-last-name',
  Slash: 'header-slash',
  Nav: 'nav',
  NavList: 'nav-list',
  NavItem: 'nav-list-item',
  NavItemLink: 'nav-list-item-link',
  MenuButton: 'menu-button',
  MenuButtonIcon: 'menu-button-icon',
  CloseBackdrop: 'menu-close-backdrop'
}

const Header = ({ location }) => {
  // State to toggle the mobile nav menu
  const [showMenu, setShowMenu] = React.useState(false);

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
        className={Classes.NavItem}
        style={{
          color:
            item.path === currentPage ? colorPalette.activeLink : `var(--grey)`,
        }}
      >
        <StyledLink className={Classes.NavItemLink}to={item.path}>
          {item.name}
        </StyledLink>
      </li>
    )
  })
  return (
    <StyledHeader colorPalette={colorPalette}>
      <div className={Classes.InnerContainer}>
        <h1 className={Classes.Name}>
          <StyledLink to="/">
            <span className={Classes.FirstName}>neil</span>
            <span className={Classes.Slash}> / </span>
            <span className={Classes.LastName}>berg</span>
          </StyledLink>
        </h1>

        <button className={Classes.MenuButton} onClick={() => setShowMenu(!showMenu)}>
          <FontAwesomeIcon 
            className={Classes.MenuButtonIcon} 
            icon={showMenu ? "times" : "bars"} 
          />
        </button>

        <nav className={Classes.Nav}>
          <ul className={Classes.NavList}>{renderNavList}</ul>
        </nav>
      </div>
      <SmallNav showMenu={showMenu} currentPage={currentPage} />
      {showMenu && 
        <div 
          role='button' 
          className={Classes.CloseBackdrop} 
          onClick={() => setShowMenu(false)}
        />}
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  max-width: 100vw;
  height: 82px;
  display: flex;
  justify-content: center;
  padding: 1rem;
  background: var(--darkgrey);
  border-bottom: 2px solid var(--mediumgrey);

  .${Classes.InnerContainer} {
    width: 800px;
    max-width: 800px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  .${Classes.FirstName} {
    color: ${props => props.colorPalette.firstName};
    transition: color 0.3s ease;
  }

  .${Classes.LastName} {
    color: ${props => props.colorPalette.lastName};
    transition: color 0.3s ease;
  }

  .${Classes.Slash} {
    color: ${props => props.colorPalette.slash};
    transition: color 0.3s ease;
  }

  .${Classes.MenuButton} {
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    cursor: pointer;
  }

  .${Classes.MenuButtonIcon} {
    height: 26px;
    width: 26px;

    path {
      color: white;
    }
  }
  
  .${Classes.Nav} {
    display: none;
  }

  .${Classes.NavList} {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 300px;
    list-style-type: none;
  }

  .${Classes.NavItem} {
    padding: 0 0.5rem 0.25rem 0.5rem;
    margin: 0 0.5rem;
    font-size: 1.2em;
    font-weight: bold;
  }

  .${Classes.CloseBackdrop} {
    position: fixed;
    top: 0;
    left: 0;
    min-width: 100vw;
    min-height: 100vh;
    background-color: transparent;
    z-index: 2
  }

  @media screen and (min-width: 800px) {
    height: unset;

    .${Classes.InnerContainer} {
      padding: 30px 0px;
    }

    .${Classes.Nav} {
      display: block;
    }

    .${Classes.MenuButton} {
      display: none;
    }

    .${Classes.CloseBackdrop} {
      display: none;
    }
  }

  @media screen and (min-width: 500px) {
    .${Classes.Name} {
      text-align: left;
    }

    .${Classes.NavList} {
      max-width: 500px;
      justify-content: unset;
    }
  }

  @media (hover: hover) {
    .${Classes.Name}:hover .${Classes.FirstName} {
      color: ${props => props.colorPalette.firstNameHover};
    }
    .${Classes.Name}:hover .${Classes.Slash} {
      color: ${props => props.colorPalette.slashHover};
    }
    .${Classes.Name}:hover .${Classes.LastName} {
      color: ${props => props.colorPalette.lastNameHover};
    }

    .${Classes.NavItemLink}:hover {
      color: var(--white);
    }
  }
`

Header.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Header
