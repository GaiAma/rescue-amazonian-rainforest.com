import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import styled from 'react-emotion'
import SEO from '../components/SEO'
// import {  } from 'react-spring'
// import { rotate, UpDown, UpDownWide, waveAnimation } from '../styles/animations'
import { colors, fonts, media, textSizes } from '../theme'
import SVG from './SVG.jsx'
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
    background: rgba(0, 0, 0, 0.35);
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
  /* position: relative; */

  .gatsby-image-outer-wrapper {
    display: flex;
    justify-content: center;
  }

  h2 {
    margin-top: 0;
  }
`

const Logo = styled.div`
  label: logo;
  position: relative;
  margin: 0 auto;
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
  img {
    position: relative;
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
`

const MainMenu = styled.div`
  label: main-menu;
  background: ${colors.white};
  margin: 2rem auto 0;
  overflow: hidden;
  height: 2.3rem;
  /* box-shadow: 4px 5px 6px ${colors.black}; */
  ${media.greaterThan(`small`)} {
    background: linear-gradient(90deg, transparent, #fff, #fff, #fff, transparent);
  }
  ${media.greaterThan(`medium`)} {
    width: 1050px;
    background: linear-gradient(90deg, transparent, #fff, transparent);
  }

  ul {
    list-style: none;
    overflow-x: scroll;
    height: 200%;
    padding: 0;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    /* width: 360px; */
    ${media.greaterThan(`small`)} {
      width: 490px;
    }
  }

  li {
    height: 50%;
  }

  a {
    display: block;
    height: 2.3rem;
    padding: 0.55rem 0.5rem;
    color: ${colors.black};
    text-decoration: none;
    white-space: nowrap;
    line-height: 1.2;

    ${media.greaterThan(`medium`)} {
      padding: 0.6rem 1rem;
    }

    &:hover, &.active {
      background: ${colors.green};
      color: ${colors.white};
    }
  }
`

const Main = styled.div`
  label: main;
  width: 100%;
  min-height: 60vh;
  margin: 1.5rem auto 0;
  padding: 0.5rem;
  background: ${colors.white};

  ${media.greaterThan(`medium`)} {
    padding: 3rem;
    width: 740px;
  }

  /* ${media.greaterThan(`medium`)} {
    margin-top: 0;
  } */

  /* > * + * { margin-top: 1.5rem; } */

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
  margin: 1rem auto 0;
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
  display: flex;
  list-style: none;
  padding: 0;

  ${media.lessThan(`medium`)} {
    flex-direction: column;
    text-align: right;
  }

  li {
    margin: 0.3rem 0.1rem;

    ${media.greaterThan(`medium`)} {
      margin: 0.3rem 0.5rem;
    }
  }

  a {
    background: #fff;
    padding: 0.4rem;
    font-size: 0.9rem;
    border-radius: 3px;
  }
`

const MetaMenu = styled.div`
  label: meta-menu;
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  right: 0;
  ${media.lessThan(`medium`)} {
    flex-direction: column-reverse;
  }
  ${media.greaterThan(`medium`)} {
    top: 0.5rem;
    right: 1rem;
  }
`

const LegalMenu = styled.ul`
  label: legal-menu;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  font-weight: 700;
  li {
    margin: 0 0.5rem;
  }

  a {
    color: ${colors.white};
  }
`

const FB = styled.a`
  display: grid;
  margin: 0.3rem 0.5rem;
  /* position: absolute;
  top: 0.5rem;
  left: 0.5rem; */
`

const getLangTitleById = (langs, id) => {
  const lang = langs.find(({ node }) => node.id === id)
  return lang ? lang.node.title : ``
}

class Wrapper extends React.Component {
  componentDidMount() {
    process.env.NODE_ENV !== `production` && console.log(this.props)
  }

  getMainMenu() {
    const mainMenu = this.props.data.mainMenu.edges
    if (!mainMenu.length) return null
    return (
      <MainMenu>
        <ul>
          {mainMenu.map(({ node: m }) => (
            <li key={m.fields.slug}>
              <Link to={m.fields.slug} activeClassName="active" exact>
                {m.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
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
              {getLangTitleById(
                this.props.data.languages.edges,
                m.frontmatter.lang
              )}
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
    const {
      data: { bg, logo, logoSvg, site, page },
      children,
    } = this.props

    return (
      <React.Fragment>
        <SEO
          siteUrl={site.siteMetadata.siteUrl}
          pageTitle={page.frontmatter.title}
          siteTitle={site.siteMetadata.title}
          siteTitleAlt={site.siteMetadata.titleAlt}
          description={``}
          image={logo.image.fluid.src}
          language={page.fields.language}
        />

        <Container>
          <Header>
            {/* <Logo fluid={logo.image.fluid} /> */}
            <Logo>
              <img src={logoSvg.publicURL} />
            </Logo>
            <SiteTitle>Rescue Amazonian Rainforest</SiteTitle>
            <MetaMenu>
              <FB href="https://www.facebook.com/RescueAmazonianRainforestGug">
                <SVG icon="facebook" fill={colors.white} width={7} />
              </FB>
              {this.getLanguageMenu()}
            </MetaMenu>
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
  // bg: PropTypes.shape({
  //   image: PropTypes.object.isRequired,
  // }).isRequired,
  // logo: PropTypes.shape({
  //   image: PropTypes.object.isRequired,
  // }).isRequired,
  // languages: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
}

const MainLayout = ({ children, ...props }) => (
  // <StaticQuery
  //   query={graphql`
  //     query MainLayoutQuery {
  //       languages: allLanguagesYaml {
  //         edges {
  //           node {
  //             id
  //             title
  //             iso
  //           }
  //         }
  //       }

  //       bg: file(
  //         relativePath: {
  //           regex: "/35426598_2134176226801833_1481922592255246336_n.jpg/"
  //         }
  //       ) {
  //         image: childImageSharp {
  //           fluid(maxWidth: 2048, quality: 75) {
  //             ...GatsbyImageSharpFluid_withWebp
  //           }
  //         }
  //       }

  //       logo: file(relativePath: { regex: "/RAR_LOGO.*.png/" }) {
  //         image: childImageSharp {
  //           fluid(maxWidth: 201, quality: 75) {
  //             ...GatsbyImageSharpFluid_withWebp_tracedSVG
  //           }
  //         }
  //       }
  //     }
  //   `}
  //   render={({ languages, bg, logo }) => (
  // <Wrapper bg={bg} logo={logo} languages={languages.edges} {...props}>
  <Wrapper {...props}>{children}</Wrapper>
  //   )}
  // />
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
  fragment MainLayoutDependencies on RootQueryType {
    site {
      siteMetadata {
        title
        titleAlt
        siteUrl
      }
    }

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

    logoSvg: file(relativePath: { regex: "/logo.svg/" }) {
      publicURL
    }

    logo: file(relativePath: { regex: "/logo.png/" }) {
      image: childImageSharp {
        fluid(maxWidth: 201, quality: 75) {
          ...GatsbyImageSharpFluid
        }
      }
    }

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
      language {
        iso
        currency
      }
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
