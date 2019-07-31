import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .sketches-masonry-grid {
            display: flex;
            margin-left: -24px;
            width: auto;
          }
          
          .sketches-masonry-grid_column {
            border-left: 24px solid transparent;
            background-clip: padding-box;
          }
          
          .sketches-masonry-grid_column > div {
            margin-bottom: 24px;
          }

          .gatsby-image-wrapper {
            width: 100%;
          }
        `,
          }}
        ></style>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
