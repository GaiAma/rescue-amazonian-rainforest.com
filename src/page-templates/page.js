import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import rehypeReact from 'rehype-react'

import MainLayout from 'components/MainLayout'

const renderAst = new rehypeReact({
  createElement,
  // components: { 'gaiama-image': GaimaImage },
}).Compiler

const Page = ({ data: { mainMenu, page, ...rest }, ...props }) => (
  <MainLayout mainMenu={mainMenu} translations={page.fields.translations}>
    {console.log(`page`, { page, rest })}
    {renderAst(page.htmlAst)}
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

    page: markdownRemark(
      fields: { slug: { eq: $path } }
      frontmatter: { lang: { eq: $lang } }
    ) {
      ...requiredMarkdownFields
    }
  }
`
