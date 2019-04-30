import React, { Component } from "react";

export default class InvoiceItem extends Component {
  render() {
    const { invoice } = this.props;
    return (
      <tr>
        <td>{invoice.date_created}</td>
        <td>{invoice.number}</td>
        <td>{invoice.date_supply}</td>
        <td>{invoice.comment}</td>
      </tr>
    );
  }
}
