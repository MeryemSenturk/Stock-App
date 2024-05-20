import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FirmModal from "../components/FirmModal";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal.jsx";
import TableSkeleton, { NoDataMessage } from "../components/DataFetchMessages.jsx";

/**
 * @description Fetches stock data from API, creates a table with products, and
 * displays it to the user. It also includes a modal for creating new products and
 * setting initial product state.
 * 
 * @returns { JSX element } a web page displaying a table of products, a "New Product"
 * button, and a modal window for creating new products.
 * 
 * 		- `Products`: This is an array of objects representing the products available
 * in the catalog. Each object contains the following properties:
 * 		+ `id`: A unique identifier for each product.
 * 		+ `name`: The name of the product.
 * 		+ `price`: The price of the product.
 * 		+ `categoryId`: The ID of the category to which the product belongs.
 * 		+ `brandId`: The ID of the brand that produces the product.
 * 		+ `image`: An image of the product.
 * 		- `loading`: A boolean indicating whether the data is still loading or has
 * finished loading.
 * 		- `products`: An array of objects representing the products available in the
 * catalog, as described above.
 */
const Products = () => {
  const { getStock } = useStockRequest();
const {loading} = useSelector((state) => state.stock)
const {products} = useSelector((state) => state.stock)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const initialState = {
    categoryId: "",
    brandId: "",
    name: "",
  };
  const [info, setInfo] = useState(initialState);

  /**
   * @description Sets the `open` state to `false` and the `info` state to an initial
   * value.
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
{!products.length && <NoDataMessage/> }

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
