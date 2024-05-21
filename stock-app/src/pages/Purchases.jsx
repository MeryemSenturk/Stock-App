import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import PurchaseModal from "../components/PurchaseModal";
import PurchaseTable from "../components/PurchaseTable";
import { Button, Container } from "@mui/material";
import TableSkeleton, {
  ErrorMessage,
  NoDataMessage,
} from "../components/DataFetchMessages";
import { useSelector } from "react-redux";

/**
 * @description Gets stock data from the API using `getStock` and `getProPurBraFirmStock`.
 * It also uses state management to handle the opening and closing of a purchase
 * modal, and displays either a table of purchases or a message if there are no purchases.
 * 
 * @returns { object } a component that displays a form for adding new purchases,
 * with a modal for editing existing ones.
 */
const Purchases = () => {
  const { getStock, getProPurBraFirmStock } = useStockRequest();
  const { error, loading, purchases } = useSelector((state) => state.stock);

  const [open, setOpen] = useState(false);

  const initialState = {
    brandId: "",
    firmId: "",
    productId: "",
    quantity: "",
    price: "",
  };
  const [info, setInfo] = useState(initialState);

  const handleOpen = () => setOpen(true);
  /**
   * @description Sets `open` to `false` and `info` to its initial state.
   */
  const handleClose = () => {
    setOpen(false);
    setInfo(initialState);
  };

  useEffect(() => {
    // getStock("products")
    // getStock("purchases")
    // getStock("brands")
    // getStock("firms")
    getProPurBraFirmStock();
  }, []); // eslint-disable-line

  return (
    <Container maxWidth="xl">
      <Button variant="contained" onClick={handleOpen}>
        New Purchase
      </Button>

      {loading && <TableSkeleton />}
      {!loading && !purchases?.length && <NoDataMessage />}
      {!loading && purchases?.length > 0 && (
        <PurchaseTable setInfo={setInfo} handleOpen={handleOpen} />
      )}

      <PurchaseModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />
    </Container>
  );
};

export default Purchases;
