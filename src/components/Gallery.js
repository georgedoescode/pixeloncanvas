import styled from "styled-components"

export default styled.section`
  padding: 1.5rem;
  margin: 0 auto;

  @media only screen and (max-width: 720px) {
    padding: 1.5rem 0;
  }

  .header {
    width: 100%;
    background: #fff;
    margin-bottom: 1.5rem;
    padding: 1rem;
    /* min-height: 400px; */
    border: 2px solid #222;
    padding-bottom: 2rem;
    width: 66.66666666666666%;

    h1 {
      font-size: 2.25rem;
      margin-bottom: 1.5rem;
      margin-top: 0.5rem;
      line-height: 1;
    }

    p {
      font-size: 1rem;
      /* max-width: 75%; */
    }
  }
`
