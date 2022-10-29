import React, { useState, useEffect, } from "react";
import { AllPersons, IPerson } from "../../Interfaces/IPerson";

import Grid from "@mui/material/Grid";
import { Title, Main, CustomLink } from "./HomeStyles";

import useAPI from "../../Services/APIs/Common/useAPI";
import Person from "../../Services/APIs/Persons/Persons";
import { useGeolocated } from "react-geolocated";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function Home() {
  const [currentPerson, setCurrentPerson] = useState<IPerson | null>(null);
  const getPersonAPI = useAPI(Person.getPersons);
  let userCoordinates: GeolocationCoordinates | null = null;
  const navigate: NavigateFunction = useNavigate();


  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  if (isGeolocationAvailable && isGeolocationEnabled && coords) {
    console.log(coords.latitude + " - " + coords.longitude);
    userCoordinates = coords;
  }

  useEffect(() => {
    getPersonAPI
      .requestPromise()
      .then((info: AllPersons) => {
        setCurrentPerson(info.persons[0]);
      })
      .catch((info: any) => {
        console.log(info);
      });
  }, []);

  const onChangePage = (infoID: number) => {
    navigate("Detail/" + infoID, {
      state: {
        lat: userCoordinates!.latitude,
        lng: userCoordinates!.longitude,
      },
    });
  };
  
  let name = "";
  if (currentPerson) {
    name = currentPerson?.firstName + " " + currentPerson?.lastName;
  }
  return (
    <Main>
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Title gutterBottom variant="h1" color="primary.dark">
          Person {name}
        </Title>

        <CustomLink onClick={() => onChangePage(1)}>Detail 1</CustomLink>
        <CustomLink onClick={() => onChangePage(2)}>Detail 2</CustomLink>
      </Grid>
    </Main>
  );
}
