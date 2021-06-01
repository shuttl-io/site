import React, { useState } from "react"
import { Link } from "gatsby"
import { Container, Col, Row } from "react-bootstrap";
import Img from "gatsby-image/withIEPolyfill"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tools from "../components/tools";

const IndexPage = (props) => {
  console.log(props.data.wpHomePage.homeFields.ourWork);
  const gradientClasses = ["yellow", "primary", "cyan"];
  return (
    <Layout>
      <SEO title="Home" description={props.data.wpHomePage.excerpt} pathname="/" />
      <section className="pb-2">
        <Container className="mt-md-10">
          <Col md={10} className="text-center py-10 mr-auto ml-auto">
            <span dangerouslySetInnerHTML={{ __html: props.data.wpHomePage.homeFields.top.callToAction }} className="text-gradient-primary" />
            <Link to={props.data.wpHomePage.homeFields.top.link} className="btn btn-purple btn-rounded px-5 my-5">Get Started</Link>
          </Col>
        </Container>
      </section>
      <Container className="text-white" as={"section"}>
        <Row className="justify-content-between pt-5">
          <Col md={4} dangerouslySetInnerHTML={{ __html: props.data.wpHomePage.homeFields.salesPitch.title.title }}>
          </Col>
          <Col md={7} dangerouslySetInnerHTML={{ __html: props.data.wpHomePage.homeFields.salesPitch.title.content }}>
          </Col>
        </Row>
      </Container>
      <Container as={"section"}>
        <h3 className="h4 mb-5">Solutions</h3>
        <Row className="aos-init aos-animate" data-aos="zoom-in">
          {props.data.wpHomePage.homeFields.salesPitch.solutions.box.map((box, ndx) => {
            if (box.hasContent) {
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
                      <Link to={`/solutions/${box.blurb.link.slug}`} className="pt-3">Learn More</Link>
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
        <h3 className="h4 mb-5">{props.data.wpHomePage.homeFields.ourWork.title}</h3>
        <div className="d-flex justify-content-center">
          <div className="col-md-9">
            {props.data.wpHomePage.homeFields.ourWork.work.map((work, ndx) => (
              <Row key={ndx} className="bg-custom-grey justify-content-around py-5 align-items-center">
                <Col md={4}>
                  <p className="text-muted">{work.project.projectFields.industry}</p>
                  <h5 className="font-weight-bolder my-3">{work.project.title}</h5>
                  <div dangerouslySetInnerHTML={{ __html: work.project.projectFields.smallExcerpt }} className="mb-3"></div>
                  <Link to={`/projects/${work.project.slug}`}>Learn more</Link>
                </Col>
                <Col md={4}>
                  <Img fluid={work.project.featuredImage.node.localFile.childImageSharp.fluid} className="bg-white" />
                </Col>
              </Row>
            ))}
          </div>
        </div>
      </Container>


      <Container as={"section"}>
        <Row>
          {props.data.wpHomePage.homeFields.quotes.map((quote, ndx) => (
            <Col md={6} key={ndx} className="bg-custom-grey p-5">
              <p className="h3">
                <i className="fa fa-quote-left text-primary" aria-hidden="true"></i>
              </p>
              <div>
                <div className="lead" dangerouslySetInnerHTML={{ __html: quote.quote }}></div>
                <h5 className="text-muted my-3 h6">{quote.attribution.author} @ {quote.attribution.company}</h5>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <Tools />
      <Container as={"section"}>
        <Row dangerouslySetInnerHTML={{ __html: props.data.wpHomePage.homeFields.preFooter }}>
        </Row>
      </Container>
    </Layout >
  )
};

export default IndexPage
export const pageQuery = graphql`
query MyQuery {
  wpHomePage {
    id
    excerpt
    homeFields {
      fieldGroupName
      top {
        callToAction
        link
      }
      ourWork {
        title
        work {
          project {
            ... on WpProject {
              id
              slug
              excerpt
              title
              projectFields {
                industry
                smallExcerpt
              }
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
      }
      quotes {
        quote
        attribution {
          author
          company
        }
      }
      preFooter
      salesPitch {
        title {
          title
          content
        }
        solutions {
          box {
            title
            hasContent
            blurb {
              link {
                ... on WpService {
                  slug
                }
              }
              points {
                point
              }
              blurb
            }
          }
        }
      }
    }
  }

  # wordpressAcfHomePage: wordpressAcfHomePage(wordpress_id: {eq: 10}) {
  #   acf {
  #     top {
  #       call_to_action
  #       link
  #     }
  #     sales_pitch {
  #       title {
  #         content
  #         title
  #       }
  #       solutions {
  #         box {
  #           blurb {
  #             blurb
  #             points {
  #               point
  #             }
  #             link {
  #               post_title
  #             }
  #           }
  #           has_content
  #           title
  #         }
  #       }
  #     }
  #     quotes {
  #       quote
  #       attribution {
  #         author
  #         company
  #       }
  #     }
  #     pre_footer
  #     our_work {
  #       title
  #       work {
  #         content
  #         title
  #         industry
  #       }
  #     }
  #   }
  # }
}
`;