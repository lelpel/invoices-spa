import React, { Component } from "react";
import { Button } from "reactstrap";

export default class InvoiceItem extends Component {
  render() {
    const { invoice } = this.props;
    return (
      <tr>
        <td>{invoice.date_created}</td>
        <td>{invoice.number}</td>
        <td>{invoice.date_supply}</td>
        <td>{invoice.comment}</td>
        <td>
          <div className="justify-content-center">
            <Button
              outline
              color="secondary"
              onClick={() => {
                this.props.onEditClick(invoice.id);
              }}
              className="mr-3"
            >
              Edit
            </Button>
            <Button
              outline
              color="danger"
              onClick={() => {
                this.props.onRemoveClick(invoice.id);
              }}
            >
              Remove
            </Button>
          </div>
        </td>
      </tr>
    );
  }
}
