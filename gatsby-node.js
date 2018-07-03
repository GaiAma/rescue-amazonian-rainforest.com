const { resolve } = require(`path`)
const slugify = require(`slugify`)
const { compose, groupWith, last, takeLast, head } = require(`ramda`)

const isPage = node =>
  /\/content\/pages\/[^_]+\/index\.[^/]+/.test(node.fileAbsolutePath)

const getNLast = n =>
  compose(
    head,
    takeLast(n)
  )

const getGroup = node => {
  const absolutePath = node.fileAbsolutePath.split(`/`)
  const filename = last(absolutePath)
  return filename.indexOf(`index`) === 0
    ? getNLast(3)(absolutePath)
    : getNLast(2)(absolutePath)
}

const groupByPage = groupWith((a, b) => getGroup(a) === getGroup(b))

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  createNodeField({
    node,
    name: `isPage`,
    value: isPage(node),
  })
  if (isPage(node)) {
    createNodeField({
      node,
      name: `slug`,
      value: `/${node.frontmatter.lang}/${slugify(node.frontmatter.slug)}`,
    })
  }
}

exports.createPages = async ({ actions, getNodes, graphql }) => {
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
        filter: { fields: { isPage: { eq: true }, slug: { ne: null } } }
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

  const pages = getNodes().filter(isPage)
  // console.log(groupByPage(pages))
  groupByPage(pages).forEach(group =>
    group.forEach((node, index, array) =>
      createNodeField({
        node,
        name: `translations`,
        value: array.filter(n => n.id !== node.id).map(node => node.id),
      })
    )
  )

  return true
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
