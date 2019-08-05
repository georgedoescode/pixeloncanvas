import React from "react"
import styled from "styled-components"

const Nav = styled.nav`
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  background: #fff;

  p {
    line-height: 1;
    font-weight: 300;
  }

  @media only screen and (max-width: 720px) {
    height: 4rem;
  }
`

export default () => {
  return <Nav></Nav>
}
