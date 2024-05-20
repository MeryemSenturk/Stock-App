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
import { useSelector } from "react-redux";


/**
 * @description Is used to create a modal window for adding a product to the stock
 * system. It accepts information about the product and its categories and brands,
 * and allows the user to input the name of the product. The function then submits
 * the information to the server using the `postStock` function and closes the modal
 * window when the form is submitted successfully.
 * 
 * @param { 🔴Button click event. } handleClose - function that is called when the
 * modal window is closed, which can be used to perform any necessary actions when
 * the user navigates away from the product creation form.
 * 
 * 		- `open`: The current status of the modal (true if open, false otherwise)
 * 		- `setInfo`: A function that updates the product information by assigning the
 * modified form inputs to the `info` object
 * 		- `postStock`: A function that sends a request to the stock API to create or
 * update a product
 * 		- `categories`: An array of categories available for selection in the category
 * picker
 * 		- `brands`: An array of brands available for selection in the brand picker
 * 
 * 	In detail, the properties of `handleClose` are:
 * 
 * 		- `onClose`: The function to call when the modal is closed (defaults to `handleClose`)
 * 		- `open`: The current status of the modal (true if open, false otherwise)
 * 
 * @param { boolean } open - status of the modal, which is either `true` if the modal
 * is open or `false` if it's closed.
 * 
 * @param { object } info - products details that will be posted to the API upon form
 * submission, and its values are updated through the `handleChange` function.
 * 
 * @param { object } setInfo - information being edited, and updates it with the new
 * values entered by the user.
 * 
 * @returns { undefined value, as no explicit return statement is present in the code
 * provided } a modal window with a form to input product information, including
 * categories and brands.
 * 
 * 		- `open`: a boolean value indicating whether the modal is currently open (true)
 * or closed (false).
 * 		- `handleClose`: a function for closing the modal.
 * 		- `info`: an object containing information about the product to be added, including
 * the categories and brands selected. The properties of this object are:
 * 		+ `categoryId`: a string value representing the ID of the selected category.
 * 		+ `brandId`: a string value representing the ID of the selected brand.
 * 		+ `name`: a string value representing the name of the product.
 * 
 * 	The function returns a JSX element that renders a modal window with a form for
 * adding a new product. The form includes inputs for entering the product's name,
 * categories, and brands, as well as a submit button to send the data to the server.
 */
export default function ProductModal({ handleClose, open, info, setInfo }) {
  const { postStock} = useStockRequest();

const {categories, brands} = useSelector((state) => state.stock)
  

  /**
   * @description Updates `info` by setting a new value for the target object's `name`
   * property based on the user input change.
   * 
   * @param { object } e - target object whose value is being updated in the function.
   */
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  /**
   * @description Prevents the default form submission behavior, sends a request to the
   * `products` endpoint with the provided information, and closes the modal window.
   * 
   * @param { object } e - event object and prevents the default action of the event
   * from occurring by calling the `preventDefault()` method.
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
              <InputLabel id="categoryId">Categories</InputLabel>
              {/**
               * @description Allows users to select a category from a list of available options
               * based on the categoryId value provided.
               * 
               * @param { string } labelId - identity of the label for the `Select` component.
               * 
               * @param { string } id - category Id chosen from the options given by the user in
               * the `Select` component.
               * 
               * @param { string } name - selected category's name within the `categories` map.
               * 
               * @param { `id`. } value - unique identifier of the selected category.
               * 
               * 		- `labelId`: The unique identifier of the label for this field.
               * 		- `id`: A globally unique identifier for this field.
               * 		- `name`: The user-friendly name of this field.
               * 		- `value`: The deserialized value of the field.
               * 
               * 	Note that `value` can be a complex object with multiple properties and attributes,
               * depending on the format of the input data.
               * 
               * @param { string } label - `categories` component label, which displays the name
               * of the selected category to the user.
               * 
               * @param { `function`. } onChange - callback function called whenever there is a
               * change in value of the `categoryId` input field.
               * 
               * 		- labelId: String, the ID of the label element associated with the select menu
               * 		- id: String, the unique identifier for the select menu
               * 		- name: String, the name attribute of the form element for the select menu
               * 		- value: Any, the value of the select menu at runtime (usually an ID or other value)
               * 		- label: String, the text content of the associated label element
               * 		- handleChange: Function, a function called when the user selects an item from
               * the menu. Takes two arguments: (value, event)
               */}
              <Select
                labelId="categoryId"
                id="categoryId"
                name="categoryId"
                value={info.categoryId}
                label="Categories"
                onChange={handleChange}
                required
              >
                {categories.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="brandId">Brands</InputLabel>
              {/**
               * @description Allows users to select a brand from a list of available brands.
               * 
               * @param { string } labelId - ID of the label element for the Brands dropdown menu,
               * which is used to identify the label element and set its value when the component
               * mounts.
               * 
               * @param { string } id - _id of a brand in the database.
               * 
               * @param { string } name - brand selected by the user from the provided options,
               * with its value being passed as the `info.brandId` variable to further process.
               * 
               * @param { `id`. } value - brand ID chosen by the user from the presented brands list.
               * 
               * 		- `labelId`: The unique identifier for this label within the form. (String, required)
               * 		- `id`: A globally unique identifier for this element, used to identify the
               * element in metadata and serialization. (String, required)
               * 		- `name`: The name of the input field, used to identify the name of the input
               * field in metadata and serialization. (String, required)
               * 		- `value`: The selected brand ID. (String, required)
               * 		- `label`: The label text for this input field. (String, required)
               * 		- `onChange`: A callback function called when the input value changes. (Function,
               * optional)
               * 		- `required`: Whether or not the field is required. (Boolean, optional)
               * 
               * @param { string } label - name of the brands list options for the select field,
               * providing a label for each option to be displayed to the user.
               * 
               * @param { `Event`. } onChange - function that will be called whenever the value of
               * the `labelId` input changes.
               * 
               * 	labelId: a string that represents the ID of the label element for this function.
               * It has the value 'brandId'.
               * 	id: a unique integer identifier of this function within the component. It has the
               * value 38.
               * 	name: a string that is used to identify the name of the function within the
               * component. It has the value 'Brands'.
               * 	value: the value of this function, which is assigned the deserialized input
               * `info.brandId`. It has the value of 1234567890.
               * 	label: a string that represents the visible text for the function in the UI. It
               * has the value 'Brands'.
               */}
              <Select
                labelId="brandId"
                id="brandId"
                name="brandId"
                value={info.brandId}
                label="Brands"
                onChange={handleChange}
                required
              >
                {brands.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              value={info.name}
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
