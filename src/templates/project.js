import React, { useState } from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Container, Row, Col, Button } from "react-bootstrap";
import ImageModal from "../components/imageModal";
import Img from "gatsby-image";

export default (props) => {
  const [img, setImageToShow] = useState(null);
  const tags = props.data.wordpressWpProject.tags || [];
  return (
    <>
      <Layout>
        <SEO title={`Project: ${props.data.wordpressWpProject.title}`} description={props.data.wordpressWpProject.acf.excerpt} />
        <section className="bg-light pt-5 pb-0">
          <Container className="py-10">
            <Row className="bg-white">
              <Col className="p-4">
                <Row className="align-items-center">
                  <Col md={8}>
                    <Img
                      fluid={props.data.wordpressWpProject.acf.main_image.localFile.childImageSharp.fluid}
                      alt={props.data.wordpressWpProject.acf.main_image.alt_text}
                      onClick={() => setImageToShow({
                        fluid: props.data.wordpressWpProject.acf.main_image.localFile.childImageSharp.fluid,
                        alt_text: props.data.wordpressWpProject.acf.main_image.alt_text,
                      })}
                      className="img-fluid"
                    />
                  </Col>
                  <Col md={4} className="text-right">
                    <h2>{props.data.wordpressWpProject.title}</h2>
                    <a className="text-muted h5" href={props.data.wordpressWpProject.acf.website} target="__blank">
                      <i className="fa fa-globe pr-1"></i>{props.data.wordpressWpProject.acf.website}
                    </a>
                    <div className="mt-3" dangerouslySetInnerHTML={{ __html: props.data.wordpressWpProject.acf.excerpt }} />
                  </Col>
                </Row>
                <Row className="justify-content-around">
                  {props.data.wordpressWpProject.acf.small_images.map(({ image }, ndx) => {
                    return (
                      <Col md={4} key={ndx}>
                        <Img
                          fluid={image.localFile.childImageSharp.fluid}
                          alt={image.alt_text}
                          onClick={() => setImageToShow({
                            fluid: image.localFile.childImageSharp.fluid,
                            alt_text: image.alt_text
                          })}
                        />
                      </Col>
                    )
                  })}
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="bg-white my-5 seperator-bottom py-2">
          <Container>
            <Row>
              <Col dangerouslySetInnerHTML={{ __html: props.data.wordpressWpProject.content }}></Col>
            </Row>
          </Container>
        </section>
        <section className="bg-white my-5">
          <Container>
            <Row>
              {tags.map((tag, ndx) => (
                <Col md={4} key={ndx} className="text-center">
                  <Link to={`/tags/${tag.slug}`} className="btn btn-outline-primary">
                    {tag.name}
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </Layout>
      <ImageModal
        shouldShow={img !== null}
        onHide={() => setImageToShow(null)}
        {...img}
      />
    </>
  )
}

export const query = graphql`
query($id: Int!) {
  wordpressWpProject(wordpress_id: {eq: $id}) {
    title
  	excerpt
    content
    tags {
      name
      slug
    }
    acf {
      excerpt
      website
      main_image {
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        alt_text
      }
      small_images {
        image {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          alt_text
        }
      }
    }
  }
}
`