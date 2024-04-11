import { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";

function LoginPage() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf, password }),
      });
  
      if (response.ok) {
        console.log("response", response);
        
        const responseUser = await response.json();
        
        console.log("responseUser: ", responseUser);
        if (responseUser === "Login successful!") {

          

          const responseUserByCpf = await fetch(`http://localhost:8080/users/${responseUser.cpf}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });

          if(responseUserByCpf){
  
            const {fullName, userType, cpf} = responseUserByCpf;

          }else{

          }



        } else {
          console.error('Login failed:', responseUser);
        }
      } else {
        console.error('Login failed:', response.status);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <div>
        <Typography variant="h6" align="center" gutterBottom>
          Sistema de Gestão de Pontos
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form>
          <TextField
            fullWidth
            margin="normal"
            label="Informe seu CPF"
            variant="outlined"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Informe sua Senha"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={cpf.trim().length < 11 || password.trim().length < 1}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default LoginPage;
