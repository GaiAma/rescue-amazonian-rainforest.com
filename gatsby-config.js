// const config = require(`./config/website`)

// const pathPrefix = config.pathPrefix === `/` ? `` : config.pathPrefix

module.exports = {
  /* General Information */
  // pathPrefix: config.pathPrefix,
  siteMetadata: {
    // siteUrl: config.siteUrl + pathPrefix,
  },
  mapping: {
    'MarkdownRemark.fields.translations': `MarkdownRemark`,
  },
  /* Plugins */
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/`,
        name: `content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: { maxWidth: 590 },
          },
          `gatsby-remark-copy-linked-files`,
          // {
          //   resolve: `gatsby-remark-custom-blocks`,
          //   options: {
          //     blocks: {
          //       quote: {
          //         classes: `custom-block-quote`,
          //         title: `optional`,
          //       },
          //       danger: `custom-block-danger`,
          //       info: `custom-block-info`,
          //     },
          //   },
          // },
          `remark-squeeze-paragraphs`,
          // removes the paragraph parent of custom components
          `gatsby-remark-component`,
        ],
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        // name: config.siteTitle,
        // short_name: config.siteTitleAlt,
        // description: config.siteDescription,
        // start_url: config.pathPrefix,
        // background_color: config.backgroundColor,
        // theme_color: config.themeColor,
        display: `fullscreen`,
        icons: [
          {
            src: `/favicons/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/favicons/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    /* Must be placed at the end */
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
  ],
}
