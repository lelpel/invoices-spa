import React from "react";
import { Button, Modal, ModalHeader } from "reactstrap";
import AddInvoiceForm from "./AddInvoiceForm";
import { Row } from "reactstrap";
class AddInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <Row className="justify-content-center mt-3 mb-3">
        <Button color="info" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add invoice</ModalHeader>
          <AddInvoiceForm onSubmit={this.props.onSubmit} />
        </Modal>
      </Row>
    );
  }
}

export default AddInvoice;
