import React from "react"
import styled, {css} from "styled-components"
import PropTypes from "prop-types"

import { navItems } from "../data/navItems"
import { StyledLink } from "../styles/link.css"

const Classes = {
  Nav: 'small-nav',
  List: 'small-nav-list',
  ListItem: 'small-nav-list-item',
  ListItemLink: 'small-nav-list-item-link',
  ListItemText: 'small-nav-list-item-text',
}

export const SmallNav = ({ showMenu, currentPage }) => {
  return (
    <StyledSmallNav showMenu={showMenu}>
      <ul className={Classes.List}>
        {navItems.map((item, idx) => {
          return (
            <li className={Classes.ListItem} key={idx}>
              <StyledLink className={Classes.ListItemLink} to={item.path}>
                <span
                  className={Classes.ListItemText}
                  style={{
                    color:
                      item.path === currentPage
                        ? `var(--yellow)`
                        : `var(--white)`,
                  }}
                >
                  {item.name}
                </span>
              </StyledLink>
            </li>
          )
        })}
      </ul>
    </StyledSmallNav>
  )
}

const StyledSmallNav = styled.nav`
  position: absolute;
  top: 82px;
  left: 0;
  display: flex;
  background: var(--blue);
  width: 100%;
  max-width: 100vw;
  z-index: 3;
  max-height: 0;
  overflow-y: hidden;
  transition: all 400ms ease 0s;

  ${props => props.showMenu && css`
    padding: 30px 0;
    max-height: 296px;
  `}
  
  .${Classes.List} {
    width: 100%;
    list-style-type: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .${Classes.ListItem} {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
  }

  .${Classes.ListItemText} {
    font-size: 18px;
    font-weight: bold;
    text-transform: lowercase;
    color: var(--lightgrey);
  }

  @media screen and (min-width: 800px) {
    display: none;
  }
`

SmallNav.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  currentPage: PropTypes.string.isRequired,
}
