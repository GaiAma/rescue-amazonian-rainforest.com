import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { colors } from '../theme'

const SEO = ({
  siteUrl,
  pageTitle,
  siteTitle,
  siteTitleAlt,
  description,
  image,
  language,
}) => {
  const imageUrl = siteUrl + image
  const title =
    pageTitle === siteTitle ? pageTitle : `${pageTitle} - ${siteTitle}`

  const schemaOrgJSONLD = [
    {
      '@context': `http://schema.org`,
      '@type': `WebSite`,
      url: siteUrl,
      name: title,
      alternateName: siteTitleAlt ? siteTitleAlt : ``,
    },
  ]

  return (
    <Helmet>
      <html lang={language.id} />
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png?v=1"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png?v=1"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png?v=1"
      />
      <link rel="shortcut icon" href="/favicon.ico?v=1" />
      <meta name="theme-color" content={colors.green} />
      <meta name="msapplication-TileColor" content={colors.green} />
      <meta name="msapplication-config" content="browserconfig.xml" />
      <meta name="description" content={description} />
      <meta name="image" content={imageUrl} />
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
      <meta property="og:locale" content={language.iso} />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  )
}

SEO.propTypes = {
  siteUrl: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
  siteTitleAlt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  language: PropTypes.object.isRequired,
}

export default SEO
