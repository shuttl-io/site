import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "gatsby";

import SEO from "../components/seo";
import Layout from "../components/layout";
import BlogHeader from "../components/BlogHeader";
import LatestPosts from "../components/LatestPosts";

export default (props) => {
  const tags = props.data.wordpressPost.tags || [];
  return (
    <Layout>
      <SEO title={props.data.wordpressPost.title} description={props.data.wordpressPost.excerpt} />
      <BlogHeader
        title={props.data.wordpressPost.title}
        category={props.data.wordpressPost.categories[0]}
        fluid={{
          ...props.data.wordpressPost.featured_media.localFile.childImageSharp.fluid,
          src: props.data.wordpressPost.featured_media.source_url,
        }}
        byline={`Posted by ${props.data.wordpressPost.author.name} on ${props.data.wordpressPost.date}`}
      />

      <section>
        <Container className="py-10">
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <div className="lead" dangerouslySetInnerHTML={{ __html: props.data.wordpressPost.excerpt }}></div>
            </Col>
          </Row>
          <hr class="w-25"></hr>
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <div className="lead" dangerouslySetInnerHTML={{ __html: props.data.wordpressPost.content }}></div>
            </Col>
          </Row>
          <hr class="w-25"></hr>
          <Container>
            <Row className="justify-content-center">
              <Col md={10} lg={8}>
                <div className="tag-cloud">
                  {tags.map((tag, ndx) => (
                    <Link to={`/tags/${tag.slug}`} key={ndx}>
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </section>
      <section className="bg-light py-5">
        <Container>
          <LatestPosts />
        </Container>
      </section>
    </Layout>
  );
}

export const query = graphql`
query($id: Int!) {
  wordpressPost(wordpress_id: {eq: $id}) {
    wordpress_id
    title
    content
    excerpt
    date(formatString: "MMMM DD, YYYY")
    author {
      name
    }
    categories {
      name
      slug
    }
    tags {
      name
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
`;
