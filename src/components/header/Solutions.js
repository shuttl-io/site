import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export default (props) => {
  const data = useStaticQuery(graphql`{
    allWordpressWpProduct(filter: {acf: {is_in_header: {eq: true}, is_dummy: {eq: false}}}) {
      edges {
        node {
          acf {
            website
            description
          }
          title
        }
      }
    }
  }`);
  // if (data.allWordpressWpProduct.edges.length === 0) {
  //   return null;
  // }
  return (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Solutions
              </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        {data.allWordpressWpProduct.edges.map(({ node }, ndx) => (
          <a className="dropdown-item" href={node.acf.website} key={ndx}>
            <span>{node.title}</span>
            <p>{node.acf.description}</p>
          </a>
        ))}
      </div>
    </li>
  )
}