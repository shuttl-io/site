import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Dropdown } from "react-bootstrap";

export default (props) => {
  const data = useStaticQuery(graphql`
    query {
     allWpProject(filter: {projectFields: {isInHeader: {eq: true}}}) {
    nodes {
      slug
      title
      excerpt
    }
  }
  }`);
  if (data.allWpProject.edges.length === 0) {
    return null;
  }
  return (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Projects
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        {data.allWpProject.nodes.map((node, ndx) => (
          <Link to={`/projects/${node.slug}`} className="dropdown-item" key={ndx}>
            <span>{node.title}</span>
            <span dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </Link>
        ))}
        <Dropdown.Divider />
        <Link to={`/projects/`} className="dropdown-item">
          <span>See All Projects</span>
          <p>Take a look at all of our amazing projects</p>
        </Link>
      </div>
    </li>
  )
}