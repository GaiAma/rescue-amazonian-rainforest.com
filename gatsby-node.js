const { resolve, join } = require(`path`)
const { writeFileSync } = require(`fs`)
const slugify = require(`slugify`)
const { compose, groupWith, last, takeLast, head, sortBy } = require(`ramda`)
const { homepage } = require(`./package.json`)

const publicDir = join(__dirname, `public`)

const isPage = node =>
  /\/content\/(.*\/)?pages\/[^_]+\/index\.[^/]+/.test(node.fileAbsolutePath)

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

const sortByDirectory = sortBy(getGroup)

const groupByPage = groupWith((a, b) => getGroup(a) === getGroup(b))

const translationGroups = compose(
  groupByPage,
  sortByDirectory
)

const redirections = [
  // Redirect default Netlify subdomain to primary domain
  `https://rescue-amazonian-rainforest.netlify.com/en/* ${homepage}/en/:splat 301!`,
  `https://rescue-amazonian-rainforest.netlify.com/de/* ${homepage}/de/:splat 301!`,
  `https://rescue-amazonian-rainforest.netlify.com/* ${homepage}/en/:splat 301!`,
  // subdomain redirects
  `https://spende.rescue-amazonian-rainforest.com/* ${homepage}/de/spenden/ 301!`,
  `https://donate.rescue-amazonian-rainforest.com/* ${homepage}/en/donate/ 301!`,
  // redirect root to /de based on browser language
  `/ /de/ 302 Language=de`, // remove * & :splat for now
  // redirect root to /en otherwise
  `/ /en/ 301`,
]

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
  if (node.frontmatter && node.frontmatter.lang) {
    createNodeField({
      node,
      name: `language`,
      value: node.frontmatter.lang,
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

  // console.log(pages.map(n => n.fields.slug))
  // debugging auto translation mapping
  console.log(translationGroups(pages).map(g => g.map(x => x.fields.slug)))
  process.exit()

  translationGroups(pages).forEach(group =>
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

exports.onPostBuild = () => {
  // const { redirects } = store.getState()
  // redirects.forEach(({ fromPath, toPath, isPermanent }) => {
  //   redirections.push([fromPath, toPath, isPermanent ? 301 : null].join(` `))
  // })
  const finalRedirections = redirections.concat([
    `/Rescue_Amazonian_Rainforest/HOME.html /de 301`,
    `/Rescue_Amazonian_Rainforest/Philosophie.html /de 301`,
    `/Rescue_Amazonian_Rainforest/HOME_GB.html /en 301`,
    `/Rescue_Amazonian_Rainforest/Philosophie_GB.html /en 301`,
    `/Rescue_Amazonian_Rainforest/HOME_ES.html /es 301`,
    `/Rescue_Amazonian_Rainforest/Philosophie_ES.html /es 301`,

    `/Rescue_Amazonian_Rainforest/Projekte.html /de/projekte 301`,
    `/Rescue_Amazonian_Rainforest/Kontakt.html /de/projekte 301`,
    `/Rescue_Amazonian_Rainforest/Projekte_GB.html /en/projects 301`,
    `/Rescue_Amazonian_Rainforest/Kontakt_GB.html /en/projects 301`,
    `/Rescue_Amazonian_Rainforest/Projekte_ES.html /en/proyectos 301`,
    `/Rescue_Amazonian_Rainforest/Kontakt_ES.html /en/proyectos 301`,

    `/Rescue_Amazonian_Rainforest/Galerie.html /de/galerie 301`,
    `/Rescue_Amazonian_Rainforest/Galerie_GB.html /en/gallery 301`,
    `/Rescue_Amazonian_Rainforest/Galerie_ES.html /es/galeria 301`,

    `/Rescue_Amazonian_Rainforest/Initiatoren.html /de/ueber-uns 301`,
    `/Rescue_Amazonian_Rainforest/Initiatoren_GB.html /en/about-us 301`,
    `/Rescue_Amazonian_Rainforest/Initiatoren_ES.html /es/sobre-nosotros 301`,

    `/Rescue_Amazonian_Rainforest/Datenschutz.html /de/datenschutz 301`,
    `/Rescue_Amazonian_Rainforest/Datenschutz_GB.html /en/privacy 301`,
    `/Rescue_Amazonian_Rainforest/Datenschutz_ES.html /es/proteccion-de-datos 301`,

    `/Rescue_Amazonian_Rainforest/Impressum.html /de/impressum 301`,
    `/Rescue_Amazonian_Rainforest/Impressum_GB.html /en/legal 301`,
    `/Rescue_Amazonian_Rainforest/Impressum_ES.html /es/legal 301`,

    `/Rescue_Amazonian_Rainforest/HOME_files/WAZ_vom_21_11_2011.pdf /static/WAZ_vom_21_11_2011-9cc97312e370cd36f7b954d55289c362.pdf 301`,
  ])

  writeFileSync(join(publicDir, `_redirects`), finalRedirections.join(`\n`))
}
