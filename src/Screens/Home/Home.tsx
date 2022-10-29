import React, { useState, useEffect } from "react";
import { AllPersons, IPerson } from "../../Interfaces/IPerson";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { CustomCard, TitleTopPage } from "./HomeStyles";

import useAPI from "../../Services/APIs/Common/useAPI";
import Person from "../../Services/APIs/Persons/Persons";

export default function Home() {
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const getPersonAPI = useAPI(Person.getPersons);

  useEffect(() => {
    getPersonAPI
      .requestPromise()
      .then((info: AllPersons) => {
        let mountCards: JSX.Element[] = [];
        info.persons.forEach((person: IPerson) => {
          mountCards.push(
            <Grid key={person._id} item lg={4} md={6} sm={12}>
              <CustomCard>
                <CardMedia
                  component="img"
                  height="140"
                  image={person.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {person.firstName} {person.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {person.jobTitle}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </CustomCard>
            </Grid>
          );
        });
        setCards(mountCards);
      })
      .catch((info: any) => {
        console.log(info);
      });
  }, []);
  
  return (
    <Container>
      <TitleTopPage>
        <Typography variant="h1" color="primary">
          Usuários
        </Typography>
      </TitleTopPage>
      <Grid container>{cards}</Grid>
    </Container>
  );
}
