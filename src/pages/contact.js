import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql, useStaticQuery } from "gatsby";

export default (props) => {
  const propState = props.location.state || {};
  const [email, setEmail] = useState(propState.email);
  console.log();
  const contact = useStaticQuery(graphql`query ContactPage {
    wordpressAcfContact( wordpress_id: {eq: 122}) {
      acf {
        title
        contact_section {
          content
          featured_section {
            website
            name
            logo {
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
        by_line
      }
    }
  }`).wordpressAcfContact.acf;
  return (
    <Layout>
      <SEO title="Contact Us" description="See what we can do for you!" pathname="/contact" />
      <section className="bg-light pt-5 pb-0">
        <Container className="py-10">
          <Row className="justify-content-center">
            <Col md={6}>
              <h1>{contact.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: contact.by_line }}>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-5 pb-0" id="form">
        <Container className="py-10">
          <Row className="justify-content-between">
            <Col md={5}>
              <div dangerouslySetInnerHTML={{ __html: contact.contact_section.content }} />
              {contact.contact_section.featured_section && (
                <>
                  <h3 className="my-5">Our Clients</h3>
                  <Row>
                    {contact.contact_section.featured_section.map((featured) => (
                      <a href={featured.website} className="col-md-4 text-center" target="__blank">
                        <Img fluid={featured.logo.localFile.childImageSharp.fluid} alt={`${featured.name}'s Logo`} className="img-fluid mb-3" />
                        <h4>{featured.name}</h4>
                      </a>
                    ))}
                  </Row>
                </>
              )}
            </Col>
            <Col md={5}>
              <form name="contact" netlify >
                <div className="form-group">
                  <label for="inputEmail1" className="sr-only">Best Contact Email</label>
                  <input type="email" className="form-control" id="inputEmail1" aria-describedby="emailHelp" placeholder="Best Contact Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else. We only use it for getting back to you</small>
                </div>

                <div className="form-group">
                  <label for="name" className="sr-only">Your Name</label>
                  <input className="form-control" id="name" placeholder="First and Last Name" required />
                </div>

                <div className="form-group">
                  <label for="company" className="sr-only">Company Name</label>
                  <input className="form-control" id="company" placeholder="Company Name" />
                </div>

                <div className="form-group">
                  <label for="website" className="sr-only">Website</label>
                  <input className="form-control" id="website" placeholder="Website" />
                </div>

                <div className="form-group">
                  <label for="details" className="sr-only">Details</label>
                  <textarea className="form-control" id="details" rows="3" placeholder="What can we help you with?"></textarea>
                </div>

                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary mb-2">Lets get started!</button>
                </div>

              </form>
            </Col>
          </Row>
        </Container>
      </section>

    </Layout>
  )
}