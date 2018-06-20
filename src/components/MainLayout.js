import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery } from 'gatsby'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import styled from 'react-emotion'
// import {  } from 'react-spring'

// // import SEO from '../components/SEO'
// import { rotate, UpDown, UpDownWide, waveAnimation } from '../styles/animations'
import { colors, fonts, media, textSizes } from '../theme'
import '../styles/global'

const Background = styled.div`
  label: bg;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  :after {
    content: '';
    background: #00000040;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .gatsby-image-wrapper {
    min-height: 100vh;
    min-width: 100vw;
  }
`

const Container = styled.div`
  label: container;
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* width: 800px;
  margin: 0 auto; */
`

const Header = styled.header`
  label: header;
  ${media.greaterThan(`small`)} {
    /* display: flex; */
    width: 740px;
  }
  margin: 0 auto;
  position: relative;

  .gatsby-image-outer-wrapper {
    display: flex;
    justify-content: center;
  }

  h2 {
    margin-top: 0;
  }
`

const Logo = styled(Img)`
  label: logo;
  width: 110px;
  height: 110px;
  ${media.greaterThan(`medium`)} {
    width: 150px;
    height: 150px;
  }
  :before {
    content: '';
    background: ${colors.green};
    background: radial-gradient(${colors.black} 4%, ${colors.green});
    position: absolute;
    top: -0.4rem;
    width: 95%;
    height: 95%;
    border-radius: 0 0 50% 50%;
    left: 2.5%;
    border: 1px solid #eefee9;
  }
`

const SiteTitle = styled.h2`
  label: site-title;
  color: ${colors.white};
  text-shadow: 2px 2px 0px ${colors.black}, 4px 5px 3px ${colors.black};

  font-family: ${fonts.accent};
  text-align: center;

  ${media.greaterThan(`small`)} {
    font-size: ${textSizes.xxxxl};
  }

  ${media.greaterThan(`medium`)} {
    font-size: ${textSizes.xxxxxl};
  }
`

const TwoColumns = styled.div`
  label: two-columns;
  margin: 2rem auto 0;
  ${media.greaterThan(`medium`)} {
    display: flex;
    width: 740px;
  }
`

const MainMenu = styled.ul`
  label: main-menu;
  list-style: none;
  /* width: 8rem; */
  height: 100%;
  background: ${colors.white};
  box-shadow: 4px 5px 6px ${colors.black};
  padding: 0;
  display: flex;

  ${media.greaterThan(`medium`)} {
    padding: 1rem 0;
    display: block;
    margin-right: 3rem;

    li + li {
      margin-top: 1rem;
    }
  }

  a {
    display: block;
    padding: 0.5rem;
    color: ${colors.black};
    text-decoration: none;
    white-space: nowrap;

    ${media.greaterThan(`medium`)} {
      padding: 0.5rem 1rem;
    }

    &:hover {
      background: ${colors.green};
      color: ${colors.white};
    }
  }
`

const Main = styled.div`
  label: main;
  width: 100%;
  min-height: 60vh;
  margin-top: 1.5rem;

  ${media.greaterThan(`medium`)} {
    margin-top: 0;
  }

  /* * + * {
    margin-top: 1rem;
  } */

  .custom-block-quote {
    background: ${colors.white};
    box-shadow: 3px 3px 3px ${colors.black};
    padding: 1.5rem;
    .custom-block-heading {
      font-family: ${fonts.accent};
      font-size: ${textSizes.xxxl};
      color: ${colors.greenDarker};
    }
    .custom-block-body {
    }
  }

  .custom-block-quote + .custom-block-quote {
    margin-top: 2rem;
  }
`

const Footer = styled.footer`
  label: footer;
  margin: 2rem auto 0;
  padding: 1rem;
  color: ${colors.white};
  text-align: center;
  ${media.greaterThan(`medium`)} {
    width: 800px;
  }

  a {
    color: ${colors.white};
  }
`

const LanguageMenu = styled.ul`
  label: language-menu;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  list-style: none;

  li {
    padding: 0.3rem 0.5rem;
  }
  a {
    color: ${colors.white};
  }
`

const LegalMenu = styled.ul`
  label: legal-menu;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  font-size: ${textSizes.sm};
  li {
    margin: 0 0.5rem;
  }

  a {
    color: ${colors.white};
  }
`

