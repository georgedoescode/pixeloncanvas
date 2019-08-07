import React, { useState } from "react"
import { graphql } from "gatsby"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Masonry from "react-masonry-css"
import Gallery from "../components/Gallery"
import Sketch from "../components/Sketch"
import Video from "../components/Video"
import Nav from "../components/Nav"

const breakPointColsObj = {
  default: 5,
  2160: 4,
  1700: 3,
  1280: 2,
  860: 1,
}

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

  const galleryItems = sketches.map(({ node: sketch }) => {
    const { title, thumb, date, video } = sketch.frontmatter
    const { html } = sketch
    const [focus, setFocus] = useState(false)

    return (
      <Sketch
        isFocused={focus}
        onMouseOver={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
        key={sketch.id}
      >
        <h3 className="sketch-title">
          {title} - <span>{date}</span>
        </h3>
        {/* Video or static sketch */}
        {video !== null ? (
          <Video
            src={video.publicURL}
            aspectRatio={thumb.childImageSharp.fluid.aspectRatio}
            poster={thumb.childImageSharp.fluid}
            focus={focus}
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
            <Masonry
              breakpointCols={breakPointColsObj}
              className="sketches-masonry-grid"
              columnClassName="sketches-masonry-grid_column"
            >
              {galleryItems}
            </Masonry>
          </Gallery>
        )}
        {lightboxOpen && (
          <Lightbox
            mainSrc={lightboxImg}
            onCloseRequest={() => setLightboxOpen(false)}
            enableZoom={false}
          ></Lightbox>
        )}
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
                fluid(maxWidth: 800) {
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
