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
import { colors, media } from '../theme'
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

const Header = styled.div`
  label: header;
  /* ${media.greaterThan(`xsmall`)} { */
  display: flex;
  /* } */
  width: 580px;
  margin: 0 auto;

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
  ${media.greaterThan(`xsmall`)} {
    width: 165px;
    height: 165px;
  }
  :before {
    content: '';
    background: #12662a;
    position: absolute;
    top: -0.4rem;
    width: 100%;
    height: 95%;
    border-radius: 0 0 50% 50%;
    left: 2.5%;
  }
`

const SiteTitle = styled.h2`
  label: site-title;
  color: ${colors.white};
  text-shadow: 2px 2px 0px ${colors.black};

  font-family: 'Caveat', cursive;
  text-align: center;

  ${media.greaterThan(`xsmall`)} {
    font-size: 3.5rem;
  }
`

const TwoColumns = styled.div`
  label: two-columns;
  width: 890px;
  margin: 0 auto;
  ${media.greaterThan(`xsmall`)} {
    display: flex;
  }
`

const MainMenu = styled.div`
  label: main-menu;
  list-style: none;
  max-width: 25%;
  margin-right: 3rem;
  ${media.lessThan(`xsmall`)} {
    display: flex;
  }
  li {
    background: ${colors.white90};
  }
  li + li {
    margin-top: 1rem;
  }

  a {
    padding: 0.3rem 1rem;
    display: block;
    color: ${colors.black};
    text-decoration: none;

    &:hover {
      color: ${colors.green};
    }
  }
`

const Main = styled.div`
  label: main;
  background: ${colors.white90};
  padding: 0.3rem 1.2rem;
  width: 100%;
`

const Footer = styled.footer`
  label: footer;
  width: 800px;
  margin: 0 auto;
`

const LanguageMenu = styled.div`
  label: language-menu;
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
    if (!this.props.mainMenu.length) return null
    return this.props.mainMenu.map(({ node: m }) => (
      <li key={m.fields.slug}>
        <Link to={m.fields.slug}>{m.frontmatter.title}</Link>
      </li>
    ))
  }

  getLanguageMenu() {
    const { translations } = this.props
    if (!translations.length) return null
    return (
      <ul>
        {translations.map(x => (
          <li key={x.fields.slug}>
            <Link to={x.fields.slug}>
              {getLangTitleById(this.props.languages, x.frontmatter.lang)}
            </Link>
          </li>
        ))}
      </ul>
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
          </Header>

          <TwoColumns>
            <MainMenu>{this.getMainMenu()}</MainMenu>
            <Main>{children}</Main>
          </TwoColumns>

          <Footer>
            <LanguageMenu>{this.getLanguageMenu()}</LanguageMenu>
          </Footer>
        </Container>

        <Background>
          <Img fluid={bg.image.fluid} />
        </Background>
      </React.Fragment>
    )
  }
}
Wrapper.propTypes = {
  languages: PropTypes.array.isRequired,
  mainMenu: PropTypes.array.isRequired,
  bg: PropTypes.shape({
    image: PropTypes.object.isRequired,
  }).isRequired,
  logo: PropTypes.shape({
    image: PropTypes.object.isRequired,
  }).isRequired,
  translations: PropTypes.array.isRequired,
}

const MainLayout = ({ mainMenu, translations, children }) => (
  <StaticQuery
    query={graphql`
      query IndexQuery {
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
      <Wrapper
        languages={languages.edges}
        mainMenu={mainMenu.edges}
        bg={bg}
        logo={logo}
        translations={translations}
      >
        {children}
      </Wrapper>
    )}
  />
)

MainLayout.propTypes = {
  translations: PropTypes.array.isRequired,
  mainMenu: PropTypes.shape({
    edges: PropTypes.array,
  }),
}

export default MainLayout

export const Fragments = graphql`
  fragment mainMenu on RootQueryType {
    mainMenu: allMarkdownRemark(
      filter: { frontmatter: { menu: { eq: "main" }, lang: { eq: "en" } } }
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
