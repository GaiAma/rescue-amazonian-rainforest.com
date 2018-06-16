import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'react-emotion'
// import {  } from 'react-spring'

// // import SEO from '../components/SEO'
// import { rotate, UpDown, UpDownWide, waveAnimation } from '../styles/animations'
import { colors } from '../theme'
import '../styles/global'

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Container = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Header = styled.div`
  display: flex;
`

const Logo = styled(Img)`
  width: 201px;
  height: 201px;
  max-width: 201px;
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

const Main = styled.div`
  background: ${colors.white90};
  padding: 0.3rem 1.2rem;
`

class Wrapper extends React.Component {
  render() {
    const { languages, bg, logo, children } = this.props
    return (
      <React.Fragment>
        {/* <SEO /> */}
        {console.log(languages.edges)}
        <Container>
          <Header>
            <Logo fluid={logo.image.fluid} />
            <h2>Rescue Amazonian Rainforest</h2>
          </Header>

          <Main>{children}</Main>
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
  bg: PropTypes.shape({
    image: PropTypes.object.isRequired,
  }).isRequired,
  logo: PropTypes.shape({
    image: PropTypes.object.isRequired,
  }).isRequired,
}

const MainLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query IndexQuery {
        languages: allLanguagesYaml {
          edges {
            node {
              id
              title
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
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
      <Wrapper bg={bg} logo={logo} languages={languages.edges}>
        {children}
      </Wrapper>
    )}
  />
)

export default MainLayout
