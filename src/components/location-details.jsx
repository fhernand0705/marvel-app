import React from 'react';

function LocationDetails({locations}) {
  return (
    <div>
      { locations.map((place, i) =>
          <div key={i}>
            <div>{place.name}</div>
            <div>{place.dimension}</div>
          </div>
      )}
    </div>
  )
}

export default LocationDetails;
