import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import rehypeReact from 'rehype-react'

import MainLayout from 'components/MainLayout'

const renderAst = new rehypeReact({
  createElement,
  // components: { 'gaiama-image': GaimaImage },
}).Compiler

const ProjectsPage = props => (
  <MainLayout {...props}>
    {console.log(`projects`, props)}
    {renderAst(props.data.page.htmlAst)}
  </MainLayout>
)

ProjectsPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ProjectsPage

// prettier-ignore
export const query = graphql`
  query ProjectsPageQuery(
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
  }
`
