const { resolve } = require(`path`)
const slugify = require(`slugify`)

const isPage = node =>
  node.internal.type === `MarkdownRemark` &&
  node.fileAbsolutePath.includes(`/content/pages`) &&
  node.frontmatter.slug !== undefined

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  // console.log(node)
  if (isPage(node)) {
    createNodeField({
      node,
      name: `slug`,
      value: `/${node.frontmatter.lang}/${slugify(node.frontmatter.slug)}`,
    })
  }
}

// eslint-disable-next-line
exports.createPages = async ({ actions, getNodes, graphql }) => {
  // eslint-disable-next-line
  const { createPage, createNodeField } = actions

  // get pages and posts
  const graphNodes = await graphql(`
    {
      languages: allLanguagesYaml {
        edges {
          node {
            id
            title
          }
        }
      }

      pages: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/pages/" }
          frontmatter: { slug: { ne: null } }
        }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              lang
              layout
            }
          }
        }
      }
    }
  `)

  if (graphNodes.errors) {
    return Promise.reject(graphNodes.errors)
  }

  // create pages & blog posts
  graphNodes.data.pages.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: resolve(`./src/page-templates/${node.frontmatter.layout}.js`),
      context: {
        slug: node.fields.slug,
        lang: node.frontmatter.lang,
      },
    })
  })
}

exports.onCreateBabelConfig = ({ actions: { setBabelPlugin } }) => {
  // setBabelPlugin({ name: `babel-plugin-tailwind` })
  setBabelPlugin({ name: `babel-plugin-emotion` })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [resolve(__dirname, `src`), `node_modules`],
    },
  })
}
