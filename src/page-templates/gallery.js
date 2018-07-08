import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'react-emotion'
import rehypeReact from 'rehype-react'

import MainLayout from 'components/MainLayout'

const renderAst = new rehypeReact({
  createElement, // components: { 'gaiama-image': GaimaImage },
}).Compiler

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 48.7%);
  grid-gap: 1rem;
  align-items: center;

  > * {
    margin-top: 1rem;
  }
`

const GridItem = styled.div`
  order: ${props =>
    props.isSelected && props.index % 2 === 1 ? props.index - 2 : props.index};
  ${props =>
    props.aspectRatio < 0.7 &&
    `
      grid-row: span 2;
      align-self: center;
    `};
  ${props =>
    props.isSelected &&
    `
      grid-row: span 2;
      grid-column: span 2;
    `};
`

class RenderGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: null,
    }
  }

  selectItem = index => () => {
    this.setState({ index: this.state.index === index ? null : index })
  }

  render() {
    return (
      <Grid>
        {this.props.images.length &&
          this.props.images.map(({ image }, index) => (
            <GridItem
              key={image.fluid.src}
              aspectRatio={image.fluid.aspectRatio}
              onClick={this.selectItem(index)}
              isSelected={this.state.index === index}
              index={index}
            >
              <Img fluid={image.fluid} />
            </GridItem>
          ))}
      </Grid>
    )
  }
}

RenderGrid.propTypes = {
  images: PropTypes.array.isRequired,
}

const GalleryPage = props => (
  <MainLayout {...props}>
    {renderAst(props.data.page.htmlAst)}
    <RenderGrid images={props.data.page.frontmatter.assets} />
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
    ...MainLayoutDependencies

    page: markdownRemark(
      fields: { slug: { eq: $path } }
      frontmatter: { lang: { eq: $lang } }
    ) {
      ...requiredMarkdownFields
      frontmatter {
        title
        assets {
          image: childImageSharp {
            original {
              width
              height
            }
            fluid(maxWidth: 800, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
