import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Projects from "./header/project"
import Solutions from "./header/Solutions"
import Tools from "./header/Tools";
import Resources from "./header/Resources";

const Header = ({ siteTitle }) => (
  <header className="header-sticky header-light headroom headroom--not-bottom headroom--pinned headroom--top bg-dark text-white" style={{ border: "none" }}>
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand text-primary" to="/">
          SHUTTL
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="burger"><span></span></span></button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav align-items-center">
            <Solutions />
            <Tools />
            <Resources />
            {/* <Blog /> */}

            <li className="nav-item">
              <Link className="nav-link text-white" to="/about" >
                About
              </Link>
            </li>

          </ul>

          <ul className="navbar-nav align-items-center ml-auto">

            <li className="nav-item">
              <Link className="btn btn-primary text-white nav-link" to="/contact" >
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