const getLangTitleById = (langs, id) => {
  const lang = langs.find(({ node }) => node.id === id)
  return lang ? lang.node.title : ``
}

class Wrapper extends React.Component {
  getMainMenu() {
    const mainMenu = this.props.data.mainMenu.edges
    if (!mainMenu.length) return null
    return (
      <MainMenu>
        {mainMenu.map(({ node: m }) => (
          <li key={m.fields.slug}>
            <Link to={m.fields.slug}>{m.frontmatter.title}</Link>
          </li>
        ))}
      </MainMenu>
    )
  }

  getLanguageMenu() {
    const { translations } = this.props.data.page.fields
    if (!translations.length) return null
    return (
      <LanguageMenu>
        {translations.map(m => (
          <li key={m.fields.slug}>
            <Link to={m.fields.slug}>
              {getLangTitleById(this.props.languages, m.frontmatter.lang)}
            </Link>
          </li>
        ))}
      </LanguageMenu>
    )
  }

  getLegalMenu() {
    const legalMenu = this.props.data.legalMenu.edges
    if (!legalMenu.length) return null
    return (
      <LegalMenu>
        {legalMenu.map(({ node: m }) => (
          <li key={m.fields.slug}>
            <Link to={m.fields.slug}>{m.frontmatter.title}</Link>
          </li>
        ))}
      </LegalMenu>
    )
  }

  render() {
    const { bg, logo, children } = this.props
    return (
      <React.Fragment>
        {/* <SEO /> */}
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css?family=Caveat:400,700"
            rel="stylesheet"
          />
        </Helmet>

        <Container>
          <Header>
            <Logo fluid={logo.image.fluid} />
            <SiteTitle>Rescue Amazonian Rainforest</SiteTitle>
            {this.getLanguageMenu()}
          </Header>

          <TwoColumns>
            {this.getMainMenu()}
            <Main>{children}</Main>
          </TwoColumns>

          <Footer>{this.getLegalMenu()}</Footer>
        </Container>

        <Background>
          <Img fluid={bg.image.fluid} />
        </Background>
      </React.Fragment>
    )
  }
}
Wrapper.propTypes = {
  bg: PropTypes.shape({
    image: PropTypes.object.isRequired,
  }).isRequired,
  logo: PropTypes.shape({
    image: PropTypes.object.isRequired,
  }).isRequired,
  languages: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
}

const MainLayout = ({ children, ...props }) => (
  <StaticQuery
    query={graphql`
      query MainLayoutQuery {
        languages: allLanguagesYaml {
          edges {
            node {
              id
              title
              iso
            }
          }
        }

        bg: file(
          relativePath: {
            regex: "/35426598_2134176226801833_1481922592255246336_n.jpg/"
          }
        ) {
          image: childImageSharp {
            fluid(maxWidth: 2048, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }

        logo: file(relativePath: { regex: "/RAR_LOGO.*.png/" }) {
          image: childImageSharp {
            fluid(maxWidth: 201, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={({ languages, bg, logo }) => (
      <Wrapper bg={bg} logo={logo} languages={languages.edges} {...props}>
        {children}
      </Wrapper>
    )}
  />
)

MainLayout.propTypes = {
  data: PropTypes.shape({
    mainMenu: PropTypes.object,
    page: PropTypes.object,
    legalMenu: PropTypes.object,
  }),
}

export default MainLayout

export const Fragments = graphql`
  fragment mainMenu on RootQueryType {
    mainMenu: allMarkdownRemark(
      filter: {
        fields: { isPage: { eq: true } }
        frontmatter: { menu: { eq: "main" }, lang: { eq: $lang } }
      }
      sort: { fields: [frontmatter___order] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }

  fragment legalMenu on RootQueryType {
    legalMenu: allMarkdownRemark(
      filter: {
        fields: { isPage: { eq: true } }
        frontmatter: { menu: { eq: "legal" }, lang: { eq: $lang } }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }

  fragment requiredMarkdownFields on MarkdownRemark {
    htmlAst
    fields {
      translations {
        frontmatter {
          lang
        }
        fields {
          slug
        }
      }
    }
  }
`
