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
 * @description Displays a list of products and provides an "New Product" button to
 * create a new product. It also renders a modal for adding or editing products, which
 * fetches stock data from APIs on button click.
 * 
 * @returns { jsx.element } a React component that displays a list of products and
 * allows users to create new ones.
 * 
 * 		- `getStock`: The `getStock` function is a hook that retrieves stock information
 * from an API. It takes no arguments and returns a promise of an object containing
 * the stock data.
 * 		- `firms`: The `firms` property is an array of firms, which is retrieved from
 * the state of the application using the `useSelector` hook.
 * 		- `open`: The `open` property is a boolean value that indicates whether the modal
 * is currently open or closed. It is initialized to false and updated using the
 * `handleOpen` function.
 * 		- `setOpen`: The `setOpen` function is used to update the value of the `open` property.
 * 		- `info`: The `info` property is an object that contains the initial state of
 * the product form. It has three properties: `categoryId`, `brandId`, and `name`.
 * These properties are initialized to empty strings and updated using the `handleClose`
 * function.
 * 		- `ProductModal`: The `ProductModal` component is a custom React component that
 * renders the product creation form when the modal is open. It takes several props,
 * including `handleClose`, `open`, and `info`, which are used to update the state
 * of the form.
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
   * @description Sets `open` to `false` and initializes `info` to its default state,
   * preparing the component for an unexpected termination.
   */
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
