import React from 'react';

function LocationDetails({locations}) {
  return (
    <div>
      { locations.map((place, i) =>
       place.name !== "unknown" && place.residents.length &&
          <div key={i}>
            <h1>{place.name}</h1>
            <div>{place.dimension}</div>
            { place.residents.map(res =>
              <ul key={res.data.id}>
                <li>{res.data.name}</li>
                <li><img src={res.data.image} alt=""/></li>
              </ul>
             )
             }
          </div>
      )}
    </div>
  )
}



export default LocationDetails;
