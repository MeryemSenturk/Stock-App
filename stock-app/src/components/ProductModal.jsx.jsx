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
 * @description
 * 
 * @param {  } handleClose -
 * 
 * @param {  } open -
 * 
 * @param {  } info -
 * 
 * @param {  } setInfo -
 * 
 * @returns {  }
 */
export default function ProductModal({ handleClose, open, info, setInfo }) {


  const { postStock, putStock } = useStockRequest();


  

  /**
   * @description
   * 
   * @param {  } e -
   */
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  /**
   * @description
   * 
   * @param {  } e -
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

            <Button variant="contained" type="submit">
              {info._id ? "UPDATE FIRM" : "ADD FIRM"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}