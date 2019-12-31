import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";

export default (props) => {
  const [img, setImg] = useState(props.fluid.base64);
  useEffect(() => {
    fetch(props.fluid.src).then(async (resp) => {
      const body = await resp.blob();
      const url = URL.createObjectURL(body);
      setImg(url);
    });
  }, []);
  const asComp = props.as || "li"
  return (
    <Col as={asComp} md={6} lg={4}>
      <article className="tile">
        <div className="tile-image" style={{ backgroundImage: `url(${img})` }}></div>
        {props.children}
      </article>
    </Col>
  )
}