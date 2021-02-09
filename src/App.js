import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";

import PlanetsForm from "./components/PlanetsForm";

function App() {
  const [loading, setLoading] = useState(true);
  const [allData, setData] = useState([]);

  //get all data
  const getAll = async (page) => {
    if (page !== "") {
      page = 1;
    }
    const planets = await fetch(
      `https://swapi.dev/api/planets/?page=${page}`
    ).then((response) => response.json());
    mappingData(planets);
  };
  // get residents
  async function getRes(url) {
    return await fetch(`${url}`).then((data) => data.json());
  }

  // get films
  async function getFilm(url) {
    return await fetch(`${url}`).then((data) => data.json());
  }

  //search by keyword
  async function search(keyword) {
    const data = await fetch(
      `https://swapi.dev/api/planets/?search=${keyword}`
    ).then((response) => response.json());
    mappingData(data);
  }

  //mapping resident and film
  const mappingData = (planets) => {
    let allData = [];
    planets.results.map((val) => {
      //residents
      let nameResidents = [];
      if (val.residents.length > 0) {
        val.residents.map((valRes) => {
          getRes(valRes).then((valNameResidents) => {
            nameResidents.push(valNameResidents.name);
          });
        });
      }

      //films
      let titleFilms = [];
      if (val.films.length > 0) {
        val.films.map((valFilm) => {
          getFilm(valFilm).then((valTitleFilm) => {
            titleFilms.push(valTitleFilm.title);
          });
        });
      }

      allData.push({
        ...val,
        nameResidents: nameResidents,
        titleFilms: titleFilms,
      });
    });
    setData(allData);
  };

  useEffect(() => {
    getAll();
    let timer = setTimeout(() => setLoading(false), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="App">
      <Container>
        {loading ? (
          <p>loading...</p>
        ) : (
          <PlanetsForm data={allData} nextPage={getAll} search={search} />
        )}
      </Container>
    </div>
  );
}

export default App;
