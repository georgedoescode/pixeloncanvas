import React, { useState, useRef } from "react"
import { graphql } from "gatsby"
import Modal from "react-modal"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Masonry from "react-masonry-css"
import Gallery from "../components/Gallery"
import Sketch from "../components/Sketch"
import Video from "../components/Video"
import Nav from "../components/Nav"

const breakPointColsObj = {
  default: 5,
  1920: 4,
  1440: 3,
  1140: 2,
  720: 1,
}

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: 0,
  },
}

Modal.setAppElement(`#___gatsby`)

/* 
  this is a little weird, but we dont want react-masonry applying initial widths
  to columns as it will cause a FOUC in the live environment
*/

let isLive = false

try {
  if (window) {
    isLive = true
  }
} catch (e) {
  console.log(`We are in the build stage!`)
}

const IndexPage = ({ data }) => {
  const sketches = data.allMarkdownRemark.edges

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImg, setLightboxImg] = useState(``)
  const [focused, setFocused] = useState(false)

  const galleryItems = sketches.map(({ node: sketch }) => {
    const { title, thumb, date, video } = sketch.frontmatter
    const { html } = sketch

    return (
      <Sketch onMouseOver={() => setFocused(true)} key={sketch.id}>
        <h3 className="sketch-title">
          {title} - <span>{date}</span>
        </h3>
        {/* Video or static sketch */}
        {video !== null ? (
          <Video
            src={video.publicURL}
            aspectRatio={thumb.childImageSharp.fluid.aspectRatio}
            poster={thumb.childImageSharp.fixed.src}
          ></Video>
        ) : (
          <Img fluid={thumb.childImageSharp.fluid}></Img>
        )}

        <div className="sketch-text-content">
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
          <p
            onClick={() => {
              setLightboxImg(thumb.childImageSharp.fluid.originalImg)
              setLightboxOpen(true)
            }}
            className="view-original"
          >
            FULL-RES
          </p>
        </div>
      </Sketch>
    )
  })

  return (
    <>
      <SEO title="Home"></SEO>
      <Nav></Nav>
      <main>
        {isLive && (
          <Gallery>
            {/* <div className="header">
              <h1>Sketchbook</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas luctus condimentum elit, eget posuere orci. Nam ut
                sodales urna, ac gravida ligula. Vestibulum nibh leo, ultricies
                a augue vel, semper consequat sapien. Duis placerat gravida diam
                a scelerisque. Aliquam luctus, sem vel iaculis ornare, neque
                massa feugiat velit, nec dictum justo tortor vitae est.
              </p>
            </div> */}
            <Masonry
              breakpointCols={breakPointColsObj}
              className="sketches-masonry-grid"
              columnClassName="sketches-masonry-grid_column"
            >
              {galleryItems}
            </Masonry>
          </Gallery>
        )}
        <Modal
          isOpen={lightboxOpen}
          onRequestClose={() => setLightboxOpen(false)}
          style={modalStyles}
        >
          <img style={{ height: "40vmax" }} src={lightboxImg}></img>
        </Modal>
      </main>
    </>
  )
}

export default IndexPage

export const query = graphql`
  {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: [DESC] }) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
            thumb {
              id
              childImageSharp {
                fluid(maxWidth: 500) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  originalImg
                  originalName
                  presentationWidth
                  presentationHeight
                }
                fixed(width: 500) {
                  src
                }
              }
            }
            video {
              publicURL
            }
          }
        }
      }
    }
  }
`
