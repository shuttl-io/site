import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import BlogHeader from "../components/BlogHeader";

export default (props) => {
  return (
    <Layout>
      <SEO title={props.data.wordpressWpServices.title} description={props.data.wordpressWpServices.excerpt} pathname={props.path} type="Service" />
      <BlogHeader
        fluid={{
          ...props.data.wordpressWpServices.featured_media.localFile.childImageSharp.fluid,
          src: props.data.wordpressWpServices.featured_media.source_url,
        }}
        title={props.data.wordpressWpServices.title}
        byline={props.data.wordpressWpServices.excerpt}
        hideLink
      />
      {/* <section className="bg-light pt-5 pb-0">
        <Container className="py-10">
          <Row className="justify-content-center">
            <Col md={6}>
              <h1>{props.data.wordpressWpServices.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: props.data.wordpressWpServices.excerpt }}></div>
            </Col>
            <Col md={4}>
              <Img
                fluid={props.data.wordpressWpServices.featured_media.localFile.childImageSharp.fluid}
              />
            </Col>
          </Row>
        </Container>
      </section> */}

      <section className="pt-5 pb-0">
        <Container className="py-10">
          <Row className="justify-content-center">
            <Col md={6}>
              <div dangerouslySetInnerHTML={{ __html: props.data.wordpressWpServices.content }}></div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-light pt-5 pb-0">
        <Container className="py-10">
          {props.data.wordpressWpServices.acf.content.one_group.map((group) => {
            const Icon = () => {
              if (!group.icon) {
                return null;
              }
              return (
                <Img fluid={group.icon.localFile.childImageSharp.fluid} alt="" style={{ maxWidth: "80px" }} className="mx-auto" />
              );
            }
            return (
              <Row className="justify-content-around">
                <Col md={1}>
                  <Icon />
                </Col>
                <Col md={5}>
                  <div dangerouslySetInnerHTML={{ __html: group.content }} />
                </Col>
              </Row>
            )
          })}
        </Container>
      </section>
    </Layout>
  )
}

// export const query = graphql`
// query($id: Int!) {
//   wordpressWpServices(wordpress_id: {eq: $id}) {
//     title
//   	excerpt
//     content
//     featured_media {
//       source_url
//       localFile {
//         childImageSharp {
//           fluid {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//     }
//     acf {
//       content {
//         one_group {
//           content
//           icon {
//             localFile {
//               childImageSharp {
//                 fluid {
//                   ...GatsbyImageSharpFluid
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `