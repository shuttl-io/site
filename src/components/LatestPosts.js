import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Row, Col } from "react-bootstrap";
import { Link } from "gatsby";

import Tile from "./tile";

// import PostCard from "./posts/PostCard";

export default (props) => {
  return null;
  //   const response = useStaticQuery(graphql`
  //     query {
  //     allWordpressPost(sort: {order: DESC, fields: date}, limit: 3) {
  //       edges {
  //         node {
  //           excerpt
  //           slug
  //           title
  //           categories {
  //             name
  //             slug
  //             description
  //           }
  //           date
  //           status
  //           sticky
  //           template
  //           featured_media {
  //             source_url
  //             alt_text
  // localFile {
  //         childImageSharp {
  //           fluid {
  //             ...GatsbyImageSharpFluid
  //           }
  //         }
  //       }
  //           }
  //         }
  //       }
  //     }
  //     }
  //   `);

  //   return (
  //     <>
  //       {!props.hideTitle && (<Row>
  //         <Col>
  //           <h3 className="text-muted"><small>Latest Posts</small></h3>
  //         </Col>
  //       </Row>
  //       )}
  //       <Row>
  //         {response.allWordpressPost.edges.map(({ node }, ndx) => {
  //           return (
  //             <Tile fluid={{
  //               ...node.featured_media.localFile.childImageSharp.fluid,
  //               src: node.featured_media.source_url,
  //             }} key={ndx} as="div">
  //               <Link to={`/blog/${node.categories[0].slug}/${node.slug}`} className="tile-content" >
  //                 <div className="tile-footer bg-dark opacity-60">
  //                   <span className={`eyebrow mb-1`}>{node.title}</span>
  //                   <div dangerouslySetInnerHTML={{ __html: node.excerpt }}></div>
  //                 </div>
  //               </Link>
  //             </Tile>
  //           )
  //         })}
  //       </Row>
  //     </>
  //   )
}