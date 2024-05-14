import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";

/**
 * @description Creates a data grid component with columns for ID, categories, brands,
 * name, stock, and actions. The actions column includes a delete button that calls
 * the `deleteStock` function when clicked.
 * 
 * @returns { object } a React DataGrid component displaying a table of product
 * information with various columns and actions.
 */
export default function ProductTable() {
  const { deleteStock } = useStockRequest();
  const { products } = useSelector((state) => state.stock);

  const getRowId = (row) => row._id;

  const columns = [
    { field: "_id", headerName: "#", minWidth: 150, flex: 1.4 },
    {
      field: "categoryId",
      headerName: "Categories",
      flex: 1,
      minWidth: 100,
      // valueGetter: (value, row) => {
      //   console.log("ROW:", row, "VALUE:", value)
      //   return value?.name
      // },
      valueGetter: (value) => value?.name,
    },
    {
      field: "brandId",
      headerName: "Brands",
      headerAlign: "center",
      align: "center",
      width: 150,
      flex: 1.2,
      // editable: true,
      valueGetter: (value) => value?.name,
    },
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      align: "center",
      flex: 1.1,
      miWidth: 110,
      // editable: true,
    },
    {
      field: "quantity",
      headerName: "Stock",
      sortable: true,
      headerAlign: "center",
      align: "center",
      width: 160,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Operations",
      /**
       * @description Returns an array containing a delete action for a given `id`. When
       * the delete action is clicked, it calls the `deleteStock` function with the arguments
       * `"products"` and the provided `id`.
       * 
       * @param { object } props - `GridActionsCellItem` component's prop of `id`, which
       * is passed from the parent component as an identifier for the product to be deleted.
       * 
       * @returns { object } an array of actions for deleting a product with the specified
       * `id`.
       */
      getActions: (props) => {
        return [
          <GridActionsCellItem
            icon={<DeleteForeverIcon />}
            onClick={() => deleteStock("products", props.id)}
            label="Delete"
          />,
        ];
      },
    },
  ];

  console.log(products);
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        autoHeight
        rows={products}
        columns={columns}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={getRowId}
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}
