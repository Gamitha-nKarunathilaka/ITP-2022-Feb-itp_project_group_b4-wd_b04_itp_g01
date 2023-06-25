import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { publicRequest } from "../../axiosRequest/defaultAxios";
import AddIcon from "@mui/icons-material/Add";
import Notification from "../../component/Notification/Notification";
import Selects from "../../component/Inputs/Select";
import { useMutation } from "react-query";
import CloseIcon from "@mui/icons-material/Close";
import Genrator from "../../component/IdGenrarator/RandomID";
import { useNavigate } from "react-router";
const TAX_RATE = 0.07;
const items = [];
function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit, id) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price, id };
}

function subtotal(items) {
  console.log(items);
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

export default function AddBill() {
  const navigate = useNavigate();
  const [number, setNumber] = useState(1);
  const [part, setPart] = useState(null);
  const [qty, setQty] = useState(1);
  const [totalQty, settotalQty] = useState(0);
  const [price, setprice] = useState(0);
  const [rows, setRows] = useState([]);
  const [Item_Used, setItem_Used] = useState([]);
  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  function formatDate(thedate) {
    return (
      thedate.getFullYear() +
      "/" +
      (thedate.getMonth() + 1) +
      "/" +
      thedate.getDate()
    );
  }

  //add data
  const addClaims = async (claim) => {
    console.log(claim);
    const res = await publicRequest.post("Bill/add", claim);
  };
  //fetch data
  async function fetchbill() {
    const res = await publicRequest.get(`SparePart/getAll`);
    const payload = res.data.SpareParts;
    console.log(payload);
    payload.map((e) => {
      console.log(e.ItemName);
      items.push({
        DB: e._id,
        id: e.ItemName,
        title: e.ItemName,
        price: e.Used,
      });
    });
    console.log(items);
    return res;
  }

  const handleChanges = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setPart(value);

    let obj = items.find((o) => o.title === value);
    console.log(obj);
    setprice(obj.price);
  };

  useEffect(() => {
    fetchbill();

    //
  }, []);
  const handleAddRow = () => {
    let val;
    let v = totalQty + qty;

    settotalQty(v);

    items.map((o) => {
      if (o.title === part) {
        val = createRow(part, qty, price, o.DB);
      }
    });
    setRows([...rows, val]);
    console.log(rows);
    return;
  };

  const removeFromArray = (value) => {
    setRows(
      rows.filter((items) => {
        if (items.desc == value) {
          settotalQty(totalQty - items.qty);
          return false;
        } else {
          return true;
        }
      })
    );
    console.log(rows);
  };

  //insert
  const add = useMutation(addClaims, {
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Successfully added",
        type: "success",
      });
      navigate(-1);
    },
    onError: (error) => {
      console.log(error.response);

      const message = error.response.data.error;
      setNotify({
        isOpen: true,
        message: "Error Occurd  " + `${message}`,
        type: "error",
      });
    },
  });

  const submitForm = () => {
    const bundle = {
      Billl_ID: Genrator("GMB"),
      Total: invoiceTotal,
      date: formatDate(new Date()),
      ItemCount: totalQty,
      Item_Used: rows,
    };
    add.mutate(bundle);
  };
  return (
    <Container maxWidth="lg" sx={{ marginTop: "50px", marginBottom: "50px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Parts</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Selects
                      name="part"
                      label="Parts"
                      value={part}
                      onChange={handleChanges}
                      options={items}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="standard-basic"
                      label="Quantity"
                      variant="standard"
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(parseInt(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>{price}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={handleAddRow}>
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Desc</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right">Sum</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.desc}>
                    <TableCell>{row.desc}</TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">{row.unit}</TableCell>

                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                    <TableCell align="right">
                      {" "}
                      <IconButton
                        aria-label="delete "
                        onClick={() => removeFromArray(row.desc)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell rowSpan={4} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">
                    {ccyFormat(invoiceSubtotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total Qty.</TableCell>
                  <TableCell align="right">{totalQty}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0
                  )} %`}</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                </TableRow>
                {!rows.length == 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="right">
                      <Button variant="contained" onClick={submitForm}>
                        Issue
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </Container>
  );
}
