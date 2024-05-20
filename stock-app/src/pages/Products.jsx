import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FirmModal from "../components/FirmModal";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal.jsx";
import TableSkeleton from "../components/DataFetchMessages.jsx";

const Products = () => {
  const { getStock } = useStockRequest();
const {loading} = useSelector((state) => state.stock)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const initialState = {
    categoryId: "",
    brandId: "",
    name: "",
  };
  const [info, setInfo] = useState(initialState);

  const handleClose = () => {
    setOpen(false);
    setInfo(initialState);
  };

  useEffect(() => {
    getStock("products");
    getStock("categories");
    getStock("brands");
  }, []);

  return (
    <div>
      <Typography variant="h4" color={"error"} mb={2}>
        Products
      </Typography>

      <Button variant="contained" onClick={handleOpen} sx={{ mb: 3 }}>
        New Product
      </Button>

{loading && <TableSkeleton/>}

      <ProductModal
        handleClose={handleClose}
        open={open}
        info={info}
        setInfo={setInfo}
      />

      <ProductTable />
    </div>
  );
};

export default Products;
