import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import rehypeReact from 'rehype-react'

import MainLayout from 'components/MainLayout'

const renderAst = new rehypeReact({
  createElement,
  components: {
    // 'gaiama-image': GaimaImage,
    // 'gaiama-link': Link,
    // 'embed-video': GaimaVideo,
  },
}).Compiler

/* eslint-disable */
const Page = props => (
  <MainLayout>
    {console.log(props)}
    {renderAst(props.data.page.htmlAst)}
  </MainLayout>
)

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

// prettier-ignore
export const query = graphql`
  query AboutQuery(
    $lang: String!
    $path: String!
  ) {
    page: markdownRemark(
      fields: { slug: { eq: $path } }
      frontmatter: { lang: { eq: $lang } }
    ) {
      htmlAst
    }
  }
`
