
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


 const Firms = () => {
    const firms = useSelector((state) => state.firms.firms);
    const { getFirms } = useStockRequest();

    useEffect(() => {
      getFirms();
    }, []);

    // console.log(firms);

  return (
    <>
      <Typography variant="h3" color="text.secondary">
       Firms
      </Typography>

      <Button variant="contained" disableElevation>
        NEW FIRM
      </Button>

      <Grid container spacing={2}>
        {firms?.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader title={item.name} sx={{ textAlign: "center" }} />
              <CardMedia
                component="img"
                height="150"
                image={item.image}
                alt="firms"
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  {item.address}
                </Typography>
              </CardContent>
              <CardActions disableSpacing sx={{ justifyContent: "center" }}>
                <IconButton aria-label="delete">
                  <DeleteOutlineIcon />
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