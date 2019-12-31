import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Row, Col, Container } from "react-bootstrap"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <section className="bg-light pt-5 pb-0">
      <Container className="d-flex align-items-center justify-content-center h-full-md">
        <Row>
          <Col className="text-center">
            <h1>That Page is Not Found</h1>
            <h2>You are beyond the event horizon now.</h2>
          </Col>
        </Row>
      </Container>
    </section>
  </Layout>
)

export default NotFoundPage
