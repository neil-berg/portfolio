import React, { useRef, useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import { animated, useTransition } from "react-spring"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Home = ({ location }) => {
  const ref = useRef([])
  const [items, set] = useState([])
  const transitions = useTransition(items, null, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: "perspective(600px) rotateX(0deg)",
      color: "#a5a4a0",
    },
    enter: [
      {
        opacity: 1,
        height: 60,
        innerHeight: 60,
      },
      {
        transform: "perspective(600px) rotateX(180deg)",
        color: "#ffedaa",
      },
      {
        transform: "perspective(600px) rotateX(0deg)",
      },
    ],
    leave: [
      { color: "#7a99ec" },
      { innerHeight: 0 },
      { opacity: 0, height: 0 },
    ],
    update: { color: "#f7a194" },
  })

  const reset = useCallback(() => {
    ref.current.map(clearTimeout)
    ref.current = []
    set([])
    ref.current.push(setTimeout(() => set(["Hello", "&", "Welcome"]), 0))
    ref.current.push(setTimeout(() => set(["Hello", "Welcome"]), 3000))
    ref.current.push(
      setTimeout(
        () =>
          set(["Hello", "Software", "Engineer", "LA, CA", "Welcome"]),
        6000
      )
    )
  }, [])

  useEffect(() => void reset(), [])

  return (
    <Layout location={location} showFooter={true}>
      <SEO title="Home" keywords={[`neil`, `berg`, `developer`]} />
      <LandingWrapper>
        <div className="animation-container">
          {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
            <animated.div
              className="transitions-item"
              key={key}
              style={rest}
              onClick={reset}
            >
              <animated.div className="item-container">{item}</animated.div>
            </animated.div>
          ))}
        </div>
      </LandingWrapper>
    </Layout>
  )
}

const LandingWrapper = styled.div`
  /* Small screens: Height of container is
  based on 100vh minus height of header (65px)
  navbar (63px) and footer (110)px */
  height: calc(100vh - 65px - 63px - 110px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  .animation-container {
    max-width: 400px;
  }

  .item-container {
    margin: 0 auto;
  }

  .transitions-item {
    margin: 0 auto;
    overflow: hidden;
    width: 100%;
    max-width: 300px;
    color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 3.5em;
    font-weight: 800;
    text-transform: lowercase;
    will-change: transform, opacity, height;
    white-space: nowrap;
    cursor: pointer;
    line-height: 80px;
    &:not(:last-of-type) {
      padding-bottom: 12px;
    }
  }

  @media screen and (min-width: 650px) {
    /* Larger screens: Height of container is
    based on 100vh minus height of header (65px)
    and footer (110)px */
    height: calc(100vh - 65px - 110px);
  }
`

export default Home
