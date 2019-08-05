import React from "react"
import styled from "styled-components"

const Nav = styled.nav`
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  background: #fff;
  padding: 0 25.5px;

  @media only screen and (max-width: 720px) {
    height: 5rem;
    padding: 0 1rem;
  }

  p {
    line-height: 1;
    font-weight: 400;
    font-family: "Space Mono";
    font-size: 1.125rem;
    background: #111;
    color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0.5rem 0.75rem;

    @media only screen and (max-width: 720px) {
      font-size: 1rem;
    }
  }
`

export default () => {
  return (
    <Nav>
      <p className="logo">
        p<span>!</span>xeloncanvas
      </p>
    </Nav>
  )
}
