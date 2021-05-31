import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default (props) => {
  // const [email, setEmail] = useState(propState.email);
  // console.log();
  // return null;
  // const contact = useStaticQuery(graphql`query ContactPage {
  //   wordpressAcfContact( wordpress_id: {eq: 122}) {
  //     acf {
  //       title
  //       contact_section {
  //         content
  //         featured_section {
  //           website
  //           name
  //           logo {
  //           localFile {
  //             childImageSharp {
  //               fluid {
  //               ...GatsbyImageSharpFluid
  //               }
  //             }
  //           }
  //         }
  //         }
  //       }
  //       by_line
  //     }
  //   }
  // }`).wordpressAcfContact.acf;
  return (
    <Layout>
      <SEO title="Contact Us" description="See what we can do for you!" pathname="/contact" />
      <section className="bg-light pt-5 pb-0">
        <Container className="py-10 text-dark">
          <Row>
            <Col md={6}>
              <p>Contact Us</p>
              <h1 className="display-1 text-dark font-weight-bolder">We're eager to work with you.</h1>
            </Col>
          </Row>
          <Row className="px-5 align-items-center">
            <Col md={3}>
              <h3 className="p">Get In Touch</h3>
              <div>
                <p>Email Us</p>
                <a href="mailto:hello@shuttl.io">hello@shuttl.io</a>
              </div>
            </Col>

            <Col md={9} className="px-5">
              <h3 className="p">Get a personalized response</h3>
              <div className="border-dark">
                <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
                  <input type="hidden" name="form-name" value="contact" />
                  <Container>
                    <Row className="mb-0">
                      <div class="form-group col">
                        <label for="exampleInputEmail1">First Name</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="First Name" name="first" />
                      </div>
                      <div class="form-group col">
                        <label for="exampleInputPassword1">Last Name</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Last Name" name="last" />
                      </div>
                    </Row>
                    <Row className="mb-0">
                      <div class="form-group col">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" name="email" />
                      </div>
                    </Row>
                    <Row className="mb-0">
                      <div class="form-group col">
                        <label for="exampleInputEmail1">Company</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Company" name="company" />
                      </div>
                    </Row>
                    <Row className="mb-0">
                      <div class="form-group col">
                        <label for="exampleInputEmail1">How can we help?</label>
                        <div>
                          <textarea name="how-help" rows={10} cols={73}></textarea>
                        </div>
                      </div>
                    </Row>

                    <button type="submit" class="btn btn-dark">Submit</button>
                  </Container>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  )
}