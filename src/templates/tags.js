import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Tile from "../components/tile";
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";

const InternalTile = (props) => {
  if (props.__typename === "wordpress__wp_project") {
    return (
      <Tile fluid={{
        ...props.acf.main_image.localFile.childImageSharp.fluid,
        src: props.acf.main_image.source_url,
      }}>
        <Link to={`/projects/${props.slug}`} className="tile-content">
          <div className="tile-footer bg-dark opacity-60">
            <span className={`eyebrow mb-1`}>Projects</span>
            <br />
            <h2 className={`eyebrow text-eyebrow-2 mb-1`}>{props.title}</h2>
            <h3>{props.acf.small_excerpt}</h3>
          </div>
        </Link>
      </Tile>
    )
  }
  return (
    <Tile fluid={{
      ...props.featured_media.localFile.childImageSharp.fluid,
      src: props.featured_media.source_url,
    }}>
      <Link to={`/blog/${props.categories[0].slug}/${props.slug}`} className="tile-content" >
        <div className="tile-footer bg-dark opacity-60">
          <span className={`eyebrow mb-1`}>Blog Post &gt; {props.categories[0].name}</span>
          <br />
          <h2 className={`eyebrow text-eyebrow-2 mb-1`}>{props.title}</h2>
          <h3 className="text-white">{props.excerpt.replace(/<[^>]*>?/gm, '')}</h3>
        </div>
      </Link>
    </Tile>
  )
}

export default (props) => {
  const content = [...props.data.posts.nodes, ...props.data.projects.nodes];
  console.log(content);
  return (
    <Layout>
      <SEO title={`All content tagged with ${props.pageContext.tag}`} />
      <section className="bg-light pt-5 pb-0">
        <Container className="py-10">
          <Row className="justify-content-center">
            <Col md={6}>
              <h1>All content tagged with: {props.pageContext.name}</h1>
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
                {content.map((node, ndx) => (
                  <InternalTile {...node} key={ndx} />
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
}

export const query = graphql`
query($limit: Int!, $skip: Int!, $slug: String) {
  posts: allWordpressPost(
    sort: {order: DESC, fields: date}, 
    limit: $limit, 
    skip: $skip,
    filter: {tags: {elemMatch: {slug: {eq: $slug}}}}
  ) {
      nodes {
        __typename
        slug
        excerpt
        title
        categories {
          slug
          name
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

  projects: allWordpressWpProject(
    sort: {order: DESC, fields: date}, 
    limit: $limit, 
    skip: $skip,
    filter: {tags: {elemMatch: {slug: {eq: $slug}}}}
  ) {
      nodes {
        slug
        __typename
        title
        acf {
          make_dark_text
          small_excerpt
          main_image {
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
}
`