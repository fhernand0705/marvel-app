import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocationDetails from './location-details';
import LoadMoreDataButton from './common/load-more-data-button';
import withLoadData from './hoc/withLoadData';
import { getLocations } from '../services/api-service';
import loading_img from '../assets/images/loading-img.gif';

function Locations({isFetching, idList, loadData, setFetching}) {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    fetchLocations(); 
    setIsLoading(true);

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
      
      setLocations([...locations, ...locations]);
      setIsLoading(false);
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
      {isLoading && 
        <div className="loading-img">
          <img  src={loading_img} alt="loading-img"/>
        </div>
      }
      <LocationDetails locations={locations}/>
      {isFetching && <div>Fetching more locations</div>}
      {!isLoading && <LoadMoreDataButton onClick={loadData} />}
    </React.Fragment>
  )
}

export default withLoadData(Locations);
