import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Alert from "@mui/material/Alert";

/**
 * @description Will render an Alert component with a severity of "warning" and a
 * message that could not be obtained.
 * 
 * @returns { Alert element } an Alert component with a warning message: "No data available".
 * 
 * 		- Alert: The output is a ReactAlert component, which displays a warning message
 * with a vertical margin of 3 pixels.
 * 		- severity: The attribute of the Alert component indicates the severity level
 * of the message, in this case, it is set to "warning".
 */
export const NoDataMessage = () => {
  return (
    <Alert sx={{ mt: 3 }} severity="warning">
      Gösterilecek veri bulunamadı
    </Alert>
  );
};


/**
 * @description Generates high-quality documentation for code by returning a skeleton
 * table with various sizes and shapes of rectangles.
 * 
 * @returns { SVG element, specifically `<Stack>` element with multiple child elements
 * of type `<Skeleton } a stack of five skeletons with varying heights and widths.
 * 
 * 	1/ Stack: The `Stack` component is used to render the skeleton table.
 * 	2/ spacing: The `spacing` prop is set to 1, which means there is a space between
 * each row in the skeleton table.
 * 	3/ sx: The `sx` prop is an object that defines various styling properties of the
 * table. In this case, it sets the `mt` (margin top) property to 3, which adds a
 * margin of 3 pixels to the top of each row in the table.
 * 	4/ <Skeleton> components: The function returns a JSX element containing four
 * `<Skeleton>` components, each with different properties:
 * 			- Height: The height of each `<Skeleton>` component is set to either 90, 50,
 * 50, or 30 pixels, depending on the index of the component.
 * 			- Width: The width of each `<Skeleton>` component is set to 100% of the parent
 * element.
 * 	5/ Return value: The function returns the JSX element containing the skeleton table.
 */
const TableSkeleton = () => {
  return (
    <Stack spacing={1} sx={{ mt: 3 }}>
      <Skeleton variant="rectangular" width="100%" height={90} />
      <Skeleton variant="rectangular" width="100%" height={50} />
      <Skeleton variant="rectangular" width="100%" height={50} />
      <Skeleton variant="rectangular" width="100%" height={50} />
      <Skeleton variant="rectangular" width="100%" height={30} />
    </Stack>
  )
}

export default TableSkeleton;

