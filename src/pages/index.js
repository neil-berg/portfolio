import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import SEO from "../components/seo"

const Classes = {
  Container: 'landing-name-container',
  Name: 'landing-name',
  Nav: 'landing-nav',
  NavList: 'landing-nav-list',
  NavListItem: 'landing-nav-list-item',
}

const Home = () => {
  const [animate, setAnimate] = React.useState(false);
  const [reanimate, setReanimate] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {setAnimate(true)}, 250)
    setTimeout(() => {setReanimate(true)}, 500)
  }, [])

  return (
    <StyledHome animate={animate} reanimate={reanimate}>
      <SEO title="Home" keywords={[`neil`, `berg`, `developer`]} />
      <div className={Classes.Container}>
        <span className={Classes.Name}>Neil Berg</span>
        <nav className={Classes.Nav}>
          <ul className={Classes.NavList}>
            <li className={Classes.NavListItem}>
              <StyledLink to='/projects'>projects</StyledLink>
            </li>
            <li className={Classes.NavListItem}>
              <StyledLink to='/blog'>thoughts</StyledLink>
            </li>
            <li className={Classes.NavListItem}>
              <StyledLink to='/about'>about</StyledLink>
            </li>
            <li className={Classes.NavListItem}>
              <StyledLink to='/contact'>contact</StyledLink>
            </li>
          </ul>
        </nav>
      </div>
    </StyledHome>
  )
}
export default Home

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  font-weight: bold;
`

const StyledHome = styled.div`
  position: relative;
  height: 100vh;
  background: linear-gradient(to right, transparent, rgba(39, 44, 53, 0.8)), url("https://images.unsplash.com/photo-1496504175726-c7b4523c7e81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2180&q=80");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .${Classes.Container} {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  .${Classes.Name} {
    text-transform: lowercase;
    color: var(--yellow);
    font-size: 36px;
    font-weight: bold;
  }

  .${Classes.NavList} {
    list-style: none;
    margin-top: 16px;
  }

  .${Classes.NavListItem} {
    width: 100%;
    text-align: right;
    text-transform: lowercase;
    font-size: 18px;
    margin-bottom: 8px;
    opacity: ${(props) => props.animate ? 1 : 0};
    color: ${(props) => props.reanimate ? 'var(--white)' : 'var(--lightred)'};
    transition-property: color, opacity;
    transition-duration: 250ms;
    transition-timing-function: ease-in-out;
    
    :nth-of-type(1) {
      transition-delay: 0ms;
    }
    :nth-of-type(2) {
      transition-delay: 150ms;
    }
    :nth-of-type(3) {
      transition-delay: 300ms;
    }
    :nth-of-type(4) {
      transition-delay: 450ms;
    }
  }
`

