import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocationDetails from './location-details';
import LoadMoreDataButton from './common/load-more-data-button';
import { getLocations } from '../services/api-service';

function Locations() {
  const [locations, setLocations] = useState([]);
  const [idList, setIdList] = useState(10);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchLocations();

    if (!isFetching) return;
    fetchMoreLocations();
  },[isFetching])

  async function fetchLocations() {
    try {
      const data = async () => {
      const promises = [];
      const ids = [...Array(idList).keys()];
      promises.push(getLocations(ids));

      // HANDLES ARRAY OF PROMISES
      console.log(promises)
      return Promise.all(promises);
     }
      // RETURN LIST OF RESIDENTS (DATA) PER LOCATION
      const getResidents = () => {
        const promises = locations.map(place => {
          return Promise.all(place.residents.map(res => axios.get(res)));
        })
        return Promise.all(promises)
      }

      const response = await data();
      const locations = response[0].data.map(location => location)
      const residents = await getResidents();
      const residentByLocation = residents.map(char => char);
      console.log(residents)

      locations.map((place,i) => place.residents = residentByLocation[i])
      console.log(locations)

      setLocations(prev => [...prev, ...locations])
    } catch(e) {
      // do something after error occurs
   }
  }
  function fetchMoreLocations() {
    if (idList > 94) return;
      fetchLocations();
      setIsFetching(false);
  }
  function handleLoadMoreData() {
    setIdList((idList) => idList + 5);
    setIsFetching(true);
  }

  return (
    <React.Fragment>
      <LocationDetails locations={locations}/>
      <LoadMoreDataButton onClick={handleLoadMoreData} />
      {isFetching && <div>Fetching more locations</div>}
    </React.Fragment>
  )
}

export default Locations;
