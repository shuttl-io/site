import { useStaticQuery } from "gatsby";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Img from "gatsby-image/withIEPolyfill"

export default () => {
  const data = useStaticQuery(graphql`
  query {
  wpTool(databaseId: {eq: 217}) {
    toolsField {
      tools {
        altText
        logo {
          localFile {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}
`)
  return (
    <Container as="section" className="my-5">
      <h3 className="mb-5">Technologies We Love to Use</h3>
      <Row className="py-5">
        {data.wpTool.toolsField.tools.map((tool, ndx) => (
          <Col md={3} key={ndx}>
            <Img fluid={tool.logo.localFile.childImageSharp.fluid} alt={tool.altText} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}