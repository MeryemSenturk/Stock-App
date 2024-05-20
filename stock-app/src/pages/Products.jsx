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

/**
 * @description Manages the display of products, including handling modal opens and
 * closes, loading states, and product information. It retrieves stock data from API
 * endpoints and renders a table or skeleton when data is loading.
 * 
 * @returns { JSXElement } a React component that displays a table of products when
 * open and a form to add new products when closed.
 * 
 * 		- `loading`: This is an boolean property that indicates whether the data is
 * loading or not. It is initialized to `true` when the component mounts and is set
 * to `false` once the data has been loaded.
 * 		- `info`: This is an object property that contains the initial state of the
 * product catalog. It has three properties: `categoryId`, `brandId`, and `name`.
 * 		- `ProductModal`: This is a functional component that is rendered when the user
 * clicks on the "New Product" button. It takes in several props, including `handleClose`
 * (a function to close the modal), `open` (a boolean indicating whether the modal
 * is open or not), and `info` (an object containing the initial state of the product
 * catalog).
 * 		- `ProductTable`: This is a React table component that displays the list of
 * products. It is rendered conditionally based on whether the data is loading or not.
 */
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

  /**
   * @description Sets `open` to `false` and `info` to its initial state.
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
