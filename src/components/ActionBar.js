import React from "react";
import { Card, CardTitle, CardText, Button, ButtonGroup } from "reactstrap";

export default function ActionBar(props) {
  return (
    <>
      <Card>
        <CardTitle>Actions</CardTitle>
        <Button outline color="primary" onClick={props.onAddClick}>
          Add
        </Button>
      </Card>
    </>
  );
}
