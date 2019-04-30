import React from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Form, Field } from "react-final-form";

const onSubmit = values => {
  console.log(values);
};

const AddInvoiceForm = () => (
  <Form
    onSubmit={onSubmit}
    validate={values => {
      const errors = {};

      if (!values.date) {
        errors.date = "Required";
      }
      if (!values.sdate) {
        errors.sdate = "Required";
      }
      if (!values.invno) {
        errors.invno = "Required";
      }

      return errors;
    }}
    render={({ handleSubmit, values, submitting, validating, valid }) => (
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="invno">Invoice no.</Label>
            <Field name="invno">
              {({ input, meta }) => (
                <div>
                  <Input
                    {...input}
                    type="text"
                    placeholder="Invoice number"
                    invalid={meta.error && meta.touched}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </FormGroup>

          {/* конкретно эта часть отвечает за дату создания */}
          <FormGroup>
            <Label for="date">Invoice date</Label>
            <Field name="date">
              {({ input, meta }) => (
                <div>
                  <Input
                    {...input}
                    type="date"
                    placeholder="Invoice date"
                    invalid={meta.error && meta.touched}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </FormGroup>

          <FormGroup>
            <Label for="sdate">Supply date</Label>
            <Field name="sdate">
              {({ input, meta }) => (
                <div>
                  <Input
                    {...input}
                    type="date"
                    placeholder="Supply date"
                    invalid={meta.error && meta.touched}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </FormGroup>

          <FormGroup>
            <Label for="comment">Comment</Label>
            <Field name="comment">
              {({ input, meta }) => (
                <div>
                  <Input
                    {...input}
                    type="textarea"
                    placeholder="Invoice number"
                    invalid={meta.error && meta.touched}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" color="primary" disabled={!valid}>
            Submit
          </Button>
        </ModalFooter>
      </form>
    )}
  />
);

export default AddInvoiceForm;
