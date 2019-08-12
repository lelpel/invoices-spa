import React, { useState } from "react";
import { Button, Modal, ModalHeader } from "reactstrap";
import AddInvoiceForm from "./AddInvoiceForm";
import { Row } from "reactstrap";

export default function AddInvoice(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <Row className="justify-content-center mt-3 mb-3">
      <Button color="info" onClick={toggle}>
        {props.buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle}>Add invoice</ModalHeader>
        <AddInvoiceForm onSubmit={props.onSubmit} />
      </Modal>
    </Row>
  );
}
