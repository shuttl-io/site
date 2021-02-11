import React, { useState } from "react"
import { Link } from "gatsby"
import { Container, Col, Row } from "react-bootstrap";

import Layout from "../components/layout"
import Img from "gatsby-image";
import SEO from "../components/seo"

const IndexPage = (props) => {
  const gradientClasses = ["yellow", "primary", "cyan"];
  return (
    <Layout>
      <SEO title="Home" description={props.data.wordpressAcfHomePage.excerpt} pathname="/" />
      <section className="pb-2">
        <Container className="mt-md-10">
          <Col md={10} className="text-center py-10 mr-auto ml-auto">
            <span dangerouslySetInnerHTML={{ __html: props.data.wordpressAcfHomePage.acf.top.call_to_action }} className="text-gradient-primary" />
            <Link to={props.data.wordpressAcfHomePage.acf.top.link} className="btn btn-purple btn-rounded px-5 my-5">Get Started</Link>
          </Col>
        </Container>
      </section>
      <Container className="text-white" as={"section"}>
        <Row className="justify-content-between pt-5">
          <Col md={4} dangerouslySetInnerHTML={{ __html: props.data.wordpressAcfHomePage.acf.sales_pitch.title.title }}>
          </Col>
          <Col md={7} dangerouslySetInnerHTML={{ __html: props.data.wordpressAcfHomePage.acf.sales_pitch.title.content }}>
          </Col>
        </Row>
      </Container>
      <Container as={"section"}>
        <h3 className="h4 mb-5">Solutions</h3>
        <Row className="aos-init aos-animate" data-aos="zoom-in">
          {props.data.wordpressAcfHomePage.acf.sales_pitch.solutions.box.map((box, ndx) => {
            if (box.has_content) {
              const color = gradientClasses[ndx % 3];
              return (
                <Col md={6} key={box.title} className="mb-5">
                  <Col xl={8}>
                    <h4 className={`h3 text-gradient-${color} font-weight-bolder`}>{box.title}</h4>
                    <p>{box.blurb.blurb}</p>
                    {box.blurb.points.map((point, ndx) => (
                      <p className="border-bottom" key={ndx}>{point.point}</p>
                    ))}
                    {box.blurb.link && (
                      <Link to={`/solutions/${box.blurb.link.post_title}`} className="pt-3">Learn More</Link>
                    )}
                  </Col>
                </Col>
              )
            }
            return (
              <Col md={6} key={box.title}>
                <Col xl={8}>
                  <h4 className="h3 font-weight-bolder">{box.title}</h4>
                </Col>
              </Col>
            )
          })}
        </Row>
      </Container>

      <Container as={"section"}>
        <h3 className="h4 mb-5">{props.data.wordpressAcfHomePage.acf.our_work.title}</h3>
        {props.data.wordpressAcfHomePage.acf.our_work.work.map((work, ndx) => (
          <Row key={ndx} className="bg-white">
            <Col md={3}>
              <p className="text-muted">{work.industry}</p>
              <h5 className="font-weight-bolder">{work.title}</h5>
            </Col>
          </Row>
        ))}
      </Container>
    </Layout >
  )
};

export default IndexPage
export const pageQuery = graphql`
query MyQuery {
  service1Img: file(relativePath: {eq: "imgs/service-1.png"}) {
    childImageSharp {
      fluid(quality: 100) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  service2Img: file(relativePath: {eq: "imgs/service-2.png"}) {
    childImageSharp {
      fluid(quality: 100) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  services: allWordpressWpServices {
    nodes {
      slug
      title
      excerpt
      acf {
        is_in_header
      }
      featured_media {
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

  wordpressAcfHomePage: wordpressAcfHomePage(wordpress_id: {eq: 10}) {
    acf {
      top {
        call_to_action
        link
      }
      sales_pitch {
        title {
          content
          title
        }
        solutions {
          box {
            blurb {
              blurb
              points {
                point
              }
              link {
                post_title
              }
            }
            has_content
            title
          }
        }
      }
      quotes {
        quote
        attribution {
          author
          company
        }
      }
      pre_footer
      our_work {
        title
        work {
          content
          title
          industry
        }
      }
    }
  }
}
`;