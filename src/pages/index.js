import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Masonry from "react-masonry-css"
import Gallery from "../components/Gallery"
import Sketch from "../components/Sketch"
import Video from "../components/Video"

const breakPointColsObj = {
  default: 5,
  1920: 4,
  1440: 3,
  1140: 2,
  720: 1,
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

  const galleryItems = sketches.map(({ node: sketch }) => {
    const { title, thumb, date, video } = sketch.frontmatter
    const { html } = sketch

    console.log(thumb.childImageSharp.fluid.aspectRatio)
    return (
      <Sketch key={sketch.id}>
        <h3 className="sketch-title">
          {title} - <span>{date}</span>
        </h3>
        {video !== null ? (
          <Video
            src={video.publicURL}
            aspectRatio={thumb.childImageSharp.fluid.aspectRatio}
            poster={thumb.childImageSharp.fluid.base64}
          ></Video>
        ) : (
          <Img fluid={thumb.childImageSharp.fluid}></Img>
        )}

        <div className="sketch-text-content">
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      </Sketch>
    )
  })

  return (
    <>
      <SEO title="Home"></SEO>
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
