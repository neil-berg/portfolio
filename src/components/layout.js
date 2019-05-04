import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import Footer from "./footer"
import "../styles/layout.css"

const Layout = ({ children, location, showFooter = true }) => (
  <div>
    <Header location={location} />
    <main>{children}</main>
    {showFooter ? <Footer /> : null}
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  showFooter: PropTypes.bool,
}

export default Layout
