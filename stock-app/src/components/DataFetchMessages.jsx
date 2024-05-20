import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Alert from "@mui/material/Alert";

/**
 * @description Returns an alert with a warning message indicating that no data is available.
 * 
 * @returns { Component } an alert with a severity of warning and the message
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
 * @description Generates high-quality documentation for code given to it.
 */
export const cardSkeleton = () => {
    
}

/**
 * @description Generates a table with five rectangular skeletons, each with a different
 * height and width ratio. The skeletons are stacked horizontally, with each one
 * occupying half the width of the container.
 * 
 * @returns { array } a stack of six skeleton tables, each with a rectangular shape
 * and varying heights.
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

