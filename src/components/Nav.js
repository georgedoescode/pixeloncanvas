import React from "react"
import styled from "styled-components"

const Nav = styled.nav`
  width: 100%;
  /* height: 5.5rem; */
  display: flex;
  align-items: center;
  /* background: #fff; */
  padding: 2rem 25.5px 0.5rem;
  /* border-bottom: 2px solid #222; */

  @media only screen and (max-width: 720px) {
    /* padding: 0 1rem; */
    padding: 1.5rem 1rem 0rem;
  }

  p {
    line-height: 1;
    font-weight: 400;
    font-family: "Space Mono";
    font-size: 1rem;
    background: #fff;
    color: #111;
    /* -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; */
    padding: 0.625rem 0.75rem;
    border: 2px solid #111;

    @media only screen and (max-width: 720px) {
      font-size: 0.75rem;
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
