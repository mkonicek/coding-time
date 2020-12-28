import React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © Martin Konicek {new Date().getFullYear()}
        <div>
          <a href="https://twitter.com/martinkonicek">
            Twitter
          </a>
          &nbsp;/&nbsp;
          <a href="https://github.com/mkonicek">
            GitHub
          </a>
          &nbsp;/&nbsp;
          <a href="https://stackoverflow.com/users/90998/martin-konicek">
            StackOverflow
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
