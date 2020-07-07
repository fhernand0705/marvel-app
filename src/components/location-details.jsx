import React from 'react';
import { NavLink } from 'react-router-dom';

function LocationDetails({locations}) {
  return (
    <div className="locations-main-wrapper">
      { locations.map((location, i) =>
       location.name !== "unknown" && location.residents.length &&
       <div className="locations-section" key={i}>
            <h1>{location.name}</h1>
            <h5>Type: {location.type}</h5>
            <h5>Dimension: {location.dimension}</h5>
            <hr/>
            <div className="location-cards-wrapper">
            { location.residents.map(res =>
                <div className="location-card-content"  key={res.data.id}>
                  <img src={res.data.image} alt="Resident_Image"/>
                  <NavLink to={`/character/${res.data.id}`}>
                    <h5>{res.data.name}</h5>
                  </NavLink>
                </div>
            )}
            </div>
        </div>  
      )}
    </div>
  )
}



export default LocationDetails;
