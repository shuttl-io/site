
import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Dropdown } from "react-bootstrap";

const headerCategories = [
  "popular",
  "web-tech",
  "software-delivery",
  "cloud",
  "featured",
];

const CategoryLink = (props) => {
  if (props.count === 0) {
    return null;
  }
  return (
    <Link to={`/blog/${props.slug}`} className="dropdown-item" >
      <span>{props.name}</span>
      <span>{props.description}</span>
    </Link>
  )
}

export default (props) => {
  const data = useStaticQuery(graphql`
  query {
    categories: allWordpressCategory {
      nodes {
        slug
        count
        description
        name
      }
    }
  }`);
  const categories = data.categories.nodes.reduce((acc, category) => {
    return {
      ...acc,
      __total: acc.__total + 1,
      [category.slug]: category,
    }
  }, { __total: 0 });

  if (categories.__total === 0) {
    return null;
  }
  return (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Blog
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        {headerCategories.map((catSlug, ndx) => (
          <CategoryLink key={ndx} {...categories[catSlug]} />
        ))}
        <Dropdown.Divider />
        <Link to={`/blog/`} className="dropdown-item">
          <span>See latest Posts</span>
          <p>Look over our latest posts</p>
        </Link>
      </div>
    </li>
  )
}