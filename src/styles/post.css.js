import styled from "styled-components"

export const StyledPost = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;

  img {
    display: block;
    margin: 0 auto;
  }

  h2 {
    text-align: left;
    padding-bottom: 1rem;
    font-size: 2.5em;
  }

  h3 {
    color: var(--lightred);
    padding: 0.5rem 0;
    border-bottom: 1px grey solid;
  }

  h4 {
    padding: 0.5rem 0;
    color: var(--yellow);
  }

  p {
    padding: 0.5rem 0;
    line-height: 1.3em;
    font-size: 1.1em;
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
`
