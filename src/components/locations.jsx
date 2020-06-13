import React, { useState, useEffect } from 'react';
import { getLocations } from '../services/api-service';
import axios from 'axios';
import LocationDetails from './location-details';

function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  },[])

  const fetchLocations = async () => {
    const data = () => {
      const arrOfPromises = [];
      let i = 0;

      while (i < 6) {
        const randomId = Math.floor(Math.random() * 5 + 1)
        arrOfPromises.push(getLocations(randomId));
        i++;
      }
      // REQUEST FOR LOCATIONS
      return Promise.all(arrOfPromises);
     }

    const getRes = () => {
      const promises = locations.map(place => {
        return Promise.all(place.residents.map(res => axios.get(res)));
      })
      return Promise.all(promises)
    }

    const response = await data();
    const locations = response.map(location => location.data)
    const residents = await getRes();
    const residentByLocation = residents.map(char => char);

    // two dimensional array
    locations.map((place,i) => place.residents = residentByLocation[i])
    console.log(locations)

    setLocations(prev => [...prev, ...locations])
  }

  return (
    <LocationDetails locations={locations}/>
  )
}

export default Locations;
