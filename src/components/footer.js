import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useStaticQuery, graphql, Link } from "gatsby";

const FooterLink = (props) => {
  if (props.is_internal) {
    return <p><Link to={props.to} className="">{props.text}</Link></p>
  }
  return <p><a href={props.to} className="">{props.text}</a></p>
}

export default (props) => {
  const data = useStaticQuery(graphql`
  query {
    wordpressAcfFooter(wordpress_id: {eq: 55}) {
      acf {
        link_columns {
          link {
            is_internal
            to
            text
          }
          title
        }
        text_columns {
          content
          title
        }
      }
    }
  }`
  );
  const info = data.wordpressAcfFooter.acf;
  const colNumber = Math.floor(12 / (1 + info.link_columns.length + info.text_columns.length))
  return (
    <footer className="seperator-top">
      <Container>
        <Row className="justify-content-center">
          <Col md={colNumber} className="align-self-center">
            <img className="img-fluid" src="/imgs/logo.png" alt="Shuttl Logo" />
          </Col>
          {data.wordpressAcfFooter.acf.link_columns.map((col, ndx) => (
            <Col md={colNumber} xs={6} key={ndx}>
              <h6>{col.title}</h6>
              {col.link.map((link, ndx) => <FooterLink {...link} key={ndx} />)}
            </Col>
          ))}

          {data.wordpressAcfFooter.acf.text_columns.map((col, ndx) => (
            <Col md={colNumber} xs={6} key={ndx}>
              <h6>{col.title}</h6>
              <div dangerouslySetInnerHTML={{ __html: col.content }} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col className="text-center">
            © {new Date().getFullYear()} Shuttl, LLC, Built with
          {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
