import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import rehypeReact from 'rehype-react'

import MainLayout from 'components/MainLayout'

const renderAst = new rehypeReact({
  createElement,
  // components: { 'gaiama-image': GaimaImage },
}).Compiler

const AboutPage = props => (
  <MainLayout {...props}>{renderAst(props.data.page.htmlAst)}</MainLayout>
)

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

// prettier-ignore
export const query = graphql`
  query AboutPageQuery(
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
      }
    }
  }
`
