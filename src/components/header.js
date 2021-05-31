import { graphql, Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
    });
  };
}

const templates = {
  WpService: "/solutions/{0}"
}

const Header = ({ siteTitle }) => {
  const dropdowns = useStaticQuery(graphql`{
  wpHeader(databaseId: {eq: 244}) {
    headerFields {
      dropdowns {
        title
        links {
          link {
            __typename
            ... on WpService {
              slug
              title
            }
            ... on WpProduct {
              title
              slug
            }
            ... on WpProject {
              slug
              title
            }
            ... on WpFooter {
              
              slug
              title
            }
            ... on WpHome_page {
              slug
              title
            }
            ... on WpPage {
              id
              slug
              slug
            }
            ... on WpPost {
              id
              title
              slug
            }
            ... on WpTool {
              id
              title
              slug
            }
            ... on WpContact {
              id
              title
            	slug
            }
          }
        }
      }
    }
  }
}`)
  return (
    <header className="header-sticky header-light headroom headroom--not-bottom headroom--pinned headroom--top bg-dark text-white" style={{ border: "none" }}>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand text-primary" to="/">
            SHUTTL
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="burger"><span></span></span></button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav align-items-center">
              {dropdowns.wpHeader.headerFields.dropdowns.map(dropdown => {
                return (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {dropdown.title}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      {dropdown.links.map(({ link }, ndx) => {
                        console.log(link);
                        return (
                          <Link className="dropdown-item text-dark" to={templates[link.__typename].format(link.slug)} key={ndx}>
                            {link.title}
                          </Link>
                        )
                      })}
                    </div>
                  </li>
                )
              })}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/contact" >
                  Contact Us
                </Link>
              </li>

            </ul>

            {/* <ul className="navbar-nav align-items-center ml-auto">

              <li className="nav-item">
                <Link className="btn btn-primary text-white nav-link" to="/contact" >
                  Contact Us
              </Link>
              </li>

            </ul> */}

          </div>
        </nav>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
