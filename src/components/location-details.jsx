import React from 'react';
import { NavLink } from 'react-router-dom';

function LocationDetails({locations}) {
  return (
    <div className="locations-wrapper">
      { locations.map((location, i) =>
       location.name !== "unknown" && location.residents.length &&
       <div className="location-card-wrapper" key={i}>
            <h1>{location.name}</h1>
            <h5>{location.dimension}</h5>
            <hr/>
            { location.residents.map(res =>
              <div className="location-card-item" key={res.data.id}>
                <div className="location-card-content">
                  <img src={res.data.image} alt="Resident_Image"/>
                  <NavLink to={`/character/${res.data.id}`}>
                    <h5>{res.data.name}</h5>
                  </NavLink>
                </div>
              </div>
            )}
        </div>  
      )}
    </div>
  )
}



export default LocationDetails;
