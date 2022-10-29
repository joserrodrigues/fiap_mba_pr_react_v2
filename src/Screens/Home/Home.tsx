import { useState } from "react";
import "./Home.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function App() {
  const [count, setCount] = useState<number>(0);

  const addCount = () => {
    setCount((count) => count + 1);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      justifyContent="center"
      alignItems="center"
      className="container"
    >
      <Typography gutterBottom variant="h1" color="primary.dark">
        Info {count}
      </Typography>
      <Typography gutterBottom variant="h1" color="secondary.dark">
        Info {count}
      </Typography>
      <Button onClick={() => addCount()} variant="primary">
        Primary
      </Button>
      <Button color="secondary"> Secondary </Button>
      <Button color="success"> Success </Button>
    </Grid>
  );
}

export default App;
