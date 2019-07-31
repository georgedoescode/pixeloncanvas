import React from "react"

import styled from "styled-components"

const Sketch = styled.div`
  background: #fff;
  padding: 1.25rem;
  border-radius: 4px;

  .sketch-title {
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-size: 1.25rem;

    span {
      font-weight: 400;
    }
  }

  .sketch-text-content {
    ul {
      list-style: none;
      list-style-position: inside;

      li {
        margin: 1rem 0;
      }
    }

    p {
      margin: 1rem 0;
    }
  }
`

export default ({ children }) => {
  return <Sketch>{children}</Sketch>
}
