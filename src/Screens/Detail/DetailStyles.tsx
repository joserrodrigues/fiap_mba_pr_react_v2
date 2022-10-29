import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export const MainGrid = styled(Grid)`
  && {
    text-align: center;
  }
`;
export const TitlePage = styled(Typography)`
  && {
    font-size: 28px;
  }
`;

export const ButtonMaxSize = styled(Button)`
  && {
    max-width: 200px;
  }
`;

export const StyledMap = styled.div`
  margin-top: 40px;
  width: "100%";
  height: 400px;
`;
