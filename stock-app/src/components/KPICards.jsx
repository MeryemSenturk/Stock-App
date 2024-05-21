
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { pink, deepPurple, amber } from "@mui/material/colors"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import {Typography } from "@mui/material";

/**
 * @description Maps through an array of KPI data and renders a row of cards with
 * icons, titles, amounts, and background colors. Each card includes an Avatar component
 * for the icon and a Box component for the title and amount.
 * 
 * @returns { object } a grid of cards with icons and text displaying key performance
 * indicators (KPIs) for sales, profit, and purchases.
 */
const KPICards = () => {
    const kpiData = [
      {
        id: 1,
        title: "Sales",
        icon: <MonetizationOnIcon sx={{ fontSize: "1.7rem" }} />,
        amount: "€12000",
        color: deepPurple[700],
        bgColor: deepPurple[100],
      },
      {
        id: 2,
        title: "Profit",
        icon: <ShoppingBasketIcon sx={{ fontSize: "1.8rem" }} />,
        amount: "€35000",
        color: pink[700],
        bgColor: pink[100],
      },
      {
        id: 3,
        title: "purchases",
        icon: <LocalMallIcon sx={{ fontSize: "1.7rem" }} />,
        amount: "€35000",
        color: amber[700],
        bgColor: amber[100],
      },
    ];
  return (
    <Stack justifyContent={"center"} alignItems={"center"} flexWrap={"wrap"} direction={"row"} gap={2}>
      {kpiData.map((data) => (
        <Paper
          key={data.id}
          elevation={3}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: 275,
            p: 2,
            pl: 3,
            gap: 2,
          }}
        >
          <Avatar sx={{ bgcolor: data.bgColor, color: data.color }}>
            {data.icon}
          </Avatar>
          <Box>
            <Typography variant="button">{data.title}</Typography>
            <Typography variant="h5">{data.amount}</Typography>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
}

export default KPICards