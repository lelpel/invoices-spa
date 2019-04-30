import React, { Component } from "react";
import { Table, Spinner } from "reactstrap";
import InvoicesTableHeader from "./InvoicesTableHeader";
import { getInvoices } from "../actions/invoicesActions";
import InvoiceItem from "./InvoiceTableRow";

export default class Invoices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoiceItems: [],
      isLoaded: false,
      error: ""
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/invoices")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            invoiceItems: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
    /*this.setState({
      invoiceItems: getInvoices()
    });*/
  }

  render() {
    const { invoiceItems, isLoaded, error } = this.state;

    /*if (invoiceItems.length === 0) {
      getInvoices(items => {
        this.setState({ invoiceItems: items });
      });
    }*/

    if (!isLoaded) return <Spinner color="primary" type="grow" />;
    //if (error !== "") return <h1>{error}</h1>;
    //if (invoiceItems === undefined || invoiceItems.length === 0)
    //  return <Spinner color="primary" type="grow" />;

    return (
      <Table>
        <InvoicesTableHeader />
        <tbody>
          {invoiceItems.map(invoice => (
            <InvoiceItem key={invoice.id} invoice={invoice} />
          ))}
        </tbody>
      </Table>
    );
  }
}
