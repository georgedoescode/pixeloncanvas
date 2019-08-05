import React from "react"

import styled from "styled-components"

const Sketch = styled.div`
  background: #fff;
  padding: 1.5rem;
  border: 2px solid #222;

  @media only screen and (max-width: 720px) {
    border-left: none;
    border-right: none;
  }

  .sketch-title {
    text-transform: uppercase;
    font-size: 1.25rem;

    span {
      font-weight: 400;
    }
  }

  .gatsby-image-wrapper {
    margin: 1.25rem 0 1.5rem 0;
  }

  .sketch-text-content {
    ul {
      list-style: none;
      list-style-position: inside;

      li {
        margin: 1rem 0;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }

    p {
      margin: 1rem 0;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    .view-original {
      position: relative;
      font-family: "Space Mono";
      color: #222;
      display: inline-block;
      padding: 0.25rem 0 0.5rem 0;
      font-size: 0.875rem;
      cursor: pointer;
      overflow: hidden;

      &:after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: "";
        width: 100%;
        height: 2px;
        background: #222;
        transform: scaleX(1);
      }

      &:hover {
        &:after {
          transform: scaleX(0.75);
        }
      }
    }
  }
`

export default ({ children }) => {
  return <Sketch>{children}</Sketch>
}
