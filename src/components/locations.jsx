import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocationDetails from './location-details';
import LoadMoreDataButton from './common/load-more-data-button';
import withLoadData from './hoc/withLoadData';
import { getLocations } from '../services/api-service';

function Locations({isFetching, idList, loadData, setFetching}) {
  const [locations, setLocations] = useState([]);

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

        return Promise.all(promises);
     }
      // RETURN LIST OF RESIDENTS (DATA) PER LOCATION
      const getResidents = () => {
        const promises = locations.map(place => {
          return Promise.all(place.residents.map(resident => axios.get(resident)));
        })
        return Promise.all(promises);
      }

      const locationData = await data();
      const locations = locationData[0].data.map(location => location)
      const residents = await getResidents();
      const residentByLocation = residents.map(char => char);
      //console.log(residents)

      locations.map((place,i) => place.residents = residentByLocation[i])
      console.log(locations)

      setLocations([...locations, ...locations])
    } catch(e) {
      // do something after error occurs
   }
  }
  function fetchMoreLocations() {
    if (idList > 94) return;
      fetchLocations();
      setFetching(false);
  }

  return (
    <React.Fragment>
      <LocationDetails locations={locations}/>
      {isFetching && <div>Fetching more locations</div>}
      <LoadMoreDataButton onClick={loadData} />
    </React.Fragment>
  )
}

export default withLoadData(Locations);
