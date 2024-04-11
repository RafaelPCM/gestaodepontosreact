// eslint-disable-next-line no-unused-vars
import React from "react";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 150,
  },
}));

function DashboardPage() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h2>DashBoard</h2>
      {/* Aqui você pode implementar o formulário de registro de ponto */}
    </div>
  );
}

export default DashboardPage;
