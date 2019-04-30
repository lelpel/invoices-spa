import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import ActionBar from "./components/ActionBar";

import { Container, Row, Col } from "reactstrap";
import Invoices from "./components/Invoices";
import AddInvoice from "./components/AddInvoice";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        <Container>
          <Row>
            <Col sm="6">
              <AddInvoice buttonLabel="properAdd">
                <ActionBar />
              </AddInvoice>
            </Col>
          </Row>
          <Row>
            <Col>
              <Invoices />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
