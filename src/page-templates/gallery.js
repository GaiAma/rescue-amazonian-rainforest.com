import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import rehypeReact from 'rehype-react'

import MainLayout from 'components/MainLayout'

const renderAst = new rehypeReact({
  createElement,
  // components: { 'gaiama-image': GaimaImage },
}).Compiler

const GalleryPage = ({ data: { mainMenu, page, ...rest }, ...props }) => (
  <MainLayout mainMenu={mainMenu} translations={page.fields.translations}>
    {console.log(`gallery`, props)}
    {renderAst(page.htmlAst)}
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

    page: markdownRemark(
      fields: { slug: { eq: $path } }
      frontmatter: { lang: { eq: $lang } }
    ) {
      ...requiredMarkdownFields
    }
  }
`
