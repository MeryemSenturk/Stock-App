import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import useStockRequest from "../services/useStockRequest";
import { modalStyle } from "../styles/globalStyles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


/**
 * @description Creates a modal component that allows users to input information about
 * a product, including age and address. When the "ADD PRODUCT" button is clicked,
 * the information is sent to a postStock() request.
 * 
 * @param { function. } handleClose - function to call when the modal is closed.
 * 
 * 		- `open`: Whether the modal is currently open (a boolean value)
 * 		- `open`: The current state of the modal (open or closed)
 * 		- `info`: An object containing information about the product to be added, with
 * properties such as address (a string value)
 * 
 * @param { boolean } open - Modal component's current open state, which is passed
 * as a prop to the Modal component to control its visibility.
 * 
 * @param { object } info - input product details, such as address, that can be edited
 * and sent to postStock
 * 
 * @param { object } setInfo - 4th argument provided to the `ProductModal` function
 * and updates the `info` object using the provided information from the user inputs,
 * which is then returned as an updated state.
 * 
 * @returns { any } a form for adding a new product, with fields for address and age
 * selection.
 */
export default function ProductModal({ handleClose, open, info, setInfo }) {


  const { postStock} = useStockRequest();


  

  /**
   * @description Sets the specified property of the `info` object to the corresponding
   * value of the target element when the user changes it.
   * 
   * @param { object } e - Event object that contains information about the form value
   * change, and its `target` property provides the name of the form field whose value
   * is being updated.
   */
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  /**
   * @description Prevented the default form submission behavior, passed the form data
   * to the `postStock` function, and then closed the modal window.
   * 
   * @param { object } e - event object and prevents the default behavior of the button's
   * action.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
      //? post firma işlemi
      postStock("products", info);
    
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
        <Box sx={modalStyle}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component={"form"}
            onSubmit={handleSubmit}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

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

            <Button variant="contained" type="submit">
              ADD PRODUCT
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
