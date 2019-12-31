import React from "react";
import { Modal } from "react-bootstrap";
import Img from "gatsby-image";

export default (props) => {
  console.log(props);
  return (
    <Modal show={props.shouldShow} onHide={props.onHide} onEscapeKeyDown={props.onHide} className="max-w-95">
      <div className="modal-dialog modal-dialog-centered m-0 mx-auto" role="document" onClick={props.onHide}>
        <div className="modal-content">
          <div className="modal-image">
            <Img
              fluid={props.fluid}
              alt={props.alt_text}
              className="modal-image"
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}