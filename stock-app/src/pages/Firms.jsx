
import * as React from "react";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react"
import useStockRequest from "../services/useStockRequest"
import { useSelector } from "react-redux"

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import FirmCard from "../components/FirmCard";
import FirmModal from "../components/FirmModal";


 const Firms = () => {
   const { firms } = useSelector((state) => state.stock);
   // const { getFirms } = useStockRequest();
   const { getStock } = useStockRequest();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

   useEffect(() => {
     // getFirms();
     // getStock("sales");
     getStock("firms");
   }, []);

   // console.log(firms);

   return (
     <>
       <Typography variant="h3" color={"error"} mb={2}>
         Firms
       </Typography>

       <Button variant="contained" onClick={handleOpen}>
         NEW FIRM
       </Button>
       <FirmModal handleClose={handleClose} open={open} />

       <Grid container gap={2} mt={3} justifyContent={"center"}>
         {firms?.map((firm) => (
           <Grid item key={firm._id}>
             <FirmCard firm={firm} />
           </Grid>
         ))}
       </Grid>
     </>
   );
 };
export default Firms;