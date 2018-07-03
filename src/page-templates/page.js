import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import rehypeReact from 'rehype-react'
import styled from 'react-emotion'
import MainLayout from 'components/MainLayout'
import PayPal from 'components/PayPal'
import { fonts } from '../theme'

const renderAst = new rehypeReact({
  createElement,
  components: {
    'pay-pal': PayPal,
  },
}).Compiler

const Card = styled.div`
  label: card;
  /* padding: 3rem; */

  .gatsby-image-outer-wrapper {
    float: right;
    margin: 2.5rem 0 0 1rem;
  }

  & + & {
    margin-top: 3rem;

    .gatsby-image-outer-wrapper {
      float: left;
      margin: 2.5rem 2rem 1rem 0;
    }
  }
`

const CardTitle = styled.h4`
  label: card-title;
  /* font-family: ${fonts.accent}; */
  font-size: 1.15rem;
  text-align: center;
`

const CardImage = styled(Img)``

const CardContent = styled.div`
  label: card-content;
  margin-top: ${({ hasTitle }) => hasTitle && `2rem`};
`

const RenderPartials = ({ partials }) =>
  partials.map(({ partial }, i) => (
    <Card key={i}>
      {partial.frontmatter.title && (
        <CardTitle>{partial.frontmatter.title}</CardTitle>
      )}

      {partial.frontmatter.image && (
        <CardImage fixed={partial.frontmatter.image.image.fixed} />
      )}

      <CardContent hasTitle={!!partial.frontmatter.title}>
        {renderAst(partial.htmlAst)}
      </CardContent>
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
    ...MainLayoutDependencies

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
                  fixed(width: 200, quality: 75) {
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
