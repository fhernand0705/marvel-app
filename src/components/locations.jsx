import React, { useState, useEffect } from 'react';
import { getLocations } from '../services/api-service';
import LocationDetails from './location-details';

function Locations() {
  const [locations, setLocations] = useState({
    locations: []
  });

  useEffect(() => {
    fetchLocations();
  },[])

  const fetchLocations = async () => {
    const data = async () => {
      const arrOfPromises = [];
      let i = 0;

      while (i < 6) {
        const randomId = Math.floor(Math.random() * 90 + 1)
        arrOfPromises.push(getLocations(randomId));
        i++;
      }
      // REQUEST FOR CHARACTERS
      return Promise.all(arrOfPromises);
     }

    const response = await data();
    const locations = response.map(location => location.data)
    // IF MARVEL API, CONCAT RESPONSE ARRAY TO EMPTY ARRAY
    console.log(locations)

    setLocations({...locations, locations })
  }

  return (
    <LocationDetails locations={locations.locations}/>
  )
}

export default Locations;
