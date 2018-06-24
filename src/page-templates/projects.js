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
  display: flex;

  & + & {
    margin-top: 5rem;
  }
`

const CardTitle = styled.h4`
  label: card-title;
  /* font-family: ${fonts.accent}; */
  font-size: 1.15rem;
  text-align: center;
`

const CardMeta = styled.div`
  /* float: left;
  margin: 0.5rem 2rem 1rem 0; */
  margin-right: 2rem;
`

const CardContent = styled.div`
  label: card-content;
  margin-top: ${({ hasTitle }) => hasTitle && `2rem`};
`

const RenderPartials = ({ partials, referenceLabel }) =>
  partials.map(({ partial }, i) => (
    <Card key={i}>
      {partial.frontmatter.title && (
        <CardTitle>{partial.frontmatter.title}</CardTitle>
      )}

      <CardMeta>
        {partial.frontmatter.image && (
          <Img fixed={partial.frontmatter.image.image.fixed} />
        )}
        <p>
          {referenceLabel}
          <br />
          <strong>{partial.frontmatter.reference}</strong>
        </p>
        <div>
          <form
            action="https://www.paypal.com/cgi-bin/webscr"
            method="post"
            target="_top"
          >
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input
              type="hidden"
              name="hosted_button_id"
              value="P3TVVSJU7TZ2L"
            />
            <input
              type="image"
              src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
              border="0"
              name="submit"
              alt="PayPal - The safer, easier way to pay online!"
            />
            <img
              alt=""
              border="0"
              src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif"
              width="1"
              height="1"
            />
          </form>
        </div>
      </CardMeta>

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
    <RenderPartials
      partials={page.frontmatter.partials}
      referenceLabel={page.frontmatter.referenceLabel}
    />
  ) : page.htmlAst ? (
    <Card>{renderAst(page.htmlAst)}</Card>
  ) : null

RenderContentOrPartials.propTypes = {
  page: PropTypes.object.isRequired,
}

const ProjectsPage = props => (
  <MainLayout {...props}>
    <RenderContentOrPartials page={props.data.page} />
    <div>
      <pre>
        {`Spendenkonto bei der Sparkasse Essen:

RESCUE AMAZONIAN RAINFOREST gUG

Konto: 223 883
BLZ: 360 501 05
IBAN: DE26 3605 0105 0000 2238 83
BIC: SPESDE3EXXX

Als Buchungsvermerk bitte den jeweiligen Projektnamen und den Zusatz „Spende“ angeben.`}
      </pre>
    </div>
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
      frontmatter {
        referenceLabel
        partials {
          partial: childMarkdownRemark {
            frontmatter {
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
  }
`
