import Axios from "axios";

export const getInvoices = () => {
  Axios.get("http://localhost:3000/invoices")
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
};
