/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import url from "url"

function SEO({ description, lang, meta, title, picture, pathname, type }) {
  const siteUrl = "https://www.shuttl.io"
  const parsedUrl = url.parse(siteUrl);
  const myUrl = `${siteUrl}${pathname}`;

  const { site, icon } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }

        icon: file(relativePath: {eq: "favicon.png"}) {
          childImageSharp {
            original {
              src
            }
          }
      }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `og:image`,
          content: picture || `https://www.shuttl.io/${icon.childImageSharp.original.src}`
        },
        {
          name: `twitter:image`,
          content: picture || `https://www.shuttl.io/${icon.childImageSharp.original.src}`
        },
        {
          name: `twitter:site`,
          content: `https://www.shuttl.io/`,
        }
      ].concat(meta)}
    >
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": type || "Website",
          "name": title,
          "description": metaDescription,
        })}
      </script>

      {pathname && (<link
        rel="canonical"
        key={myUrl}
        href={myUrl}
        data-baseprotocol={parsedUrl.protocol}
        data-basehost={parsedUrl.host}
      />)}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
