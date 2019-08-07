import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import Img from "gatsby-image"

const Video = styled.div`
  position: relative;
  margin: 1.25rem 0 1.5rem 0;

  .video-padding {
    width: 100%;
    padding-bottom: ${props => 100 / props.aspectRatio}%;
  }

  .gatsby-image-wrapper {
    opacity: ${props => props.hasHovered && 0};
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

export default ({ src, aspectRatio, poster, focus }) => {
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  })
  const [hasHovered, setHasHovered] = useState(false)

  const videoEl = useRef(null)

  useEffect(() => {
    if (focus) {
      videoEl.current.play()
      setHasHovered(true)
    } else {
      if (hasHovered) videoEl.current.pause()
    }
  })

  return (
    <Video
      ref={ref}
      aspectRatio={aspectRatio}
      inView={inView}
      hasHovered={hasHovered}
    >
      {/* <div className="video-padding"></div> */}
      {inView && (
        <>
          <video ref={videoEl} muted playsInline loop>
            <source src={src} type="video/mp4"></source>
          </video>
          <Img fluid={poster}></Img>
        </>
      )}
    </Video>
  )
}
