
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useEffect } from "react"
import useStockRequest from "../services/useStockRequest"
import { useSelector } from "react-redux"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { btnStyle } from "../styles/globalStyles";


 const Firms = ({firm}) => {
    const stock = useSelector((state) => state.stock.firms);
    // const { getFirms } = useStockRequest();
const { getStock } = useStockRequest();
    useEffect(() => {
      // getFirms();
        // getStock("sales");
      getStock("firms");
    }, []);
const { deleteStock } = useStockRequest();
    // console.log(firms);

  return (
    <>
      <Typography variant="h3" color={"error"} mb={2}>
        Firms
      </Typography>

      <Button variant="contained" disableElevation>
        NEW FIRM
      </Button>

      <Grid container gap={2} mt={3} justifyContent={"center"}>
        {stock?.map((item) => (
          <Grid item key={item._id}>
            <Card
              sx={{
                maxWidth: 345,
                height: "400px",
                width: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
              }}
            >
              <CardHeader title={item.name} sx={{ textAlign: "center" }} />
              <CardMedia
                component="img"
                height="150"
                image={item.image}
                alt="firms"
                sx={{ objectFit: "contain" }}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  {item.address}
                </Typography>
              </CardContent>
              <CardActions disableSpacing sx={{ justifyContent: "center" }}>
                <IconButton aria-label="delete">
                  <DeleteOutlineIcon
                    sx={btnStyle}
                    onClick={() => deleteStock("firms", firm._id)}
                  />
                </IconButton>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
export default Firms;