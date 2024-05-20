import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";

/**
 * @description Defines a data grid with columns for id, categories, brands, name,
 * and stock. It also provides actions to delete products. The grid displays the
 * products in a list view and allows for row selection and deletion.
 * 
 * @returns { JSX Element } a DataGrid component displaying a list of products with
 * various columns and actions.
 * 
 * 	1/ `Box`: This component is used to wrap the rest of the components inside a
 * container with defined styles (sx).
 * 	2/ `<DataGrid>`: This is the main component that renders a grid of products, along
 * with their corresponding columns and data.
 * 	3/ `rows`: This property holds an array of product objects that are displayed in
 * the grid.
 * 	4/ `columns`: This property holds an array of column objects that define the
 * structure of the grid, including the fields to be displayed, their header names,
 * and their widths.
 * 	5/ `pageSizeOptions`: This property provides options for the number of products
 * displayed on each page.
 * 	6/ `checkboxSelection`: This property enables/disables checkbox selection for
 * rows in the grid.
 * 	7/ `disableRowSelectionOnClick`: This property disables row selection when a user
 * clicks on a row.
 * 	8/ `getRowId`: This function defines the `rowId` prop of each product object in
 * the `rows` array.
 * 	9/ `<GridActionsCellItem>`: This component renders an action item for each product
 * in the grid, which allows users to delete the product when clicked.
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
      // value propu fielda verileni getirir. 
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
       * @description Generates a grid action item that when clicked, deletes the specified
       * stock with the ID "products" and any associated data.
       * 
       * @param { object } props - products data object that contains the product's ID,
       * which is used to identify the product to be deleted.
       * 
       * @returns { object } an array of a DeleteForeverIcon button and an onClick handler
       * for deleting a product with the ID provided.
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
