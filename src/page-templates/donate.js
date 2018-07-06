import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import rehypeReact from 'rehype-react'
import styled from 'react-emotion'
import MainLayout from 'components/MainLayout'
import PayPal from 'components/PayPal'

const PaypalButton = styled(PayPal)`
  display: flex;
  align-items: center;
`

const BankDetails = styled.div`
  margin-top: 4rem;
`

const renderAst = new rehypeReact({
  createElement,
  // components: { 'pay-pal': PayPal },
}).Compiler

const Donate = props => (
  <MainLayout {...props}>
    <PaypalButton
      currency={props.data.page.fields.language.currency}
      language={props.data.page.fields.language.iso}
      logo={
        props.data.site.siteMetadata.siteUrl + props.data.logo.image.fluid.src
      }
    >
      <div>
        {/* <select name="item_name"> */}
        {/* <option value="RAR">Rescue Amazonian Rainforest</option> */}
        {props.data.projects.frontmatter.partials.map(({ partial }) => (
          <div key={partial.frontmatter.reference}>
            <label>
              <input
                type="radio"
                name="item_name"
                value={partial.frontmatter.reference}
                required
              />
              {partial.frontmatter.title}
            </label>
          </div>
        ))}
        {/* </select> */}
      </div>
    </PaypalButton>

    <BankDetails>{renderAst(props.data.page.htmlAst)}</BankDetails>
  </MainLayout>
)

Donate.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Donate

// prettier-ignore
export const query = graphql`
  query DonateQuery(
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

    projects: markdownRemark(
      frontmatter: {
        layout: { eq: "projects" }
        lang: { eq: $lang }
      }
    ) {
      frontmatter {
        partials {
          partial: childMarkdownRemark {
            frontmatter {
              title
              reference
            }
          }
        }
      }
    }
  }
`
