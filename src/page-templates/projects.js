import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import rehypeReact from 'rehype-react'
import styled from 'react-emotion'
import MainLayout from 'components/MainLayout'
import PayPal from 'components/PayPal'
import { media } from '../theme'
// import { fonts } from '../theme'

const renderAst = new rehypeReact({
  createElement,
  components: {
    'pay-pal': PayPal,
  },
}).Compiler

const Card = styled.div`
  label: card;
  ${media.greaterThan(`small`)} {
    display: flex;
  }

  & + & {
    margin-top: 5rem;
  }
`

// const CardTitle = styled.h4`
//   label: card-title;
//   /* font-family: ${fonts.accent}; */
//   font-size: 1.15rem;
//   text-align: center;
// `

const CardMeta = styled.div`
  label: card-meta;
  /* float: left;
  margin: 0.5rem 2rem 1rem 0; */
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.greaterThan(`small`)} {
    margin-right: 2rem;
  }
`

const H2 = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 1rem;
`

const CardTitleMobile = styled(H2)`
  margin-bottom: 2rem;
  text-align: center;
  ${media.greaterThan(`small`)} {
    display: none;
  }
`
const CardTitleDesktop = styled(H2)`
  ${media.lessThan(`small`)} {
    display: none;
  }
`

const CardContent = styled.div`
  label: card-content;
  /* margin-top: ${({ hasTitle }) => hasTitle && `2rem`}; */
  ${media.lessThan(`small`)} {
    margin-top: 2rem;
  }
`

const PaypalButton = styled(PayPal)`
  margin-top: 2rem;
`

const BankReference = styled.div`
  margin-top: 2rem;
  font-size: 0.9rem;
  text-align: center;
`

const BankDetails = styled.div`
  margin-top: 4rem;
`

const RenderPartials = ({ partials, referenceLabel, language, logo }) =>
  partials.map(({ partial }, i) => (
    <Card key={i}>
      {/* {partial.frontmatter.title && (
        <CardTitle>{partial.frontmatter.title}</CardTitle>
      )} */}

      <CardMeta>
        <CardTitleMobile>{partial.frontmatter.title}</CardTitleMobile>

        {partial.frontmatter.image && (
          <Img fixed={partial.frontmatter.image.image.fixed} />
        )}

        <PaypalButton
          reference={partial.frontmatter.reference}
          currency={language.currency}
          language={language.iso}
          logo={logo}
        />

        <BankReference>
          {referenceLabel}
          <br />
          <strong>{partial.frontmatter.reference}</strong>
        </BankReference>
      </CardMeta>

      <CardContent hasTitle={!!partial.frontmatter.title}>
        <CardTitleDesktop>{partial.frontmatter.title}</CardTitleDesktop>
        {renderAst(partial.htmlAst)}
      </CardContent>
    </Card>
  ))

RenderPartials.propTypes = {
  partials: PropTypes.array.isRequired,
  referenceLabel: PropTypes.string.isRequired,
  language: PropTypes.object.isRequired,
  logo: PropTypes.string.isRequired,
}

const RenderContentOrPartials = ({ page, logo }) =>
  page.frontmatter.partials && page.frontmatter.partials.length ? (
    <RenderPartials
      partials={page.frontmatter.partials}
      referenceLabel={page.frontmatter.referenceLabel}
      language={page.fields.language}
      logo={logo}
    />
  ) : page.htmlAst ? (
    <Card>{renderAst(page.htmlAst)}</Card>
  ) : null

RenderContentOrPartials.propTypes = {
  page: PropTypes.object.isRequired,
  logo: PropTypes.string.isRequired,
}

const ProjectsPage = props => (
  <MainLayout {...props}>
    <RenderContentOrPartials
      page={props.data.page}
      logo={
        props.data.site.siteMetadata.siteUrl + props.data.logo.image.fluid.src
      }
    />

    <BankDetails>{renderAst(props.data.donationPage.htmlAst)}</BankDetails>
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
    ...MainLayoutDependencies

    page: markdownRemark(
      fields: { slug: { eq: $path } }
      frontmatter: { lang: { eq: $lang } }
    ) {
      ...requiredMarkdownFields
      frontmatter {
        title
        referenceLabel
        partials {
          partial: childMarkdownRemark {
            frontmatter {
              title
              reference
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

    donationPage: markdownRemark(
      frontmatter: {
        lang: { eq: $lang }
        layout: { eq: "donate" }
      }
    ) {
      htmlAst
    }
  }
`
