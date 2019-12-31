import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

export default (props) => {
  const data = useStaticQuery(graphql`{
    allWordpressWpServices(filter: {acf: {is_in_header: {eq: true}}}) {
      edges {
        node {
          slug
          title
          excerpt
        }
      }
    }
  }`);
  if (data.allWordpressWpServices.edges.length === 0) {
    return null;
  }
  return (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Services
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        {data.allWordpressWpServices.edges.map(({ node }, ndx) => (
          <Link to={`/services/${node.slug}`} className="dropdown-item" key={ndx}>
            <span>{node.title}</span>
            <span dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </Link>
        ))}
      </div>
    </li>
  )
}