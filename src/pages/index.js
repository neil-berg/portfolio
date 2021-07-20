import React from "react"
import styled, {keyframes} from "styled-components"
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

const flowAnimation = keyframes`
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  font-weight: bold;
`

const StyledHome = styled.div`
  position: relative;
  height: 100vh;
  background: linear-gradient(-45deg, var(--darkgrey), var(--mediumgrey), var(--blue), var(--lightred));
	background-size: 400% 400%;
  animation: ${flowAnimation} 7s ease infinite;

  .${Classes.Container} {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  .${Classes.Name} {
    text-transform: lowercase;
    color: var(--yellow);
    font-size: 44px;
    font-weight: bold;
  }

  .${Classes.NavList} {
    list-style: none;
    margin-top: 24px;
  }

  .${Classes.NavListItem} {
    width: 100%;
    text-align: right;
    text-transform: lowercase;
    font-size: 24px;
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

