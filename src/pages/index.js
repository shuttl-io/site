import React from "react"
import { Link } from "gatsby"
import { Container, Col, Row } from "react-bootstrap";

import Layout from "../components/layout"
import Img from "gatsby-image";
import SEO from "../components/seo"

const IndexPage = (props) => (
  <Layout>
    <SEO title="Home" />
    <section className="pb-2">
      <Container className="mt-10">
        <Col md={10} className="text-center py-10 mr-auto ml-auto">
          <span dangerouslySetInnerHTML={{ __html: props.data.wordpressAcfHomePage.acf.top.call_to_action }} />
          <Link to={props.data.wordpressAcfHomePage.acf.top.link} className="btn btn-purple btn-rounded px-5 my-5">Get Started</Link>
        </Col>
        <Row className="aos-init aos-animate py-5" data-aos="fade-up" data-aos-delay="250">
          <Col>
            <div className="owl-carousel visible gallery align-bottom owl-loaded owl-drag" data-items="[3,2,2]" data-margin="20" data-loop="true" data-autoplay="true">
              <div className="owl-stage-outer">
                <div className="owl-stage">
                  {props.data.wordpressAcfHomePage.acf.top.images.map((image, ndx) => (
                    <div className="owl-item cloned" style={{ width: " 410px", marginRight: "20px" }} key={ndx}>
                      <figure className={`photo equal ${ndx % 2 === 0 ? "equal-short" : ""}`}>
                        <Link to={image.link_to} style={{ backgroundImage: `url(${image.image.source_url})` }}>
                        </Link>
                      </figure>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <section className="bg-purple">
      <Container className="text-white">
        <Row className="justify-content-between pt-5">
          <Col md={4} dangerouslySetInnerHTML={{ __html: props.data.wordpressAcfHomePage.acf.sales_pitch.title.title }}>
          </Col>
          <Col md={7} dangerouslySetInnerHTML={{ __html: props.data.wordpressAcfHomePage.acf.sales_pitch.title.content }}>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="aos-init aos-animate" data-aos="zoom-in">
          <Col>
            <div className="boxed p-5 p-lg-10">
              <Container>
                <Row className="justify-content-between align-items-center">
                  <Col md={5}>
                    <h2 className="display-3 mb-1" dangerouslySetInnerHTML={{ __html: props.data.wordpressAcfHomePage.acf.sales_pitch.email_capture.title }}></h2>
                    <div dangerouslySetInnerHTML={{ __html: props.data.wordpressAcfHomePage.acf.sales_pitch.email_capture.content }}></div>
                    <div className="input-group mt-2">
                      <input type="text" className="form-control px-3" placeholder="your@mail.com" aria-label="Get a free copy" />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button">Subscribe</button>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <Img fluid={props.data.service1Img.childImageSharp.fluid} alt="" />
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="separator-top mt-10 py-10 text-white">
        <Container className="text-white">
          <Row>
            {props.data.wordpressAcfHomePage.acf.sales_pitch.cards.map((card, ndx) => (
              <Col md={4} className="text-center" key={ndx}>
                <Img fixed={card.card_image.localFile.childImageSharp.fixed} alt="" />
                <h3 className="text-uppercase font-weight-normal fs-18 mt-2">{card.card_title}</h3>
                <div dangerouslySetInnerHTML={{ __html: card.card_content }}></div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </section>
    <section className="bg-light separator-top py-5" id="services">
      <h3 className="text-center" dangerouslySetInnerHTML={{ __html: props.data.wordpressAcfHomePage.acf.services_title }}></h3>
      <Container>
        <Row className="boxed separated">
          {props.data.services.nodes.map((node) => (
            <Link className="text-center col-md-6 col-lg-4 p-5" to={`/services/${node.slug}`}>
              <Img fluid={node.featured_media.localFile.childImageSharp.fluid} alt="" className="mb-3"></Img>
              <h4 className="fs-24 font-weight-normal">{node.title}</h4>
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }}></div>
            </Link>
          ))}
        </Row>
      </Container>
    </section>

    <section className="bg-white separator-top py-5">
      <Container>
        <Row className="justify-content-between align-items-center">
          <Col md={6} className="pr-md-4">
            <h2 className="mb-4" dangerouslySetInnerHTML={{ __html: props.data.wordpressAcfHomePage.acf.quotes.title }}></h2>
            <div className="accordion-group accordion-group-highlight" id="accordian">
              {props.data.wordpressAcfHomePage.acf.quotes.expandos.map((expando, ndx) => (
                <div className="accordion aos-init aos-animate" key={ndx}>
                  <div className="accordion-control" id={`heading-${ndx}`} data-control="" data-toggle="collapse" data-target={`#collapse-${ndx}`} aria-expanded="true" aria-controls={`collapse-${ndx}`}>
                    <h5>{expando.title}</h5>
                  </div>
                  <div className="accordion-content collapse" id={`collapse-${ndx}`} data-parent="#accordian" aria-labelledby={`heading-${ndx}`}>
                    <div className="accordion-content-wrapper" dangerouslySetInnerHTML={{ __html: expando.content }}>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col>
            <Img fluid={props.data.service2Img.childImageSharp.fluid} alt="" />
          </Col>
        </Row>
      </Container>
    </section>
    <section className="bg-light pt-5" >
      <Container>
        {props.data.wordpressAcfHomePage.acf.quotes.quote.map((quote, ndx) => (
          <Row className={`align-items-center py-5 ${ndx % 2 !== 0 ? "flex-row-reverse" : ""}`} key={ndx}>
            <Col md={6} className="pr-md-5 d-flex justify-content-center">
              <Img fixed={quote.icon.localFile.childImageSharp.fixed} alt={quote.icon.alt_text} className="img-fluid" />
            </Col>
            <Col md={6}>
              <blockquote className="blockquote" >
                <div dangerouslySetInnerHTML={{ __html: quote.quote }}>
                </div>
                <footer className="blockquote-footer">{quote.author}</footer>
              </blockquote>
            </Col>
          </Row>
        ))}
      </Container>
    </section>
  </Layout >
)

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

   wordpressAcfHomePage(wordpress_id: {eq: 10}) {
    acf {
      top {
        call_to_action
        images {
          image {
            alt_text
            source_url
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          link_to
        }
      }
      services_title
      quotes {
        title
        quote {
          author
          quote
          icon {
            source_url
            alt_text
            localFile {
              childImageSharp {
                fixed(height: 80, width: 80) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
        expandos {
          title
          content
        }
      }
      sales_pitch {
        title{
          title
          content
        }
        email_capture {
          content
          title
        }
        cards {
          card_image {
            source_url
            localFile {
              childImageSharp {
                fixed(height: 64, width: 64) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          card_title
          card_content
        }
      }
    }
  }
}
`;