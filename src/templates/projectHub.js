import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Pagination from "../components/pagination";
import Tile from "../components/tile";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "gatsby";

export default (props) => {
  const wpData = props.data.allWordpressWpProject;
  return (
    <Layout>
      <SEO title="All Projects" pathname={props.path} />
      <section className="hero hero-with-header bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col>
              <h1>Latest Projects</h1>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="bg-white py-5">
        <Container fluid>
          <Row>
            <Col>
              <ul className="masonry row gutter-2">
                {wpData.edges.map(({ node }, ndx) => (
                  <Tile fluid={{
                    ...node.acf.main_image.localFile.childImageSharp.fluid,
                    src: node.acf.main_image.source_url,
                  }}>
                    <Link to={`/projects/${node.slug}`} className="tile-content" key={ndx}>
                      <div className="tile-footer bg-dark opacity-60">
                        <span className={`eyebrow mb-1`}>{node.title}</span>
                        <h3>{node.acf.small_excerpt}</h3>
                      </div>
                    </Link>
                  </Tile>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      <Pagination slugBase="/projects" {...props.pageContext} />
    </Layout>
  )
}

// export const query = graphql`
// query($limit: Int!, $skip: Int!) {
//   allWordpressWpProject(sort: {order: DESC, fields: date}, limit: $limit, skip: $skip) {
//       edges {
//         node {
//           slug
//           title
//           acf {
//             make_dark_text
//             small_excerpt
//             main_image {
//               source_url
//               localFile {
//                 childImageSharp {
//                   fluid {
//                     ...GatsbyImageSharpFluid
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
// }
// `