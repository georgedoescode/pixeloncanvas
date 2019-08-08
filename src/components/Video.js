import React, { useRef, useState } from "react"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import Img from "gatsby-image"
import PlayIcon from "../images/play.svg"

const Video = styled.div`
  position: relative;
  margin: 1.25rem 0 1.5rem 0;
  cursor: pointer;

  .video-area {
    position: relative;

    &:hover {
      svg {
        fill: #fff;
      }
    }

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      pointer-events: none;
      fill: #000;
      stroke: #000;
      stroke-width: 1px;
      width: 4rem;
      height: 4rem;
      /* transition: transform 200ms ease-out; */
    }
  }

  .video-padding {
    width: 100%;
    padding-bottom: ${props => 100 / props.aspectRatio}%;
  }

  .gatsby-image-wrapper {
    opacity: ${props => props.played && 0};
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
    triggerOnce: true,
  })
  const [playing, setPlaying] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)

  const videoEl = useRef(null)

  function videoPlayToggle() {
    setHasPlayed(true)
    if (!playing) {
      videoEl.current.play()
      setPlaying(true)
    } else {
      videoEl.current.pause()
      setPlaying(false)
    }
  }

  return (
    <Video
      onClick={() => videoPlayToggle()}
      played={hasPlayed}
      ref={ref}
      aspectRatio={aspectRatio}
      inView={inView}
    >
      {inView && (
        <div className="video-area">
          {!playing && <PlayIcon></PlayIcon>}
          <video preload="auto" ref={videoEl} muted playsInline loop>
            <source src={src} type="video/mp4"></source>
          </video>
          <Img fluid={poster}></Img>
        </div>
      )}
    </Video>
  )
}
