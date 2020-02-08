import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Projects from "./header/project"
import Products from "./header/Products"
import Services from "./header/services";
import Blog from "./header/blog";

const Header = ({ siteTitle }) => (
  <header className="header-sticky header-light headroom headroom--not-bottom headroom--pinned headroom--top bg-white">
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">
          SHUTTL
          {/* <img src="/imgs/logo.png" alt="Shuttl Logo" className="col-md-6 mx-auto" /> */}
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="burger"><span></span></span></button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav align-items-center ml-auto">
            <Products />
            {/* <Services /> */}
            <Projects />
            {/* <Blog /> */}

            <li className="nav-item">
              <Link className="nav-link" to="/contact" >
                Contact Us
              </Link>
            </li>

          </ul>

        </div>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
