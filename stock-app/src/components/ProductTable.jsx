import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "_id", headerName: "#", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

/**
 * @description Generates a data grid with specified rows and columns, along with
 * pagination options and checkbox selection enabled.
 * 
 * @returns { HTMLDivElement } a React component that renders a data grid with specified
 * rows and columns, along with pagination and checkbox selection capabilities.
 * 
 * 		- `Box`: A React component that wraps around the `DataGrid` component, with a
 * height of 400 pixels and width equal to the full container width.
 * 		- `<DataGrid>`: The `DataGrid` component itself, which displays the grid of data.
 * 		- `rows`: An array of objects containing the data to be displayed in the grid.
 * 		- `columns`: An array of integers representing the number of columns in the grid.
 * 		- `initialState`: An object containing the initial state of the `DataGrid`,
 * including the `paginationModel` property with a page size of 5 and the `pageSizeOptions`
 * property with a list of available page sizes.
 * 		- `discoverRowSelectionOnClick`: A boolean value indicating whether row selection
 * should be disabled when clicking on a cell.
 * 		- `<Box>`: Another React component that provides a container for the `DataGrid`.
 */
export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
