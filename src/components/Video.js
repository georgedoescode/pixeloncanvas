import React from "react"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"

const Video = styled.div`
  position: relative;
  margin: 1.25rem 0 1.5rem 0;

  .video-padding {
    width: 100%;
    padding-bottom: ${props => 100 / props.aspectRatio}%;
    background-image: url(${props => props.poster});
    background-size: cover;
  }

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default ({ src, aspectRatio, poster }) => {
  const [ref, inView] = useInView({
    threshold: 0,
  })

  console.log(inView)
  return (
    <Video ref={ref} aspectRatio={aspectRatio} poster={poster}>
      <div className="video-padding"></div>
      {inView && <video src={src} autoPlay muted playsInline loop></video>}
    </Video>
  )
}
