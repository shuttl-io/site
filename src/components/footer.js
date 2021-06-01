import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useStaticQuery, graphql, Link } from "gatsby";

const FooterLink = (props) => {
  if (props.isInternal) {
    return <p><Link to={props.to} className="">{props.text}</Link></p>
  }
  return <p><a href={props.to} className="">{props.text}</a></p>
}

export default (props) => {
  const data = useStaticQuery(graphql`
  query {
    wpFooter(databaseId: {eq: 55}) {
    footer {
      linkColumns {
        link {
          isInternal
          text
          to
        }
        title
      }
      textColumns {
        content
        title
      }
    }
  }
  }`
  );
  const info = data.wpFooter.footer;
  const colNumber = Math.floor(12 / (1 + info.linkColumns.length + info.textColumns.length))
  return (
    <footer>
      <Container>
        <Row className="justify-content-center">
          <Col md={colNumber} className="align-self-center">
            <img className="img-fluid" src="/imgs/logo.png" alt="Shuttl Logo" />
          </Col>
          {data.wpFooter.footer.linkColumns.map((col, ndx) => (
            <Col md={colNumber} xs={6} key={ndx} className="text-center text-md-left">
              <h6>{col.title}</h6>
              {col.link.map((link, ndx) => <FooterLink {...link} key={ndx} />)}
            </Col>
          ))}

          {data.wpFooter.footer.textColumns.map((col, ndx) => (
            <Col md={colNumber} xs={12} key={ndx} className="text-center text-md-left">
              <h6>{col.title}</h6>
              <div dangerouslySetInnerHTML={{ __html: col.content }} />
            </Col>
          ))}
        </Row>
      </Container>
      <div className="separator-top">
        <Container>
          <Row className="py-5">
            <Col className="text-center">
              © {new Date().getFullYear()} Shuttl, LLC, Built with
          {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}
