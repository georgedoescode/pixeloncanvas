import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Masonry from "react-masonry-css"
import Gallery from "../components/Gallery"
import Sketch from "../components/Sketch"

const breakPointColsObj = {
  default: 5,
  1920: 4,
  1360: 3,
  1024: 2,
  720: 1,
}

const IndexPage = ({ data }) => {
  const sketches = data.allMarkdownRemark.edges
  return (
    <>
      <SEO title="Home"></SEO>
      <main>
        <Gallery>
          <Masonry
            breakpointCols={breakPointColsObj}
            className="sketches-masonry-grid"
            columnClassName="sketches-masonry-grid_column"
          >
            {sketches.map(({ node: sketch }) => {
              const { title, thumb, date } = sketch.frontmatter
              const { html } = sketch
              return (
                <Sketch key={sketch.id}>
                  <h3 className="sketch-title">
                    {title} - <span>{date}</span>
                  </h3>
                  <Img fluid={thumb.childImageSharp.fluid}></Img>
                  <div className="sketch-text-content">
                    <div dangerouslySetInnerHTML={{ __html: html }}></div>
                  </div>
                </Sketch>
              )
            })}
          </Masonry>
        </Gallery>
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
                fluid(maxWidth: 1200) {
                  tracedSVG
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
          }
        }
      }
    }
  }
`
