import { useSelector } from "react-redux";
import useStockRequest from "../services/useStockRequest";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { btnStyle } from "../styles/globalStyles";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

/**
 * @description Renders a DataGrid component displaying purchases data. It takes
 * advantage of React Hooks to manage state, using `useStockRequest` to fetch stock
 * data and `useSelector` to select the necessary data from the Redux state.
 * 
 * @param { object } setInfo - updated state of the Purchase objects, which are used
 * to render the actions cell in the DataGrid.
 * 
 * @param { Function. } handleOpen - `open` action to trigger when an action item is
 * clicked, allowing for the updating and refreshing of the DataGrid display as needed.
 * 
 * 		- `handleOpen`: It is a function that performs some action when called.
 * 		- `setInfo`: It is a function that sets a new value for the `_id`, `brandId`,
 * `productId`, `quantity`, `price`, and `firmId` fields of an object.
 * 		- `deleteStock`: It is a function that deletes a stock record with the specified
 * `_id`.
 * 
 * @returns { object } a DataGrid component displaying purchase information in a
 * tabular format, with buttons for editing and deleting each row.
 */
const PurchaseTable = ({ setInfo, handleOpen }) => {
  const { purchases } = useSelector((state) => state.stock);
  const { deleteStock } = useStockRequest();

  const getRowId = (row) => row._id;

  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      /**
       * @description Takes a `row` parameter and returns the date and time of the row's
       * creation in the format "de-DE".
       * 
       * @param { `Row`. } row - date and time information for the given row of data.
       * 
       * 		- `createdAt`: The date and time when the row was created in ISO 8601 format.
       * 
       * @returns { string } a localized date string in German format.
       */
      renderCell: ({ row }) => {
        return new Date(row.createdAt).toLocaleString("de-DE");
      },
    },
    {
      field: "firmId",
      headerName: "Firm",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => row?.firmId?.name,
    },
    {
      field: "brandId",
      headerName: "Brand",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => row?.brandId?.name,
    },
    {
      field: "productID",
      headerName: "Product",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => row?.productId?.name,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 40,
      headerAlign: "center",
      align: "center",
      /**
       * @description Generates two grid actions cell items for editing and deleting a stock
       * purchase record. The edit button allows modification of the record, while the
       * delete button permanently deletes it.
       * 
       * @returns { array } an array of two `GridActionsCellItem` components, each containing
       * a custom icon and label for editing and deleting the stock item, respectively.
       */
      renderCell: ({
        row: { brandId, productId, quantity, price, firmId, _id },
      }) => {
        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              handleOpen();
              setInfo({ _id, brandId, productId, quantity, price, firmId });
            }}
            sx={btnStyle}
          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteStock("purchases", _id)}
            sx={btnStyle}
          />,
        ];
      },
    },
  ];
  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <DataGrid
        autoHeight
        rows={purchases}
        columns={columns}
        pageSizeOptions={[20, 50, 75, 100]} //? sayfa basina satir sayisi
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        getRowId={getRowId}
      />
    </Box>
  );
};

export default PurchaseTable;
