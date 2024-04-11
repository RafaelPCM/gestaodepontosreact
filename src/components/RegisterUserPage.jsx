import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Container, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { toast } from "react-toastify";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 150,
  },
  form: {
    width: "100%",
    marginTop: "20px",
  },
  textField: {
    marginBottom: "20px",
  },
  button: {
    marginTop: "20px",
  },
}));

function RegisterUserPage() {
  const classes = useStyles();
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("COMMON");
  const [workdayType, setWorkdayType] = useState("");

  const history = useHistory();


  const userData = JSON.parse(localStorage.getItem("userData"));

  


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${userData?.cpf}:${password}`)}`,
        },
        body: JSON.stringify({
          fullName: fullName,
          cpf: cpf,
          password: password,
          userType: userType,
          workdayType: workdayType
        }),
      });

      if (response.ok) {
        toast.success("Dados inseridos com sucesso!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("User registered successfully");
        history.push("/dashboard");
      } else {
        toast.error("Erro ao inserir os dados!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.error("Failed to register user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <div className={classes.container}>
        <h2>Cadastrar Novo Usuário</h2>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                variant="outlined"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="CPF"
                variant="outlined"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Senha"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" className={classes.textField}>
                <InputLabel id="user-type-label">Tipo de Usuário</InputLabel>
                <Select
                  labelId="user-type-label"
                  id="user-type"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  label="Tipo de Usuário"
                >
                  <MenuItem value={"COMMON"}>Comum</MenuItem>
                  <MenuItem value={"ADMIN"}>Administrador</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" className={classes.textField}>
                <InputLabel id="user-type-label">Tipo de Usuário</InputLabel>
                <Select
                  labelId="user-type-label"
                  id="user-type"
                  value={workdayType}
                  onChange={(e) => setWorkdayType(e.target.value)}
                  label="Tipo de Usuário"
                >
                  <MenuItem value={"SIX_HOUR_CONTINUOUS"}>6 horas contínuas</MenuItem>
                  <MenuItem value={"EIGHT_HOUR_WITH_BREAK"}>8 horas com pausa para o almoço</MenuItem>
                </Select>
              </FormControl>
            </Grid>

          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: 5 }}
            disabled={fullName.length < 3 || cpf.length < 11 || password.length < 3}
          >
            Cadastrar
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default RegisterUserPage;
