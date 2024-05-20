
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { deepOrange} from "@mui/material/colors";
import EuroIcon from '@mui/icons-material/Euro';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {Typography } from "@mui/material";

const KPICards = () => {
    const kpiData = [
      {
        id: 1,
        title: "Sales",
        icon: <EuroIcon />,
        amount: "€12000",
        color: "pink",
        bgColor: "hotpink",
      },
      {
        id: 2,
        title: "Profit",
        icon: <ShoppingCartIcon />,
        amount: "€35000",
        color: "purple",
        bgColor: "hotpink",
      },
    ];
  return (
    <Stack justifyContent={"center"} alignContent={"center"} flexWrap={"wrap"}>
      {kpiData.map((data) => (
        <Paper key={data.id} elevation={3}>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
          <Box>
            <Typography>{data.title}</Typography>
            <Typography>{data.amount}</Typography>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
}

export default KPICards