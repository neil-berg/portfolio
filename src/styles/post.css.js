import styled from "styled-components"

export const StyledPost = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 0;
  counter-reset: section-counter;

  time {
    border-left: 5px var(--lightred) solid;
    font-weight: bold;
    padding: 0.5rem;
  }

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
    padding: 1rem 0;
    font-size: 2.5em;
    color: var(--lightred);
  }

  h3 {
    text-align: center;
    color: var(--lightred);
    padding: 1.25rem 1rem;
    margin: 2rem 0;
    border-bottom: 2px var(--grey) solid;
    border-top: 2px var(--grey) solid;
  }

  h3::before {
    content: counter(section-counter, upper-roman) ". ";
    counter-increment: section-counter;
  }

  h4 {
    text-align: left;
    color: var(--oatmeal);
    padding: 0.5rem 0;
    margin: 1.5rem 0;
    font-size: 1.25em;
  }

  p {
    padding: 0.5rem 0;
    line-height: 1.45em;
    font-size: 1em;
  }

  // Add spacing between intro paragraph (second P after time) and date
  p:nth-of-type(2) {
    margin-top: 1rem;
  }

  ol,
  ul {
    margin-left: 2rem;

    li {
      line-height: 1.3em;
    }
  }

  a {
    color: var(--blue);
    text-decoration: none;
    transition: all 0.25s linear;
  }

  figcaption {
    text-align: center;
    font-style: italic;
    padding-bottom: 1.5em;
  }

  // Adjust iframe size for larger screens
  @media screen and (min-width: 600px) {
    iframe {
      width: 560px;
      height: 315px;
    }
  }

  // Add padding when scren size < max-width
  @media screen and (max-width: 800px) {
    padding: 1rem 1rem;
  }
`
