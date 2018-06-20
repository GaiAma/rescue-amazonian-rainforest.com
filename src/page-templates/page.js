import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import rehypeReact from 'rehype-react'
import styled from 'react-emotion'
import MainLayout from 'components/MainLayout'
import { colors } from '../theme'

const renderAst = new rehypeReact({
  createElement,
  // components: { 'gaiama-image': GaimaImage },
}).Compiler

const Card = styled.div`
  background: ${colors.white};
  padding: 1rem;
`

const RenderPartials = ({ partials }) =>
  partials.map(({ partial }, i) => (
    <Card key={i}>
      <h4>{partial.frontmatter.title}</h4>
      {partial.frontmatter.image && (
        <div>
          <Img fixed={partial.frontmatter.image.image.fixed} />
        </div>
      )}
      {renderAst(partial.htmlAst)}
    </Card>
  ))

RenderPartials.propTypes = {
  partials: PropTypes.array.isRequired,
}

const RenderContentOrPartials = ({ page }) =>
  page.frontmatter.partials && page.frontmatter.partials.length ? (
    <RenderPartials partials={page.frontmatter.partials} />
  ) : page.htmlAst ? (
    <Card>{renderAst(page.htmlAst)}</Card>
  ) : null

RenderContentOrPartials.propTypes = {
  page: PropTypes.object.isRequired,
}

const Page = props => (
  <MainLayout {...props}>
    {console.log(`page`, props)}
    <RenderContentOrPartials page={props.data.page} />
  </MainLayout>
)

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

// prettier-ignore
export const query = graphql`
  query PageQuery(
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
      frontmatter {
        partials {
          partial: childMarkdownRemark {
            frontmatter {
              title
              image {
                image: childImageSharp {
                  fixed(width: 100, quality: 75) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
            htmlAst
          }
        }
      }
    }
  }
`
