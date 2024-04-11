import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  card: {
    marginBottom: "20px",
  },
  icon: {
    marginRight: "10px",
  },
  cardContent: {
    height: 100,
    display: "flex",
    alignItems: "center",
  },
}));

// eslint-disable-next-line react/prop-types
const RegisterCard = ({ time, description }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Grid container alignItems="center">
          <Grid item>
            {description === "Entrada" && (
              <AccessTimeIcon className={classes.icon} />
            )}
            {description === "Saída para Almoço" && (
              <LunchDiningIcon className={classes.icon} />
            )}
            {description === "Retorno do Almoço" && (
              <LunchDiningIcon className={classes.icon} />
            )}
            {description === "Saída" && (
              <ExitToAppIcon className={classes.icon} />
            )}
          </Grid>
          <Grid item>
            <Box>
              <Typography variant="h6">{time}</Typography>
              <Typography variant="body2" color="textSecondary">
                {description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RegisterCard;
