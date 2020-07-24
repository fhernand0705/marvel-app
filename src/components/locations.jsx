import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocationDetails from './location-details';
import LoadMoreDataButton from './common/load-more-data-button';
import { getLocations } from '../services/api-service';
import loading_img from '../assets/images/loading-img.gif';

function Locations() {
  const [locations, setLocations] = useState([]);
  const [idList, setidList] = useState(3);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    fetchLocations(); 
    setIsLoading(true);

    if (!isFetching) return;
    fetchMoreLocations();
  },[]);

  async function fetchLocations() {
    try {
      const data = async () => {
        const locationPromises = [];
        const ids = [...Array(idList).keys()];
        locationPromises.push(getLocations(ids));

        return Promise.all(locationPromises);
     }
      // RETURN LIST OF RESIDENTS (DATA) PER LOCATION
      //const proxyUrl = "https://cors-anywhere.herokuapp.com/"
      const getResidents = () => {
        const residentPromises = locations.map(place => {
          return Promise.all(place.residents.map(resident => {
            return axios.get(resident);
          })) 
        })
        return Promise.all(residentPromises);
      }

      const locationData = await data();
      const locations = locationData[0].data.map(location => location)
      const residents = await getResidents();
      const residentByLocation = residents.map(char => char);

      locations.map((place,i) => place.residents = residentByLocation[i])
      
      setLocations([...locations]);
      setIsLoading(false);
    } catch(e) {
      // do something after error occurs
   }
  }
  function fetchMoreLocations() {
    if (idList > 94) return;
      fetchLocations();
      setIsFetching(false);
  }
  function handleLoadLocations() {
    setidList((idList) => idList + 2);
    setIsFetching(true);
}

  return (
    <React.Fragment>
      {isLoading && 
        <div className="loading-img">
          <img  src={loading_img} alt="loading-img"/>
        </div>
      }
      <LocationDetails locations={locations}/>
      {isFetching && <div>Fetching more locations...</div>}
      {!isLoading && <LoadMoreDataButton onClick={handleLoadLocations} />}
    </React.Fragment>
  )
}

export default Locations;
