import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"

const Video = styled.div`
  position: relative;
  margin: 1.25rem 0 1.5rem 0;

  .video-padding {
    width: 100%;
    padding-bottom: ${props => 100 / props.aspectRatio}%;
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

export default ({ src, aspectRatio, focus }) => {
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
    <Video ref={ref} aspectRatio={aspectRatio} inView={inView}>
      <div className="video-padding"></div>
      {inView && (
        <video
          preload="auto"
          ref={videoEl}
          src={src}
          muted
          playsInline
          loop
        ></video>
      )}
    </Video>
  )
}
