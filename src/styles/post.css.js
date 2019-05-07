import styled from "styled-components"

export const StyledPost = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;

  h2 {
    text-align: center;
    padding-bottom: 1rem;
  }

  h3 {
    color: var(--lightred);
    padding: 0.5rem 0;
  }

  h4 {
    padding: 0.5rem 0;
  }

  p {
    padding: 0.5rem 0;
    line-height: 1.3em;
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

  @media (hover: hover) {
    a:hover {
      color: var(--lightred);
      border-bottom: 1px var(--lightred) solid;
    }
  }
`
