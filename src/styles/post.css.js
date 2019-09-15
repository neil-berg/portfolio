import styled from "styled-components"

export const StyledPost = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;

  iframe {
    display: block;
    margin: 1rem auto;
    width: 340px;
    height: 191.25px;
  }

  img {
    display: block;
    margin: 0 auto;
  }

  h2 {
    text-align: left;
    padding-bottom: 1rem;
    font-size: 2.5em;
    color: var(--white);
  }

  h3 {
    color: var(--temp);
    padding: 0.5rem 0;
    border-bottom: 1px grey solid;
  }

  h4 {
    padding: 0.5rem 0;
    color: var(--yellow);
  }

  p {
    padding: 0.5rem 0;
    line-height: 1.5em;
    font-size: 1.2em;
  }

  ol,
  ul {
    margin-left: 2rem;

    li {
      line-height: 1.3em;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    padding-bottom: 2px;
    border-bottom: 1px var(--white) solid;
    transition: all 0.25s linear;
  }

  figcaption {
    text-align: center;
    font-style: italic;
    padding-bottom: 1.5em;
  }

  @media (hover: hover) {
    a:hover {
      color: var(--lightred);
      border-bottom: 1px var(--lightred) solid;
    }
  }

  // Adjust iframe size for larger screens
  @media screen and (min-width: 600px) {
    iframe {
      width: 560px;
      height: 315px;
    }
  }
`
