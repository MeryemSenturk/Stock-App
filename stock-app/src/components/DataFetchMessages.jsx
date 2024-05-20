import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Alert from "@mui/material/Alert";

/**
 * @description Will render an Alert component with a severity level set to "warning"
 * and an message string of " Gösterilecek veri bulunamadı".
 * 
 * @returns { Component } an alert with a severity of "warning" and the message
 * "Gösterilecek veri bulunamadı".
 */
export const NoDataMessage = () => {
  return (
    <Alert sx={{ mt: 3 }} severity="warning">
      Gösterilecek veri bulunamadı
    </Alert>
  );
};

/**
 * @description Generates five `<Skeleton>` components for a table with varying sizes
 * and spacings, each occupying a separate row in the return value of the function.
 * 
 * @returns { array } a stack of five skeletons of different shapes and sizes, each
 * occupying the entire width of the parent element.
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

