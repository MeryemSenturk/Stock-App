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
 * @description Generates high-quality documentation for code given to it, providing
 * a modal form to input firm information and update or add it to the database upon
 * submission.
 * 
 * @param { 🔴 (button or link to close the modal). } handleClose - ınt erasers in
 * the Modal component, allowing you to call the Modal's `onClose` event handler when
 * the Modal is closed.
 * 
 * 		- `open`: A boolean value indicating whether the modal is currently open or not.
 * 		- `info`: An object containing the form data, with fields such as `name`, `phone`,
 * `address`, and `image`.
 * 
 * 	The `handleChange` function takes an event object `e` as input and updates the
 * `info` object by assigning the values of the target element(s) to the corresponding
 * fields in the `info` object.
 * 
 * 	The `handleSubmit` function takes no input parameter and is responsible for
 * handling the form submission. It prevents the default form submission behavior,
 * and depending on whether the `info._id` property exists, it calls either the
 * `putStock()` or `postStock()` function to update the firm in the database. Finally,
 * it closes the modal by calling the `handleClose()` function.
 * 
 * @param { boolean } open - open status of the modal, indicating whether the modal
 * should be displayed or not.
 * 
 * @param { object } info - firm details to be updated or added, which is used to
 * update or add the firm record in the firms collection of the MongoDB database based
 * on the input received from the form fields.
 * 
 * @param { object } setInfo - state of firm information and updates it by merging
 * the form inputs with the current state of the firm information when the form is submitted.
 * 
 * @returns { any } a form for adding or updating firm information.
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
   * @description Updates `info` by setting a new value for a specific key based on the
   * name and current value of the form input that triggered the event.
   * 
   * @param { object } e - target object and provides its name and value to the `setInfo()`
   * function.
   */
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  /**
   * @description Prevents the form's default submission behavior, checks if the `_id`
   * property is present in the form data, and submits the data to the `firms` or `stock`
   * endpoint depending on the presence of the `_id` property. It also hides the modal.
   * 
   * @param { event. } e - ‟Event“ object passed from the listener, which contains
   * information about the event that triggered the function.
   * 
   * 		- `preventDefault()`: prevents the default form submission behavior to occur.
   * 		- `_id`: the unique identifier for the firm being added or updated. If present,
   * it indicates that the input is a patch request.
   * 		- `putStock()`: the method to be called to update the stock of the firm in the
   * firms collection.
   * 		- `postStock()`: the method to be called to create a new record in the firms collection.
   * 		- `handleClose()`: the method to be called when the form is closed.
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
