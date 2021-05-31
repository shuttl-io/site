import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo"
import { Container, Col, Row } from "react-bootstrap";
import Tools from "../components/tools";
import Posts from "../components/Posts";

export default (props) => {
  console.log("posts:", props.data.service.servicesFields.content);
  return (
    <Layout>
      <SEO title={props.data.service.title} description={props.data.service.excerpt} pathname={`/solutions/${props.data.service.title}`} />

      <section className="pb-2">
        <Container className="mt-md-10">
          <Col md={10} className="text-center py-10 mr-auto ml-auto">
            <h1 className="text-gradient-primary font-weight-bold">{props.data.service.title}</h1>
            <div className="font-weight-bold text-white" dangerouslySetInnerHTML={{ __html: props.data.service.excerpt }}></div>
          </Col>
        </Container>
      </section>

      <section className="bg-white container-full-width text-black py-5">
        <Container>
          {props.data.service.servicesFields.content.map((content, index) => {
            return (
              <Row key={index}>
                <Col md={6} className={index % 2 !== 0 ? "order-last" : ""}>
                  <h3 className="h2 font-weight-bold">{content.title}</h3>
                  <h4 className="font-weight-bold h5">{content.tagLine}</h4>
                  <div dangerouslySetInnerHTML={{ __html: content.content }} />
                </Col>
                <Col md={6}>
                </Col>
              </Row>
            )
          })}
        </Container>
        <Posts posts={props.data.posts.nodes} title={props.data.service.title} className="py-5" />
      </section>

      <Tools />
    </Layout>
  )
}
export const query = graphql`
query($id: Int!, $tags: [String]) {
  service: wpService(databaseId: {eq: $id}) {
    title
    slug
    excerpt
    servicesFields {
      content {
        content
        tagLine
        title
      }
    }
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
}`