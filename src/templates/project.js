import React, { useState } from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Container, Row, Col } from "react-bootstrap";
import Img from "gatsby-image";
import Posts from "../components/Posts";
import Tools from "../components/tools";

export default (props) => {
  return (
    <>
      <Layout>
        <SEO title={`Project: ${props.data.wpProject.title}`} description={props.data.wpProject.excerpt} pathname={props.path} type="Project" />
        <section className="pt-5 pb-0">
          <Container className="py-10">
            <Row className="">
              <Col className="p-4">
                <Row className="align-items-center">
                  <Col md={8}>
                    <Img
                      fluid={props.data.wpProject.projectFields.mainImage.localFile.childImageSharp.fluid}
                      alt={props.data.wpProject.projectFields.mainImage.altText}
                      className="img-fluid"
                    />
                  </Col>
                  <Col md={4} className="text-center">
                    <h1 className="text-gradient-primary m-0 display-1">{props.data.wpProject.title}</h1>
                    <p className="text-muted">{props.data.wpProject.projectFields.industry}</p>
                    <div className="mt-3 font-weight-bold" dangerouslySetInnerHTML={{ __html: props.data.wpProject.excerpt }} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="bg-white my-5 seperator-bottom py-2">
          <Container>
            <Row>
              <Col dangerouslySetInnerHTML={{ __html: props.data.wpProject.content }}></Col>
            </Row>
          </Container>
          <Posts posts={props.data.posts.nodes} title={props.data.wpProject.title} className="py-5" />
        </section>
        <Tools />
      </Layout>
    </>
  )
}

export const query = graphql`
query($id: Int!, $tags: [String]) {
  wpProject(databaseId: {eq: $id}) {
    title
    content
    projectFields {
      industry
      smallExcerpt
       mainImage {
         altText
        localFile {
          childImageSharp {
            fluid(maxWidth: 825)  {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    excerpt
  }

  posts: allWpPost(filter: {tags: {nodes: {elemMatch: {name: {in: $tags}}}}}) {
    nodes {
      title
      excerpt
      featuredImage {
        node {
          localFile {
            childImageSharp {
              fluid(maxWidth: 300)  {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}

`