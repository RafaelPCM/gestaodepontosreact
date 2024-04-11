import { Container, Grid, Button, TextField } from "@mui/material";
import RegisterCard from "./RegisterCard";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";

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
  const [workdayEntries, setWorkdayEntries] = useState([]);

  const [dateTimeRecordEntry, setDateTimeRecordEntry] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData"));


  useEffect(() => {
    const fetchWorkdayEntries = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/workdays/${userData.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${btoa(`${userData?.cpf}`)}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          setWorkdayEntries(data[0].workdayEntries);
          console.log(workdayEntries);
        } else {
          console.error("Failed to fetch workday");
        }
      } catch (error) {
        console.error("Error fetching workday:", error);
      }
    };
    fetchWorkdayEntries();
  }, []);



  const handleDateTimeChange = (e) => {
    setDateTimeRecordEntry(e.target.value);
  };

  const handleRegisterPoint = async (event) => {
    event.preventDefault();

    console.log(dateTimeRecordEntry);
    try {
      const response = await fetch(
        `http://localhost:8080/workdays/${userData?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(`${userData?.cpf}`)}`,
          },
          body: JSON.stringify({
            dateTimeRecordEntry: dateTimeRecordEntry,
          }),
        }
      );

      if (response.ok) {
        toast.success("Dados inseridos com sucesso!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("User registered successfully");
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            {workdayEntries.map((entry) => (
              <RegisterCard
                key={entry.id}
                time={dayjs(entry.dateTimeRecordEntry).format("DD/MM/YYYY HH:mm:ss")}
                description={entry.pointType ==="ENTRY" ? 'Entrada' : 'Saída'}
              />
            ))}
            <TextField
              
              label={"Ponto"}
              type="datetime-local"
              value={dateTimeRecordEntry}
              onChange={handleDateTimeChange}
            />
            <Button
              onClick={handleRegisterPoint}
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={entryPoint}
              sx={{ mt: 5 }}>
              Registrar Ponto
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default RegisterPointPage;
