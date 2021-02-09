import React, { useState } from "react";
import { Card, Grid, Input } from "semantic-ui-react";

function PlanetsForm({ data, nextPage, search }) {
  const [searchTerms, setSearchTerms] = useState("");

  const searchData = (val) => {
    setSearchTerms(val);
    search(val);
  };

  return (
    <div style={{ paddingTop: "30px" }}>
      <div style={{ marginBottom: "30px" }}>
        <Input
          icon="search"
          placeholder="Search..."
          value={searchTerms}
          onChange={(e) => searchData(e.target.value)}
        />
      </div>
      <Grid columns={2}>
        {data.map((planet, i) => {
          return (
            <Grid.Column key={i}>
              <Card>
                <Card.Content>
                  <Card.Header>{planet.name}</Card.Header>
                  <Card.Description>
                    <strong>Diameter</strong>
                    <p>{planet.diameter}</p>
                    <strong>Rotation Period</strong>
                    <p>{planet.rotation_period}</p>
                    <strong>Orbital Period</strong>
                    <p>{planet.orbital_period}</p>
                    <strong>Gravity</strong>
                    <p>{planet.gravity}&nbsp;Gs</p>
                    <strong>Population</strong>
                    <p>{planet.population}</p>
                    <strong>Climate</strong>
                    <p>{planet.climate}</p>
                    <strong>Terrain</strong>
                    <p>{planet.terrain}</p>
                    <strong>Surface Water</strong>
                    <p>{planet.surface_water}</p>
                    <strong>Residents</strong>

                    {planet.nameResidents.length > 0
                      ? planet.nameResidents.map((resident, keyRes) => {
                          return <p key={keyRes}>{resident}</p>;
                        })
                      : null}
                    <strong>Films</strong>
                    {planet.titleFilms.map((film, i) => {
                      return (
                        <div key={i}>
                          <p>{film}</p>
                        </div>
                      );
                    })}
                    <strong>Url</strong>
                    <p>{planet.url}</p>
                    <strong>Created</strong>
                    <p>{planet.created}</p>
                    <strong>Edited</strong>
                    <p>{planet.edited}</p>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          );
        })}
      </Grid>
    </div>
  );
}

export default PlanetsForm;
