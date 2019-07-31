import React from "react"
import styled from "styled-components"

const Nav = styled.nav`
  width: 100%;
  height: 4.5rem;
  padding: 0 2.25rem;
  display: flex;
  align-items: center;
  background: #fff;

  p {
    line-height: 1;
    font-weight: 300;
  }
`

export default () => {
  return (
    <Nav>
      <p>pixeloncanvas</p>
    </Nav>
  )
}
