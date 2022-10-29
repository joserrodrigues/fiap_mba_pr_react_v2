import React, { useState, useEffect, } from "react";
import { AllPersons, IPerson } from "../../Interfaces/IPerson";

import Grid from "@mui/material/Grid";
import { Title, TableHeaderStyle, TableRowStyle, TableSearchFieldStyle } from "./HomeStyles";

import useAPI from "../../Services/APIs/Common/useAPI";
import Person from "../../Services/APIs/Persons/Persons";
import { useGeolocated } from "react-geolocated";
import { NavigateFunction, useNavigate } from "react-router-dom";
import MaterialTable from "material-table";

export default function Home() {  
  const getPersonAPI = useAPI(Person.getPersons);
  let userCoordinates: GeolocationCoordinates | null = null;
  const navigate: NavigateFunction = useNavigate();

  const [allPersons, setAllPersons] = useState<IPerson[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  const columns = [
    { title: "SobreNome", field: "lastName" },
    { title: "Nome", field: "firstName" },
    { title: "Telefone", field: "phone" },
  ];

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
    setIsLoading(true);
    getPersonAPI
      .requestPromise()
      .then((info: AllPersons) => {
        setIsLoading(false);
        let auxAllPersons: IPerson[] = [];
        info.persons.forEach((person) => {
          auxAllPersons.push(person);
        });
        setAllPersons(auxAllPersons);
      })
      .catch((info: any) => {
        console.log(info);
        setIsLoading(false);        
      });
  }, []);

  const onChangePage = (person: IPerson) => {
    navigate("Detail/" + person._id, {
      state: {
        lat: userCoordinates!.latitude,
        lng: userCoordinates!.longitude,
        personStr: JSON.stringify(person),
      },
    });
  };
  
return (
  <Grid
    container
    spacing={0}
    direction="column"
    justifyContent="left"
    alignItems="left"
  >
    <Grid item xs={12}>
      <Title gutterBottom variant="h1" color="primary.dark">
        Lista de Colaboradores
      </Title>
    </Grid>
    <Grid item lg={12}>
      <MaterialTable
        columns={columns}
        data={allPersons}
        isLoading={isLoading}
        actions={[
          {
            icon: "visibility",
            tooltip: "See Detail",
            onClick: (event, rowData) => {
              onChangePage(rowData as IPerson);
            },
          },
        ]}
        options={{
          showTitle: false,
          search: true,
          actionsColumnIndex: -1,
          headerStyle: TableHeaderStyle,
          rowStyle: TableRowStyle,
          searchFieldStyle: TableSearchFieldStyle,
        }}
      />
    </Grid>
  </Grid>
);
}
