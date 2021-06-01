import React from "react";
import { Row } from "react-bootstrap";
import { Container, Col } from "react-bootstrap";
import Img from "gatsby-image/withIEPolyfill"

export default (props) => {
  if (props.posts.length === 0) {
    return null;
  }
  return (
    <Container as={"section"} className={props.className}>
      <Row>
        <Col as={"h3"} md={6}>Shuttl has the proven experience with <strong>{props.title}</strong> to help you through the process.</Col>
      </Row>
      <Row>
        {props.posts.slice(0, 3).map(post => {
          return (
            <Col md={4}>
              {post.featuredImage && <Img fluid={post.featuredImage.node.localFile.fluid} />}
              <h4>{post.title}</h4>
              <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}