import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import styled, { css } from 'react-emotion'
import rehypeReact from 'rehype-react'

import MainLayout from 'components/MainLayout'

const renderAst = new rehypeReact({
  createElement,
  // components: { 'gaiama-image': GaimaImage },
}).Compiler

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 300px);
  grid-gap: 0.5rem;
  /* display: flex;
  flex-wrap: wrap; */

  > * {
    margin-top: 1rem;
  }
`

const RenderGrid = ({ images }) => (
  <Grid>
    {images.length &&
      images.map(({ node }) => (
        <Img
          fluid={node.image.fluid}
          key={node.image.fluid.src}
          outerWrapperClassName={css(`
          `)}
          css={`
            // width: 200px;
            img {
              flex: ${node.image.fluid.aspectRatio};
            }
          `}
        />
      ))}
  </Grid>
)

RenderGrid.propTypes = {
  images: PropTypes.array.isRequired,
}

const GalleryPage = props => (
  <MainLayout {...props}>
    {console.log(`gallery`, props)}
    {renderAst(props.data.page.htmlAst)}
    <RenderGrid images={props.data.assets.edges} />
  </MainLayout>
)

GalleryPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default GalleryPage

// prettier-ignore
export const query = graphql`
  query GalleryPageQuery(
    $lang: String!
    $path: String!
  ) {
    ...mainMenu
    ...legalMenu

    page: markdownRemark(
      fields: { slug: { eq: $path } }
      frontmatter: { lang: { eq: $lang } }
    ) {
      ...requiredMarkdownFields
    }

    assets: allFile(
      filter: { relativePath: { regex: "/gallery/assets/" } }
    ) {
      edges {
        node {
          image: childImageSharp {
            fluid(maxWidth: 400, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
