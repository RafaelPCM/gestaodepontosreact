import { Container, Grid, Button } from "@mui/material";
import RegisterCard from "./RegisterCard";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import dayjs from "dayjs";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 150,
  },
  card: {
    width: "100%",
    marginBottom: "20px",
  },
  button: {
    width: "100%",
  },
}));

const RegisterPointPage = () => {
  const classes = useStyles();

  const [entryPoint, setEntryPoint] = useState(null);
  const [lunchExitPoint, setLunchExitPoint] = useState(null);
  const [lunchReturnPoint, setLunchReturnPoint] = useState(null);
  const [exitPoint, setExitPoint] = useState(null);



  const userData = JSON.parse(localStorage.getItem("userData"));

  console.log('user', JSON.stringify(userData));


  const addEntryPoint = () => {
    setEntryPoint(dayjs().format("DD/MM/YYYY HH:mm:ss"));
  };

  const addLunchExitPoint = () => {
    setLunchExitPoint(dayjs().format("DD/MM/YYYY HH:mm:ss"));
  };

  const addLunchReturnPoint = () => {
    setLunchReturnPoint(dayjs().format("DD/MM/YYYY HH:mm:ss"));
  };

  const addExitPoint = () => {
    setExitPoint(dayjs().format("DD/MM/YYYY HH:mm:ss"));
  };



  return (
    <Container maxWidth="md">
      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            {entryPoint && (
              <RegisterCard
                time={entryPoint}
                description="Entrada"
                className={classes.card}
              />
            )}
            <Button
              onClick={addEntryPoint}
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={entryPoint}
            >
              Entrada
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {lunchExitPoint && (
              <RegisterCard
                time={lunchExitPoint}
                description="Saída para Almoço"
                className={classes.card}
              />
            )}
            <Button
              onClick={addLunchExitPoint}
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={lunchExitPoint}
            >
              Saída Almoço
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {lunchReturnPoint && (
              <RegisterCard
                time={lunchReturnPoint}
                description="Retorno Almoço"
                className={classes.card}
              />
            )}
            <Button
              onClick={addLunchReturnPoint}
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={lunchReturnPoint}
            >
              Ret. Almoço
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {exitPoint && (
              <RegisterCard
                time={exitPoint}
                description="Saída"
                className={classes.card}
              />
            )}
            <Button
              onClick={addExitPoint}
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={exitPoint}
            >
              Saída
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default RegisterPointPage;
