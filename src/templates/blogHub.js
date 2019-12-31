import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { graphql, Link } from "gatsby";

import SEO from "../components/seo";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import Tile from "../components/tile";

export default (props) => {
  let wpData = props.data.allWordpressPost;
  let slug = `/blog/${props.pageContext.slug}`;
  if (props.pageContext.useAll) {
    wpData = props.data.all;
    slug = "/blog";
  }
  return (
    <Layout>
      <SEO title={props.pageContext.name} description={props.pageContext.description} />
      <section className="bg-light pt-5 pb-0">
        <Container className="py-10">
          <Row className="justify-content-center">
            <Col md={6}>
              <h2>All about</h2>
              <h1>{props.pageContext.name}</h1>
              <div dangerouslySetInnerHTML={{ __html: props.pageContext.description }}></div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="bg-white py-5">
        <Container fluid>
          <Row>
            <Col>
              <ul className="masonry row gutter-2">
                {wpData.nodes.map((node, ndx) => (
                  <Tile fluid={{
                    ...node.featured_media.localFile.childImageSharp.fluid,
                    src: node.featured_media.source_url,
                  }} key={ndx}>
                    <Link to={`/blog/${node.categories[0].slug}/${node.slug}`} className="tile-content" >
                      <div className="tile-footer bg-dark opacity-60">
                        <span className={`eyebrow mb-1`}>{node.title}</span>
                        <div dangerouslySetInnerHTML={{ __html: node.excerpt }}></div>
                      </div>
                    </Link>
                  </Tile>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      <Pagination slugBase={slug} {...props.pageContext} />
    </Layout>
  )
}

export const query = graphql`
query($limit: Int!, $skip: Int!, $slug: String) {
  allWordpressPost(
    sort: {order: DESC, fields: date}, 
    limit: $limit, 
    skip: $skip,
    filter: {categories: {elemMatch: {slug: {eq: $slug}}}}
  ) {
      nodes {
        slug
        excerpt
        title
        categories {
          slug
        }
        featured_media {
          source_url
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  all: allWordpressPost(
    sort: {order: DESC, fields: date}, 
    limit: $limit, 
    skip: $skip,
  ) {
      nodes {
        slug
        excerpt
        title
        categories {
          slug
        }
        featured_media {
          source_url
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
}
`
