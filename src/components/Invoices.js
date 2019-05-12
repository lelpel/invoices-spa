import React, { Component } from "react";
import { Table, Spinner, Modal, ModalHeader } from "reactstrap";
import InvoicesTableHeader from "./InvoicesTableHeader";
import InvoiceItem from "./InvoiceTableRow";
import EditInvoiceForm from "./EditInvoiceForm";
import dayjs from "dayjs";
import AddInvoice from "./AddInvoice";

export default class Invoices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoiceItems: [],
      isLoaded: false,
      error: "",
      showEditModal: false,
      editedInvoice: {}
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onAddSubmit = this.onAddSubmit.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    console.log("cdm called");
    this.loadData();
  }

  componentDidUpdate() {
    if (!this.state.isLoaded) this.loadData();
  }

  loadData() {
    fetch("/invoices")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            invoiceItems: result,
            error:
              result.length === 0 ? "Unfortunately, no invoices found" : null
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  toggle() {
    this.setState(prevState => ({
      showEditModal: !prevState.showEditModal
    }));
  }

  handleEdit(id) {
    if (id === null || id === undefined) return;

    fetch(`/invoices/${id}`)
      .then(res => res.json())
      .then(
        result => {
          console.log("start setting state");

          this.setState({
            editedInvoice: result,
            showEditModal: true
          });

          console.log("end setting state");
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }

  handleRemove = id => {
    console.log(id);

    fetch(`/invoices/${id}`, {
      method: "delete"
    }).then(res => {
      this.setState({ isLoaded: false });
    });
  };

  onEditSubmit(values) {
    const newInvoice = {
      id: values.id,
      number: values.invno,
      date_created: values.created,
      date_due: dayjs(values.date).format("DD MMMM YYYY"),
      date_supply: dayjs(values.sdate).format("DD MMMM YYYY"),
      comment: values.comment
    };

    fetch(`/invoices/${values.id}`, {
      method: "put",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newInvoice)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          isLoaded: false,
          showEditModal: false
        });
      });
  }

  onSubmit = values => {
    const newInvoice = {
      number: values.invno,
      date_created: dayjs().format("DD MMMM YYYY"),
      date_due: dayjs(values.date).format("DD MMMM YYYY"),
      date_supply: dayjs(values.sdate).format("DD MMMM YYYY"),
      comment: values.comment
    };

    fetch("/invoices", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newInvoice)
    })
      .then(res => res.json())
      .then(res => {
        console.log("eeet");
      });
  };

  onAddSubmit(values) {
    const newInvoice = {
      number: values.invno,
      date_created: dayjs().format("DD MMMM YYYY"),
      date_due: dayjs(values.date).format("DD MMMM YYYY"),
      date_supply: dayjs(values.sdate).format("DD MMMM YYYY"),
      comment: values.comment
    };

    fetch("http://localhost:3000/invoices", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newInvoice)
    }).then(res => this.setState({ isLoaded: false }));
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
    //if (invoiceItems.length === 0) return;

    return (
      <>
        <AddInvoice buttonLabel="Add invoice" onSubmit={this.onAddSubmit} />

        {error !== null ? (
          <h1 className="mt-3">{error}</h1>
        ) : (
          <Table>
            <InvoicesTableHeader />
            <tbody>
              {invoiceItems.map(invoice => (
                <InvoiceItem
                  key={invoice.id}
                  invoice={invoice}
                  onEditClick={this.handleEdit}
                  onRemoveClick={this.handleRemove}
                />
              ))}
            </tbody>
          </Table>
        )}

        <Modal
          isOpen={this.state.showEditModal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Edit invoice</ModalHeader>
          <EditInvoiceForm
            os={this.onEditSubmit}
            invoice={this.state.editedInvoice}
          />
        </Modal>
      </>
    );
  }
}
