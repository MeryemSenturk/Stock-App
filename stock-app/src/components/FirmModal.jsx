import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import useStockRequest from "../services/useStockRequest";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

/**
 * @description Creates a modal box with a form to input firm information. It handles
 * form submission and updates or adds firm data to the firms collection.
 * 
 * @param { JavaScript `function`. } handleClose - ıntérface method that will be
 * called when the modal is closed, and it is used to trigger the appropriate action,
 * such as removing the firm from the stock or adding it to the stock.
 * 
 * 	1/ open: It is an object property that represents whether the modal is currently
 * open or not. It is set to `true` when the modal is opened and `false` when it is
 * closed.
 * 	2/ onClose: It is an event handler function that is triggered when the user closes
 * the modal. It takes no arguments.
 * 	3/ aria-labelledby: It is a string property that provides a human-readable label
 * for the modal's aria-activedescendant attribute.
 * 	4/ aria-describedby: It is a string property that provides a human-readable
 * description for the modal's aria-activedescendant attribute.
 * 	5/ postStock and putStock: These are functions that are used to send data to the
 * server for updating or inserting a firm into the Firms collection. They take no arguments.
 * 
 * @param { boolean } open - status of the modal, determining whether it should be
 * displayed open or closed.
 * 
 * @param { object } info - firm data to be updated or created, which is used to set
 * the values of the form fields and passed as props to the Modal component.
 * 
 * @param { object } setInfo - state of firm data, updating it with the values from
 * the form inputs and storing them under the `_id` property if they exist.
 * 
 * @returns { object } a form for adding or updating firm information, with input
 * fields and a submit button.
 */
export default function FirmModal({ handleClose, open, info, setInfo }) {
  //   const [info, setInfo] = useState({
  //     name: "",
  //     phone: "",
  //     image: "",
  //     address: "",
  //   })

  const { postStock, putStock } = useStockRequest();


  
//? Hangi inputtan bilgi geldiyse o inputun değerini değiştiren fonksiyon. (target.name veya target.id olabilir)
  /**
   * @description Updates the `info` object by assigning the value of the target element
   * to its corresponding key in the object.
   * 
   * @param { `HTMLInputElement`. } e - Event Object that is passed to the function,
   * which contains information about the form field that the user has selected or
   * entered value for.
   * 
   * 		- `target`: The component instance that triggered the change event.
   * 		- `name`: The name of the input field whose value is being changed.
   */
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  /**
   * @description Prevents the form submission by default, and then performs actions
   * based on whether or not the `_id` property is present in the `info` object: posting
   * or putting stock depending on its presence.
   * 
   * @param { event. } e - Event object that triggered the function and prevents the
   * default event handling behavior from occurring.
   * 
   * 		- `preventDefault()`: Prevents the default form submission behavior.
   * 		- `_id`: The unique identifier for the firm, which is mandatory to pass.
   * 		- `putStock`: An asynchronous function that updates the stock data for a given
   * firm.
   * 		- `postStock`: An asynchronous function that creates a new stock record for a
   * given firm.
   * 		- `handleClose`: A function to close the modal window when submission is complete.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (info._id) {
      //? put isteginin
      putStock("firms", info);
    } else{
      //? post firma işlemi
      postStock("firms", info);
    }
    //? modal ı kapıtıyoruz
    handleClose();
  };

  console.log(info);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component={"form"}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Firm Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              value={info.name}
              onChange={handleChange}  
              required
            />

            <TextField
              label="Phone"
              name="phone"
              id="phone"
              type="tel"
              variant="outlined"
              value={info.phone}
              onChange={handleChange}
              required
            />

            <TextField
              label="address"
              name="address"
              id="address"
              type="text"
              variant="outlined"
              value={info.address}
              onChange={handleChange}
              required
            />

            <TextField
              label="Image"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              value={info.image}
              onChange={handleChange}
              required
            />
            <Button variant="contained" type="submit">
              {info._id ? "UPDATE FIRM" : "ADD FIRM"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
