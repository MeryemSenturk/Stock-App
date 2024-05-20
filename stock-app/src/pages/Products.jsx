import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FirmModal from "../components/FirmModal";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal.jsx";

/**
 * @description Creates a form to input product details and displays them using
 * `ProductModal`. It gets stock information via `useStockRequest`.
 * 
 * @returns { JSX element } a React component that displays a list of products and
 * allows for creating new products.
 * 
 * 		- `getStock`: This is a function that retrieves stock information from an API
 * endpoint. It takes no arguments.
 * 		- `firms`: This is an array of firm objects that contain information about each
 * firm. Each object in the array has the following properties: `id`, `name`, and `logo`.
 * 		- `open`: This is a boolean variable that indicates whether the product modal
 * is open or not. It is initialized to `false` by default.
 * 		- `setOpen`: This is a function that sets the value of `open` to either `true`
 * or `false`.
 * 		- `info`: This is an object that contains initial state for the product form.
 * It has three properties: `categoryId`, `brandId`, and `name`.
 * 		- `handleClose`: This is a function that sets the value of `open` to `false` and
 * resets the `info` object to its initial state.
 * 		- `useEffect`: This is a hook that causes the `getStock` function to be executed
 * when the component mounts. It takes no arguments.
 */
const Products = () => {
  const { getStock } = useStockRequest();
  const { firms } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const initialState = {
    categoryId: "",
    brandId: "",
    name: "",
  };
  const [info, setInfo] = useState(initialState);

  /**
   * @description Sets `open` to `false` and `info` to its initial state.
   */
  const handleClose = () => {
    setOpen(false);
    setInfo(initialState);
  };

  useEffect(() => {
    getStock("products");
  }, []);

  return (
    <div>
      <Typography variant="h4" color={"error"} mb={2}>
        Products
      </Typography>

      <Button variant="contained" onClick={handleOpen} sx={{ mb: 3 }}>
        New Product
      </Button>

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
